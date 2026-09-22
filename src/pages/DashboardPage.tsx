import { useMemo, useState } from "react";
import { AIInsightPanel } from "../components/health/AIInsightPanel";
import { HealthConstellation } from "../components/health/HealthConstellation";
import { HealthTimeline } from "../components/health/HealthTimeline";
import { MetricTile } from "../components/health/MetricTile";
import { ReportTable } from "../components/health/ReportTable";
import { VitalsAreaChart } from "../components/health/VitalsAreaChart";
import { Button } from "../components/ui/Button";
import { ErrorState } from "../components/ui/ErrorState";
import { Field } from "../components/ui/Field";
import { LoadingState } from "../components/ui/LoadingState";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { useAppointments } from "../hooks/useAppointments";
import { useHealthOverview } from "../hooks/useHealthOverview";
import { useMedications } from "../hooks/useMedications";
import { useReports } from "../hooks/useReports";
import { useTimeline } from "../hooks/useTimeline";

export function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { pushToast } = useToast();
  const overview = useHealthOverview();
  const timeline = useTimeline();
  const reportFeed = useReports();
  const appointmentFeed = useAppointments();
  const medicationFeed = useMedications();

  const upcomingAppointment = appointmentFeed.data?.find((item) => item.status === "upcoming");
  const activeMeds = medicationFeed.data?.filter((item) => item.status === "active") ?? [];

  const recentReports = useMemo(
    () =>
      (reportFeed.data ?? []).slice(0, 2).map((report) => ({
        id: report.id,
        date: report.date,
        type: report.name,
        summary: report.summary,
        status: report.status,
      })),
    [reportFeed.data],
  );

  if (overview.loading || timeline.loading || reportFeed.loading || appointmentFeed.loading || medicationFeed.loading) {
    return <LoadingState label="Preparing your health command center" />;
  }

  if (!overview.data || timeline.error || reportFeed.error || appointmentFeed.error || medicationFeed.error) {
    return (
      <ErrorState
        title="Unable to render dashboard"
        message="One or more synthetic feeds failed to load. Retry to continue."
        onRetry={() => {
          void overview.reload();
          void timeline.reload();
          void reportFeed.reload();
          void appointmentFeed.reload();
          void medicationFeed.reload();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="surface-strong rounded-3xl p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Daily Brief</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-tight">{overview.data.todaySnapshot.title}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--accent)]">{overview.data.todaySnapshot.signal}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--text-1)]">{overview.data.todaySnapshot.summary}</p>
            <p className="mt-3 text-sm text-[var(--text-2)]">Next action: {overview.data.todaySnapshot.nextAction}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Log Symptom
            </Button>
            <Button onClick={() => pushToast("Wearable Sync", "Latest synthetic wearable feed synced.")}>Sync Wearable</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Key health metrics">
        {overview.data.healthMetrics.map((metric) => (
          <MetricTile key={metric.id} label={metric.label} value={metric.value} delta={metric.delta} />
        ))}
      </section>

      <HealthConstellation nodes={overview.data.constellationNodes} links={overview.data.constellationLinks} />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <VitalsAreaChart data={overview.data.vitalSeries} />
        <section className="surface rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Care Priorities</h3>
          <div className="mt-3 space-y-3 text-sm text-[var(--text-1)]">
            <p>Upcoming appointment: {upcomingAppointment ? `${upcomingAppointment.date} ${upcomingAppointment.time} with ${upcomingAppointment.doctorName}` : "No appointment scheduled"}</p>
            <p>Active medications: {activeMeds.length}</p>
            <p>Recent reports: {reportFeed.data?.length ?? 0}</p>
          </div>
          <div className="mt-4">
            <AIInsightPanel insights={overview.data.aiInsights} />
          </div>
        </section>
      </section>

      <HealthTimeline events={timeline.data ?? []} />

      <ReportTable reports={recentReports} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Log Symptom (Demo)">
        <div className="space-y-3">
          <Field id="symptom-title" label="Symptom" placeholder="Describe symptom" />
          <Field id="symptom-intensity" label="Intensity" placeholder="1-10" type="number" min={1} max={10} />
          <Field id="symptom-notes" label="Notes" placeholder="Optional details" />
          <Button
            onClick={() => {
              setModalOpen(false);
              pushToast("Symptom captured", "Synthetic symptom event logged to timeline.");
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}