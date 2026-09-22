import { motion } from "framer-motion";
import { type TimelineEvent } from "../../types/health";

type HealthTimelineProps = {
  events: TimelineEvent[];
};

const kindTint: Record<TimelineEvent["kind"], string> = {
  vitals: "bg-[var(--accent)]",
  reports: "bg-[var(--accent-2)]",
  symptoms: "bg-[var(--danger)]",
  appointments: "bg-[var(--ok)]",
  medications: "bg-[var(--warn)]",
  insights: "bg-white",
};

export function HealthTimeline({ events }: HealthTimelineProps) {
  return (
    <section className="surface timeline-fade rounded-3xl p-5 md:p-6">
      <h2 className="text-2xl font-semibold">Health Timeline</h2>
      <p className="mt-1 text-sm text-[var(--text-1)]">Vitals, reports, symptoms, appointments, medication and AI signals in one sequence.</p>
      <div className="relative mt-6 space-y-5">
        <div className="absolute left-[5px] top-1 h-[calc(100%-16px)] w-px bg-[rgba(171,191,237,0.24)]" />
        {events.map((event, idx) => (
          <motion.article
            key={event.id}
            className="relative pl-8"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
          >
            <span className={`absolute left-0 top-2 block h-3 w-3 rounded-full ${kindTint[event.kind]}`} />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-base font-medium">{event.title}</p>
              <p className="text-xs text-[var(--text-1)]">{event.date}</p>
            </div>
            <p className="mt-1 text-sm text-[var(--text-1)]">{event.detail}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--accent)]">Signal score {event.score}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}