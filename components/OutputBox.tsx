interface OutputBoxProps {
  output: string;
  isLoading: boolean;
  error: string | null;
  onCopy: () => void;
  onClear: () => void;
}

export function OutputBox({ output, isLoading, error, onCopy, onClear }: OutputBoxProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Output Preview</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCopy}
            disabled={!output || isLoading}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium disabled:opacity-50"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium"
          >
            Clear
          </button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Generating...</p>}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {!isLoading && !error ? (
        <pre className="whitespace-pre-wrap text-sm text-foreground">{output || 'Generated output will appear here.'}</pre>
      ) : null}
    </section>
  );
}
