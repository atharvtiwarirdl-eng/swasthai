import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { useAppointments } from "../hooks/useAppointments";

export function AppointmentsPage() {
  const { data, loading, error, reload } = useAppointments();

  if (loading) return <LoadingState label="Loading appointment schedule" />;
  if (!data || error) return <ErrorState title="Appointments unavailable" message={error ?? "Unable to fetch appointments."} onRetry={() => void reload()} />;

  return (
    <div className="space-y-4">
      <section>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Care Coordination</p>
        <h2 className="mt-2 text-3xl font-semibold">Appointments</h2>
      </section>
      <section className="surface rounded-2xl p-4">
        <div className="space-y-3">
          {data.map((appointment) => (
            <article key={appointment.id} className="grid gap-3 rounded-xl border border-[var(--line-soft)] p-3 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-base font-medium">{appointment.doctorName} · {appointment.specialty}</p>
                <p className="text-sm text-[var(--text-1)]">{appointment.date} at {appointment.time} · {appointment.appointmentType}</p>
                <p className="text-sm text-[var(--text-2)]">{appointment.location}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{appointment.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}