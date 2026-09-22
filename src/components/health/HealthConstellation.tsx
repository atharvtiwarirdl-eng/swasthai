import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { type ConstellationNode, type ConstellationRelationship, type HealthDomain } from "../../types/health";
import { cn } from "../../utils/cn";

type HealthConstellationProps = {
  nodes: ConstellationNode[];
  links: ConstellationRelationship[];
};

const statusStyle = {
  stable: "bg-[var(--ok)]",
  watch: "bg-[var(--warn)]",
  attention: "bg-[var(--danger)]",
};

const statusText = {
  stable: "Stable",
  watch: "Watch",
  attention: "Attention",
};

export function HealthConstellation({ nodes, links }: HealthConstellationProps) {
  const [selected, setSelected] = useState<HealthDomain>(nodes[0]?.id ?? "vitals");
  const reduceMotion = useReducedMotion();

  const selectedNode = nodes.find((node) => node.id === selected) ?? nodes[0];
  const relationships = useMemo(() => links.filter((link) => link.from === selected || link.to === selected), [links, selected]);

  const connectedIds = useMemo(
    () => new Set<HealthDomain>([selected, ...relationships.map((link) => (link.from === selected ? link.to : link.from))]),
    [relationships, selected],
  );

  const linksWithCoords = useMemo(
    () =>
      links
        .map((link) => {
          const from = nodes.find((node) => node.id === link.from);
          const to = nodes.find((node) => node.id === link.to);
          if (!from || !to) return null;
          return { ...link, from, to, active: link.from === selected || link.to === selected };
        })
        .filter((link): link is ConstellationRelationship & { from: ConstellationNode; to: ConstellationNode; active: boolean } => Boolean(link)),
    [links, nodes, selected],
  );

  return (
    <section className="surface constellation-grid rounded-3xl p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Health Constellation</h2>
          <p className="text-sm text-[var(--text-1)]">Select a domain to inspect live relationships across your synthetic health system.</p>
        </div>
        <p className="text-sm text-[var(--text-2)]">Selected: <span className="font-medium text-[var(--text-0)]">{selectedNode.label}</span></p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="surface-soft relative h-[420px] overflow-hidden rounded-2xl p-3 md:h-[460px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {linksWithCoords.map((link) => (
              <motion.line
                key={link.id}
                x1={link.from.x}
                y1={link.from.y}
                x2={link.to.x}
                y2={link.to.y}
                stroke={link.active ? "rgba(99,215,232,0.92)" : "rgba(142,165,214,0.2)"}
                strokeWidth={Math.max(0.32, link.weight)}
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
              />
            ))}
          </svg>

          {nodes.map((node) => {
            const isConnected = connectedIds.has(node.id);
            const isSelected = node.id === selected;

            return (
              <motion.button
                key={node.id}
                type="button"
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-1.5 py-1 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isSelected ? "z-20" : "z-10",
                )}
                style={{ left: `${node.x}%`, top: `${node.y}%`, opacity: isConnected ? 1 : 0.35 }}
                onClick={() => setSelected(node.id)}
                onFocus={() => setSelected(node.id)}
                aria-label={`${node.label}: ${statusText[node.status]} signal ${node.value}`}
              >
                <motion.span
                  className={cn("mb-1 block h-3.5 w-3.5 rounded-full border border-white/30", statusStyle[node.status])}
                  animate={
                    reduceMotion || !isSelected
                      ? { scale: 1 }
                      : { scale: [1, 1.14, 1], boxShadow: ["0 0 0 rgba(99,215,232,0)", "0 0 10px rgba(99,215,232,0.75)", "0 0 0 rgba(99,215,232,0)"] }
                  }
                  transition={{ duration: 1.8, repeat: reduceMotion ? 0 : Infinity }}
                />
                <span className="text-[11px] text-[var(--text-1)]">{node.label}</span>
              </motion.button>
            );
          })}
        </div>

        <aside className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">Domain Signal</p>
          <p className="mt-2 text-3xl font-semibold">{selectedNode.value}</p>
          <p className="mt-1 text-sm text-[var(--accent)]">{selectedNode.trend > 0 ? "+" : ""}{selectedNode.trend}% trend</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--text-1)]">Status: {statusText[selectedNode.status]}</p>
          <p className="mt-3 text-sm text-[var(--text-1)]">{selectedNode.summary}</p>

          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">Connected Relationships</p>
          <ul className="mt-2 space-y-2">
            {relationships.map((link) => {
              const connectedLabel = link.from === selected ? link.to : link.from;
              return (
                <li key={link.id} className="rounded-lg border border-[var(--line-soft)] px-2.5 py-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{connectedLabel}</p>
                  <p className="mt-1 text-sm text-[var(--text-1)]">{link.relationship}</p>
                  <p className="mt-1 text-xs text-[var(--text-2)]">Strength {Math.round(link.weight * 100)}%</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t border-[var(--line-soft)] pt-3 lg:hidden">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">Quick Select</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelected(node.id)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    node.id === selected
                      ? "border-[var(--accent)] text-[var(--text-0)]"
                      : "border-[var(--line-soft)] text-[var(--text-1)]",
                  )}
                >
                  {node.label}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}