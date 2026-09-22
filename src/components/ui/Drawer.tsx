import { AnimatePresence, motion } from "framer-motion";
import { type PropsWithChildren } from "react";

type DrawerProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
}>;

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            aria-label="Close drawer backdrop"
          />
          <motion.aside
            className="surface-strong absolute right-0 top-0 h-full w-full max-w-md border-l border-[var(--line-soft)] p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button className="text-sm text-[var(--text-1)] hover:text-[var(--text-0)]" onClick={onClose}>
                Close
              </button>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}