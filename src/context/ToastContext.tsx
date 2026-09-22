import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastEntry = {
  id: number;
  title: string;
  message: string;
};

type ToastContextValue = {
  pushToast: (title: string, message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const pushToast = useCallback((title: string, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[70] flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className="surface-strong rounded-xl p-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <p className="text-sm font-semibold">{toast.title}</p>
              <p className="mt-0.5 text-xs text-[var(--text-1)]">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}