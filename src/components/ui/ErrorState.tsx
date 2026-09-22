import { Button } from "./Button";

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-[rgba(255,127,150,0.35)] bg-[rgba(255,127,150,0.08)] p-6">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--danger)]">Error State</p>
      <h3 className="mt-1 text-lg font-semibold text-[var(--danger)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-1)]">{message}</p>
      {onRetry ? (
        <Button className="mt-4" variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}