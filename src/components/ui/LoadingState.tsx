import { motion } from "framer-motion";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading health data" }: LoadingStateProps) {
  return (
    <div className="surface rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <motion.span
          className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <p className="text-sm text-[var(--text-1)]">{label}</p>
      </div>
    </div>
  );
}