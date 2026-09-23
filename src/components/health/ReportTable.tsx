import { type HealthReport } from "../../types/health";

type ReportTableProps = {
  reports: HealthReport[];
  onSelect?: (report: HealthReport) => void;
};

export function ReportTable({ reports, onSelect }: ReportTableProps) {
  return (
    <section className="surface overflow-hidden rounded-2xl">
      <div className="border-b border-[var(--line-soft)] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Clinical Archive
            </p>
            <h3 className="mt-1 text-lg font-semibold">Medical Reports</h3>
          </div>

          <span className="rounded-full border border-[var(--line-soft)] px-2.5 py-1 text-xs text-[var(--text-1)]">
            {reports.length} {reports.length === 1 ? "report" : "reports"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.14em] text-[var(--text-1)]">
              <th className="px-4 py-3 font-medium">Report</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-t border-[var(--line-soft)]/70 align-top transition-colors hover:bg-white/[0.025]"
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onSelect?.(report)}
                    className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <p className="font-medium hover:text-[var(--accent)]">
                      {report.name}
                    </p>
                    <p className="mt-1 max-w-[360px] text-xs leading-5 text-[var(--text-1)]">
                      {report.summary}
                    </p>
                  </button>
                </td>

                <td className="px-4 py-3 text-[var(--text-1)]">
                  {report.category}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-[var(--text-1)]">
                  {report.date}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs ${
                      report.status === "normal"
                        ? "bg-[rgba(68,214,166,0.18)] text-[var(--ok)]"
                        : "bg-[rgba(255,209,115,0.2)] text-[var(--warn)]"
                    }`}
                  >
                    {report.status === "normal" ? "Normal" : "Needs Review"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onSelect?.(report)}
                    className="rounded-md border border-[var(--line-soft)] px-2.5 py-1 text-xs text-[var(--text-1)] transition hover:border-[var(--accent)] hover:text-[var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}