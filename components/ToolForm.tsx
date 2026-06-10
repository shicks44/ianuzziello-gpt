"use client";

import { BotIcon, ClipboardIcon, RotateCcwIcon, SendIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OperationsShell } from "./operations-shell";

type ToolMode =
  | "srr"
  | "rfi"
  | "deficiency"
  | "site-report"
  | "site-instruction"
  | "code-checker"
  | "email";

interface ToolFormProps {
  mode: ToolMode;
  title: string;
  description: string;
}

const optionalFields = [
  { key: "projectName", label: "Project Name" },
  { key: "site", label: "Site" },
  { key: "client", label: "Client" },
  { key: "drawingReference", label: "Drawing Reference" },
  { key: "discipline", label: "Discipline" },
  { key: "issueType", label: "Issue Type" },
  { key: "urgency", label: "Urgency" },
] as const;

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ToolForm({ mode, title, description }: ToolFormProps) {
  const pathname = usePathname();
  const [notes, setNotes] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    if (!notes.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: notes.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, formData, notes }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to generate content.");
      }

      const generatedOutput = payload.output || "";
      setOutput(generatedOutput);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: generatedOutput,
        },
      ]);
      setNotes("");
      rememberTask(userMessage.content);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setNotes("");
    setFormData({});
    setOutput("");
    setMessages([]);
    setError(null);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  }

  function rememberTask(prompt: string) {
    try {
      const stored = window.localStorage.getItem("operations-recent-tasks");
      const previous = stored ? JSON.parse(stored) : [];
      const next = [
        {
          id: crypto.randomUUID(),
          title,
          href: pathname,
          preview: prompt.split(/\s+/).slice(0, 8).join(" "),
        },
        ...previous,
      ].slice(0, 8);

      window.localStorage.setItem("operations-recent-tasks", JSON.stringify(next));
      window.dispatchEvent(new Event("operations-recent-tasks-updated"));
    } catch {
      // Recent task history is a convenience layer; generation should not depend on it.
    }
  }

  return (
    <OperationsShell>
      <main className="flex h-svh min-h-0 flex-col">
        <header className="flex min-h-14 items-center justify-between border-b border-border/70 pl-14 pr-4 md:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground">{title}</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output || isLoading}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-foreground disabled:opacity-40"
              title="Copy latest output"
            >
              <ClipboardIcon className="size-4" />
              <span className="sr-only">Copy latest output</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:text-foreground"
              title="Clear chat"
            >
              <RotateCcwIcon className="size-4" />
              <span className="sr-only">Clear chat</span>
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="flex min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-5">
                {messages.length === 0 ? (
                  <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-card)]">
                      <BotIcon className="size-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <article
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <BotIcon className="size-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 text-sm shadow-[var(--shadow-card)] ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-card text-card-foreground"
                        }`}
                      >
                        <pre className="whitespace-pre-wrap font-sans leading-6">{message.content}</pre>
                      </div>
                      {message.role === "user" && (
                        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                          <UserIcon className="size-4 text-muted-foreground" />
                        </div>
                      )}
                    </article>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <BotIcon className="size-4" />
                    </div>
                    Drafting...
                  </div>
                )}
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
              </div>
            </div>

            <div className="border-t border-border/70 bg-background/95 px-4 py-4 md:px-6">
              <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-2 shadow-[var(--shadow-composer)]">
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  className="max-h-48 min-h-24 w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Paste field notes, observations, draft wording, or background context..."
                />
                <div className="flex items-center justify-between gap-3 border-t border-border/70 px-2 pt-2">
                  <span className="text-xs text-muted-foreground">Context fields are optional.</span>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isLoading || !notes.trim()}
                    className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition disabled:opacity-45"
                  >
                    <SendIcon className="size-4" />
                    {isLoading ? "Generating" : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="hidden min-h-0 border-l border-border/70 bg-card/55 p-4 lg:block">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-foreground">Task Context</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Add known project details once, then use the chat box for the working notes.
              </p>
            </div>
            <div className="grid gap-3">
              {optionalFields.map((field) => (
                <label key={field.key} className="space-y-1">
                  <span className="text-xs font-medium text-foreground">{field.label}</span>
                  <input
                    type="text"
                    value={formData[field.key] || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, [field.key]: event.target.value }))
                    }
                    className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition focus:border-ring"
                  />
                </label>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </OperationsShell>
  );
}
