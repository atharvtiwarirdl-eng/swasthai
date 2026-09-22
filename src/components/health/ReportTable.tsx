import { type ReportItem } from "../../types/health";

type ReportTableProps = {
  reports: ReportItem[];
};

export function ReportTable({ reports }: ReportTableProps) {
  return (
    <section className="surface overflow-hidden rounded-2xl">
      <div className="border-b border-[var(--line-soft)] px-4 py-3">
        <h3 className="text-lg font-semibold">Medical Reports</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.14em] text-[var(--text-1)]">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Summary</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-[var(--line-soft)]/70 align-top">
                <td className="px-4 py-3 text-[var(--text-1)]">{report.date}</td>
                <td className="px-4 py-3">{report.type}</td>
                <td className="px-4 py-3 text-[var(--text-1)]">{report.summary}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-lg px-2 py-1 text-xs ${
                      report.status === "normal"
                        ? "bg-[rgba(68,214,166,0.18)] text-[var(--ok)]"
                        : "bg-[rgba(255,209,115,0.2)] text-[var(--warn)]"
                    }`}
                  >
                    {report.status === "normal" ? "Normal" : "Needs Review"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}