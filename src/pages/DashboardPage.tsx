import { useState } from "react";
import { AIInsightPanel } from "../components/health/AIInsightPanel";
import { HealthConstellation } from "../components/health/HealthConstellation";
import { MetricTile } from "../components/health/MetricTile";
import { VitalsAreaChart } from "../components/health/VitalsAreaChart";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import {
  aiInsights,
  constellationNodes,
  metricHighlights,
  timelineEvents,
  vitalSeries,
} from "../data/syntheticHealthData";
import { HealthTimeline } from "../components/health/HealthTimeline";

export function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { pushToast } = useToast();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricHighlights.map((metric) => (
          <MetricTile key={metric.label} {...metric} />
        ))}
      </section>

      <HealthConstellation nodes={constellationNodes} />

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <VitalsAreaChart data={vitalSeries} />
        <AIInsightPanel insights={aiInsights} />
      </section>

      <section className="surface rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Patient Actions</h3>
            <p className="text-sm text-[var(--text-1)]">Phase 1 interactions for flow validation.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Log Symptom
            </Button>
            <Button
              onClick={() => pushToast("Wearable Sync", "Latest watch data synced to synthetic profile.")}
            >
              Sync Wearable
            </Button>
          </div>
        </div>
      </section>

      <HealthTimeline events={timelineEvents.slice(0, 4)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Log Symptom (Demo)">
        <div className="space-y-3">
          <Input placeholder="Symptom title" />
          <Input placeholder="Intensity 1-10" type="number" min={1} max={10} />
          <Input placeholder="Notes" />
          <Button
            onClick={() => {
              setModalOpen(false);
              pushToast("Symptom captured", "Synthetic symptom event added to timeline.");
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}