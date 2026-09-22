import { useEffect, useState } from "react";
import { AIInsightPanel } from "../components/health/AIInsightPanel";
import { HealthConstellation } from "../components/health/HealthConstellation";
import { VitalsAreaChart } from "../components/health/VitalsAreaChart";
import { LoadingState } from "../components/ui/LoadingState";
import { aiInsights, constellationNodes, vitalSeries } from "../data/syntheticHealthData";

export function HealthOverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(id);
  }, []);

  if (loading) {
    return <LoadingState label="Rendering full health overview" />;
  }

  return (
    <div className="space-y-6">
      <HealthConstellation nodes={constellationNodes} />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <VitalsAreaChart data={vitalSeries} />
        <AIInsightPanel insights={aiInsights} />
      </div>
    </div>
  );
}