import { type InsightItem } from "../../types/health";

type AIInsightPanelProps = {
  insights: InsightItem[];
};

export function AIInsightPanel({ insights }: AIInsightPanelProps) {
  return (
    <section className="surface rounded-2xl p-4">
      <h3 className="text-lg font-semibold">AI Insights (Demo)</h3>
      <p className="mt-1 text-sm text-[var(--text-1)]">Pattern summaries generated from synthetic events.</p>
      <div className="mt-4 space-y-4">
        {insights.map((insight) => (
          <article key={insight.id} className="border-l-2 border-[var(--accent-2)] pl-3">
            <p className="font-medium">{insight.headline}</p>
            <p className="mt-1 text-sm text-[var(--text-1)]">{insight.detail}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--accent)]">Confidence {insight.confidence}%</p>
          </article>
        ))}
      </div>
    </section>
  );
}