import { useEffect, useState } from "react";
import { AIInsightPanel } from "../components/health/AIInsightPanel";
import { HealthConstellation } from "../components/health/HealthConstellation";
import { VitalsAreaChart } from "../components/health/VitalsAreaChart";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { useHealthOverview } from "../hooks/useHealthOverview";
import { getTrendSummary } from "../services/health/healthService";
import { type TrendWindow } from "../types/health";

type TrendStats = {
  heartRateDelta: number;
  sleepDelta: number;
  activityDelta: number;
};

const windows: TrendWindow[] = ["daily", "weekly", "monthly"];

export function HealthOverviewPage() {
  const { data, loading, error, reload } = useHealthOverview();
  const [window, setWindow] = useState<TrendWindow>("weekly");
  const [trends, setTrends] = useState<TrendStats | null>(null);

  useEffect(() => {
    let active = true;
    void getTrendSummary(window).then((result) => {
      if (active) setTrends(result);
    });
    return () => {
      active = false;
    };
  }, [window]);

  if (loading) return <LoadingState label="Rendering health analytics" />;
  if (!data || error) {
    return <ErrorState title="Health overview unavailable" message={error ?? "Unable to load synthetic analytics."} onRetry={() => void reload()} />;
  }

  const latestVital = data.vitals[0];

  return (
    <div className="space-y-6">
      <section className="surface rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Cross-Domain Analytics</p>
            <h2 className="mt-2 text-3xl font-semibold">How your health domains move together</h2>
          </div>
          <div className="flex gap-1.5">
            {windows.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setWindow(item)}
                className={`rounded-md border px-2.5 py-1 text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  window === item ? "border-[var(--accent)] text-[var(--text-0)]" : "border-[var(--line-soft)] text-[var(--text-1)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {trends ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
            <p className="surface-soft rounded-xl p-3">Resting HR trend: <span className="text-[var(--accent)]">{trends.heartRateDelta}%</span></p>
            <p className="surface-soft rounded-xl p-3">Sleep trend: <span className="text-[var(--accent)]">+{trends.sleepDelta}h</span></p>
            <p className="surface-soft rounded-xl p-3">Activity trend: <span className="text-[var(--accent)]">+{trends.activityDelta}%</span></p>
          </div>
        ) : null}
      </section>

      <HealthConstellation nodes={data.constellationNodes} links={data.constellationLinks} />

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <VitalsAreaChart data={data.vitalSeries} />
        <section className="surface rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Latest Vitals Snapshot</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <p className="surface-soft rounded-lg p-2">Heart Rate: <span className="text-[var(--text-0)]">{latestVital.heartRate} bpm</span></p>
            <p className="surface-soft rounded-lg p-2">Blood Pressure: <span className="text-[var(--text-0)]">{latestVital.systolicBP}/{latestVital.diastolicBP}</span></p>
            <p className="surface-soft rounded-lg p-2">SpO2: <span className="text-[var(--text-0)]">{latestVital.spo2}%</span></p>
            <p className="surface-soft rounded-lg p-2">Resp. Rate: <span className="text-[var(--text-0)]">{latestVital.respiratoryRate}/min</span></p>
          </div>
          <p className="mt-3 text-sm text-[var(--text-1)]">Synthetic values for demo behavior only.</p>
        </section>
      </div>

      <AIInsightPanel insights={data.aiInsights} />
    </div>
  );
}