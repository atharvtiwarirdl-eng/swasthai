import { HealthTimeline } from "../components/health/HealthTimeline";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { useTimeline } from "../hooks/useTimeline";

export function TimelinePage() {
  const { data, loading, error, reload } = useTimeline();

  if (loading) return <LoadingState label="Building timeline narrative" />;
  if (!data || error) {
    return <ErrorState title="Timeline unavailable" message={error ?? "Could not load timeline data."} onRetry={() => void reload()} />;
  }

  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Clinical Sequence</p>
        <h2 className="mt-2 text-3xl font-semibold">Complete health timeline</h2>
      </section>
      <HealthTimeline events={data} />
    </div>
  );
}