import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { useMedications } from "../hooks/useMedications";

export function MedicationsPage() {
  const { data, loading, error, reload } = useMedications();

  if (loading) return <LoadingState label="Loading medication schedule" />;
  if (!data || error) return <ErrorState title="Medication feed unavailable" message={error ?? "Unable to fetch medication records."} onRetry={() => void reload()} />;

  return (
    <div className="space-y-4">
      <section>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Adherence Layer</p>
        <h2 className="mt-2 text-3xl font-semibold">Medications</h2>
      </section>
      <section className="surface rounded-2xl p-4">
        <div className="space-y-3">
          {data.map((medication) => (
            <article key={medication.id} className="grid gap-3 rounded-xl border border-[var(--line-soft)] p-3 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-base font-medium">{medication.name}</p>
                <p className="text-sm text-[var(--text-1)]">Dosage: {medication.dosage}</p>
                <p className="text-sm text-[var(--text-1)]">Schedule: {medication.schedule}</p>
                <p className="text-sm text-[var(--text-2)]">Started: {medication.startDate}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{medication.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}