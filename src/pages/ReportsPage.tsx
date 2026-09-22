import { useMemo, useState } from "react";
import { constellationLinks, timelineEvents } from "../data/syntheticHealthData";
import { Drawer } from "../components/ui/Drawer";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { Input } from "../components/ui/Input";
import { LoadingState } from "../components/ui/LoadingState";
import { useReports } from "../hooks/useReports";
import { type HealthReport } from "../types/health";

const categories: Array<HealthReport["category"] | "All"> = [
  "All",
  "Blood Test",
  "Imaging",
  "General Checkup",
  "Cardiology",
  "Preventive Health",
];

export function ReportsPage() {
  const { data, loading, error, reload } = useReports();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<HealthReport["category"] | "All">("All");
  const [activeReport, setActiveReport] = useState<HealthReport | null>(null);

  const filtered = useMemo(() => {
    const records = data ?? [];
    return records.filter((report) => {
      const matchCategory = category === "All" || report.category === category;
      const matchSearch = [report.name, report.summary, report.category].join(" ").toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, data, search]);

  if (loading) return <LoadingState label="Loading synthetic report archive" />;
  if (!data || error) {
    return <ErrorState title="Report archive unavailable" message={error ?? "Unable to fetch report records."} onRetry={() => void reload()} />;
  }

  return (
    <div className="space-y-4">
      <section>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Medical Evidence</p>
        <h2 className="mt-2 text-3xl font-semibold">Report archive</h2>
      </section>

      <section className="surface rounded-2xl p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,320px)_1fr] md:items-end">
          <div className="space-y-1.5">
            <label htmlFor="report-search" className="text-xs uppercase tracking-[0.14em] text-[var(--text-1)]">
              Search Reports
            </label>
            <Input id="report-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, summary, category" />
          </div>
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-md border px-2.5 py-1 text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  category === item ? "border-[var(--accent)] text-[var(--text-0)]" : "border-[var(--line-soft)] text-[var(--text-1)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <EmptyState title="No reports match the current filter" message="Try selecting another category or broadening your search query." />
      ) : (
        <section className="surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.14em] text-[var(--text-1)]">
                  <th className="px-4 py-3 font-medium">Report</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((report) => (
                  <tr key={report.id} className="border-t border-[var(--line-soft)]/70 align-top">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-left hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        onClick={() => setActiveReport(report)}
                      >
                        <p className="font-medium">{report.name}</p>
                        <p className="mt-1 text-xs text-[var(--text-1)]">{report.summary}</p>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-1)]">{report.category}</td>
                    <td className="px-4 py-3 text-[var(--text-1)]">{report.date}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md px-2 py-1 text-xs ${report.status === "normal" ? "bg-[rgba(68,214,166,0.18)] text-[var(--ok)]" : "bg-[rgba(255,209,115,0.2)] text-[var(--warn)]"}`}>
                        {report.status === "normal" ? "Normal" : "Needs Review"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Drawer open={Boolean(activeReport)} onClose={() => setActiveReport(null)} title={activeReport?.name ?? "Report Detail"}>
        {activeReport ? (
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-[var(--text-2)]">Date: {activeReport.date}</p>
              <p className="text-[var(--text-2)]">Category: {activeReport.category}</p>
              <p className="text-[var(--text-2)]">Status: {activeReport.status === "normal" ? "Normal" : "Needs Review"}</p>
            </div>
            <p className="text-[var(--text-1)]">{activeReport.summary}</p>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">Key Values (Synthetic)</p>
              {activeReport.keyValues.map((item) => (
                <p key={item.label} className="surface-soft rounded-lg p-2">
                  <span className="font-medium">{item.label}:</span> {item.value}
                  <span className="ml-2 text-[var(--text-2)]">{item.reference}</span>
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">Related Events</p>
              {activeReport.relatedTimelineIds.map((eventId) => {
                const event = timelineEvents.find((item) => item.id === eventId);
                return (
                  <p key={eventId} className="surface-soft rounded-lg p-2 text-[var(--text-1)]">
                    {event ? `${event.title} · ${event.date}` : `Timeline reference ${eventId}`}
                  </p>
                );
              })}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">Health Connections</p>
              {constellationLinks
                .filter((link) => link.from === "reports" || link.to === "reports")
                .map((link) => (
                  <p key={link.id} className="surface-soft rounded-lg p-2 text-[var(--text-1)]">
                    {link.relationship}
                  </p>
                ))}
            </div>
            <p className="text-xs text-[var(--text-2)]">All report details are synthetic demo data for Phase 2 architecture validation.</p>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}