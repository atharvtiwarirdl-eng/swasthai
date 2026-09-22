import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { type ConstellationNode } from "../../types/health";
import { cn } from "../../utils/cn";

type HealthConstellationProps = {
  nodes: ConstellationNode[];
};

const statusStyle = {
  stable: "bg-[var(--ok)]",
  watch: "bg-[var(--warn)]",
  attention: "bg-[var(--danger)]",
};

export function HealthConstellation({ nodes }: HealthConstellationProps) {
  const [activeId, setActiveId] = useState(nodes[0]?.id);

  const lines = useMemo(() => {
    const loop = [...nodes, nodes[0]];
    return loop.slice(0, -1).map((node, idx) => ({ from: node, to: loop[idx + 1] }));
  }, [nodes]);

  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];

  return (
    <section className="surface constellation-grid relative overflow-hidden rounded-3xl p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Health Constellation</h2>
          <p className="text-sm text-[var(--text-1)]">Connected domains update as one living health system.</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-[var(--text-1)]">Focused Domain</p>
          <p className="font-semibold">{activeNode.label}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="relative h-[380px] rounded-2xl border border-[var(--line-soft)] bg-[radial-gradient(circle_at_center,rgba(99,215,232,0.13),transparent_58%)]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {lines.map((line) => (
              <motion.line
                key={`${line.from.id}-${line.to.id}`}
                x1={line.from.x}
                y1={line.from.y}
                x2={line.to.x}
                y2={line.to.y}
                stroke="rgba(153,179,231,0.35)"
                strokeWidth="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9 }}
              />
            ))}
          </svg>
          {nodes.map((node, index) => (
            <motion.button
              key={node.id}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 text-left",
                activeId === node.id ? "z-10" : "z-0",
              )}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 }}
            >
              <motion.span
                className={cn(
                  "mb-1 block h-3.5 w-3.5 rounded-full border border-white/30",
                  statusStyle[node.status],
                )}
                animate={activeId === node.id ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 1.7, repeat: Infinity }}
              />
              <span className="text-xs text-[var(--text-1)]">{node.label}</span>
            </motion.button>
          ))}
        </div>
        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">Domain Signal</p>
          <p className="mt-2 text-3xl font-semibold">{activeNode.value}</p>
          <p className="mt-1 text-sm text-[var(--accent)]">{activeNode.trend > 0 ? "+" : ""}{activeNode.trend}% week-over-week</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-1)]">{activeNode.summary}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--text-1)]">Connected To</p>
          <ul className="mt-2 space-y-2 text-sm">
            {nodes
              .filter((node) => node.id !== activeNode.id)
              .slice(0, 3)
              .map((node) => (
                <li key={node.id} className="flex items-center justify-between text-[var(--text-1)]">
                  <span>{node.label}</span>
                  <span>{node.value}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}