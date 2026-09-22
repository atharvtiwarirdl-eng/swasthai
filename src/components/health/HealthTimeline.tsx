import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Drawer } from "../ui/Drawer";
import { type TimelineEvent, type TimelineKind } from "../../types/health";

type HealthTimelineProps = {
  events: TimelineEvent[];
};

const kindColor: Record<TimelineKind, string> = {
  vitals: "bg-[var(--accent)]",
  reports: "bg-[var(--accent-2)]",
  symptoms: "bg-[var(--danger)]",
  appointments: "bg-[var(--ok)]",
  medications: "bg-[var(--warn)]",
  activity: "bg-[#6fd8b8]",
  sleep: "bg-[#9f94ff]",
  insights: "bg-white",
};

const kindSymbol: Record<TimelineKind, string> = {
  vitals: "VT",
  reports: "RP",
  symptoms: "SY",
  appointments: "AP",
  medications: "MD",
  activity: "AC",
  sleep: "SL",
  insights: "AI",
};

const timelineFilters: Array<{ key: TimelineKind | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "vitals", label: "Vitals" },
  { key: "reports", label: "Reports" },
  { key: "symptoms", label: "Symptoms" },
  { key: "appointments", label: "Appointments" },
  { key: "medications", label: "Medications" },
  { key: "activity", label: "Activity" },
  { key: "sleep", label: "Sleep" },
];

export function HealthTimeline({ events }: HealthTimelineProps) {
  const [activeKind, setActiveKind] = useState<TimelineKind | "all">("all");
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const reduceMotion = useReducedMotion();

  const filteredEvents = useMemo(() => {
    if (activeKind === "all") return events;
    return events.filter((event) => event.kind === activeKind);
  }, [activeKind, events]);

  return (
    <section className="surface rounded-3xl p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Health Timeline</h2>
          <p className="mt-1 text-sm text-[var(--text-1)]">A chronological stream of synthetic vitals, visits, reports, medications, activity and sleep signals.</p>
        </div>
        <div className="flex max-w-[640px] flex-wrap justify-end gap-1.5">
          {timelineFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              aria-pressed={activeKind === filter.key}
              onClick={() => setActiveKind(filter.key)}
              className={`rounded-md border px-2.5 py-1 text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                activeKind === filter.key
                  ? "border-[var(--accent)] text-[var(--text-0)]"
                  : "border-[var(--line-soft)] text-[var(--text-1)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-6 space-y-5">
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-[rgba(171,191,237,0.28)]" />
        {filteredEvents.map((event, idx) => (
          <motion.article
            key={event.id}
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : idx * 0.03 }}
            className="relative pl-10"
          >
            <button
              type="button"
              onClick={() => setActiveEvent(event)}
              className="group w-full rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,0.01)] p-3 text-left transition hover:border-[var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <span className={`absolute left-0 top-4 flex h-[22px] w-[22px] items-center justify-center rounded-full text-[9px] font-semibold text-slate-900 ${kindColor[event.kind]}`}>
                {kindSymbol[event.kind]}
              </span>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-base font-medium leading-snug">{event.title}</p>
                <time className="text-xs text-[var(--text-2)]" dateTime={event.date.replace(" ", "T")}>
                  {event.date}
                </time>
              </div>
              <p className="mt-1 text-sm text-[var(--text-1)]">{event.detail}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--accent)]">Type {event.kind} · Signal {event.score}</p>
            </button>
          </motion.article>
        ))}

        {filteredEvents.length === 0 ? <p className="pl-10 text-sm text-[var(--text-1)]">No timeline events for this filter.</p> : null}
      </div>

      <Drawer open={Boolean(activeEvent)} onClose={() => setActiveEvent(null)} title={activeEvent?.title ?? "Event details"}>
        {activeEvent ? (
          <div className="space-y-3 text-sm">
            <p className="text-[var(--text-1)]">{activeEvent.detail}</p>
            <p className="text-[var(--text-2)]">Timestamp: {activeEvent.date}</p>
            <p className="text-[var(--text-2)]">Event type: {activeEvent.kind}</p>
            <p className="text-[var(--text-2)]">Linked domain: {activeEvent.relatedNode}</p>
            <p className="text-[var(--text-2)]">Status: {activeEvent.status}</p>
            <p className="text-[var(--accent)]">Synthetic signal score: {activeEvent.score}</p>
          </div>
        ) : null}
      </Drawer>
    </section>
  );
}