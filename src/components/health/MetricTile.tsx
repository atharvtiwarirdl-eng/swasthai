import { motion, useReducedMotion } from "framer-motion";

type MetricTileProps = {
  label: string;
  value: string;
  delta: string;
};

export function MetricTile({ label, value, delta }: MetricTileProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="surface rounded-2xl p-4"
      whileHover={reduceMotion ? undefined : { y: -2, borderColor: "rgba(180, 199, 236, 0.4)" }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold leading-none">{value}</p>
      <p className="mt-2 text-sm text-[var(--accent)]">{delta}</p>
    </motion.div>
  );
}