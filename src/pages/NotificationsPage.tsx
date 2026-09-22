import { useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { ErrorState } from "../components/ui/ErrorState";
import { LoadingState } from "../components/ui/LoadingState";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const { data, loading, error, reload } = useNotifications();
  const [readIds, setReadIds] = useState<string[]>([]);

  const merged = useMemo(
    () =>
      (data ?? []).map((item) => ({
        ...item,
        read: item.read || readIds.includes(item.id),
      })),
    [data, readIds],
  );

  if (loading) return <LoadingState label="Loading notifications" />;
  if (!data || error) return <ErrorState title="Notification feed unavailable" message={error ?? "Unable to fetch notifications."} onRetry={() => void reload()} />;

  return (
    <div className="space-y-4">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Signal Inbox</p>
          <h2 className="mt-2 text-3xl font-semibold">Notifications</h2>
        </div>
        <Button variant="secondary" onClick={() => setReadIds(merged.map((item) => item.id))}>Mark all as read</Button>
      </section>
      <section className="surface rounded-2xl p-4">
        <div className="space-y-3">
          {merged.map((item) => (
            <article key={item.id} className={`rounded-xl border p-3 ${item.read ? "border-[var(--line-soft)]" : "border-[var(--accent)]"}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-2)]">{item.type}</p>
              </div>
              <p className="mt-1 text-sm text-[var(--text-1)]">{item.message}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-[var(--text-2)]">{item.timestamp}</p>
                {!item.read ? (
                  <Button variant="ghost" onClick={() => setReadIds((prev) => [...prev, item.id])} className="px-2 py-1 text-xs">
                    Mark read
                  </Button>
                ) : (
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--ok)]">Read</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}