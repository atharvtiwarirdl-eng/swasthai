import { HealthTimeline } from "../components/health/HealthTimeline";
import { timelineEvents } from "../data/syntheticHealthData";

export function TimelinePage() {
  return (
    <div className="space-y-6">
      <HealthTimeline events={timelineEvents} />
    </div>
  );
}