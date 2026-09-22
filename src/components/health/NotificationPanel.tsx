import { type NotificationItem } from "../../types/health";

type NotificationPanelProps = {
  notifications: NotificationItem[];
};

const priorityColor: Record<NotificationItem["priority"], string> = {
  low: "text-[var(--ok)]",
  medium: "text-[var(--warn)]",
  high: "text-[var(--danger)]",
};

export function NotificationPanel({ notifications }: NotificationPanelProps) {
  return (
    <div className="space-y-3">
      {notifications.map((item) => (
        <article key={item.id} className="rounded-xl border border-[var(--line-soft)] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium">{item.title}</p>
            <p className={`text-xs uppercase tracking-[0.14em] ${priorityColor[item.priority]}`}>{item.priority}</p>
          </div>
          <p className="mt-1 text-sm text-[var(--text-1)]">{item.message}</p>
          <p className="mt-2 text-xs text-[var(--text-1)]">{item.time}</p>
        </article>
      ))}
    </div>
  );
}