import { NavLink } from "react-router-dom";
import { appRoutes } from "../../config/navigation";
import { cn } from "../../utils/cn";

type SidebarProps = {
  compact?: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ compact = false, onNavigate }: SidebarProps) {
  return (
    <aside className={cn("surface h-full overflow-y-auto border-b-0 border-l-0 border-t-0", compact ? "p-4" : "p-5")}>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-1)]">SwasthAI</p>
        <p className="mt-1 text-2xl font-semibold">Constellation Care</p>
      </div>
      <nav className="space-y-1">
        {appRoutes.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "block rounded-lg px-3 py-2 text-sm transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                isActive
                  ? "bg-[rgba(126,175,236,0.18)] text-[var(--text-0)]"
                  : "text-[var(--text-1)] hover:bg-white/5 hover:text-[var(--text-0)]",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}