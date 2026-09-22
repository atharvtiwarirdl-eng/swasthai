import { Button } from "../ui/Button";

type NavbarProps = {
  onOpenNotifications: () => void;
  onOpenNav: () => void;
};

export function Navbar({ onOpenNotifications, onOpenNav }: NavbarProps) {
  return (
    <header className="surface sticky top-0 z-20 border-x-0 border-t-0 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-[var(--text-1)] md:hidden"
            onClick={onOpenNav}
            aria-label="Open navigation"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-1)]">SwasthAI</p>
            <h1 className="text-lg font-semibold">Patient Intelligence</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onOpenNotifications} className="px-3">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
              <path d="M9.5 20a2.5 2.5 0 0 0 5 0" />
            </svg>
            Alerts
          </Button>
          <div className="h-9 w-9 rounded-full bg-[linear-gradient(145deg,var(--accent-2),var(--accent))]" />
        </div>
      </div>
    </header>
  );
}