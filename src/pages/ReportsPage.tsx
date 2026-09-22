import { useState } from "react";
import { ReportTable } from "../components/health/ReportTable";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { Input } from "../components/ui/Input";
import { reports } from "../data/syntheticHealthData";

export function ReportsPage() {
  const [query, setQuery] = useState("");
  const [showError, setShowError] = useState(false);

  const filteredReports = reports.filter((report) =>
    [report.type, report.summary].join(" ").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <section className="surface rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search report type or summary"
            className="max-w-sm"
          />
          <Button variant="secondary" onClick={() => setShowError((prev) => !prev)}>
            Toggle Error State
          </Button>
        </div>
      </section>
      {showError ? (
        <ErrorState
          title="Unable to process report feed"
          message="This is a synthetic fallback state for Phase 1 resilience checks."
          onRetry={() => setShowError(false)}
        />
      ) : filteredReports.length === 0 ? (
        <EmptyState title="No reports found" message="Try a broader query to surface all uploaded records." />
      ) : (
        <ReportTable reports={filteredReports} />
      )}
    </div>
  );
}