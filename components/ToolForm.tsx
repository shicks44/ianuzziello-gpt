'use client';

import { useState } from 'react';
import { OutputBox } from './OutputBox';

type ToolMode = 'srr' | 'rfi' | 'deficiency' | 'site-report' | 'code-checker' | 'email';

interface ToolFormProps {
  mode: ToolMode;
  title: string;
  description: string;
}

const optionalFields = [
  { key: 'projectName', label: 'Project Name' },
  { key: 'site', label: 'Site' },
  { key: 'client', label: 'Client' },
  { key: 'drawingReference', label: 'Drawing Reference' },
  { key: 'discipline', label: 'Discipline' },
  { key: 'issueType', label: 'Issue Type' },
  { key: 'urgency', label: 'Urgency' },
] as const;

export function ToolForm({ mode, title, description }: ToolFormProps) {
  const [notes, setNotes] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, formData, notes }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to generate content.');
      }

      setOutput(payload.output || '');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setNotes('');
    setFormData({});
    setOutput('');
    setError(null);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <section>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-2">
          {optionalFields.map((field) => (
            <label key={field.key} className="space-y-1">
              <span className="text-sm font-medium text-foreground">{field.label} (Optional)</span>
              <input
                type="text"
                value={formData[field.key] || ''}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          ))}
        </div>

        <label className="mt-4 block space-y-1">
          <span className="text-sm font-medium text-foreground">Rough Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={8}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            placeholder="Paste field notes, draft wording, observations, or background context..."
          />
        </label>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </section>

      <OutputBox output={output} isLoading={isLoading} error={error} onCopy={handleCopy} onClear={handleClear} />
    </main>
  );
}
