import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

type NavbarProps = {
  onOpenNotifications: () => void;
  onOpenNav: () => void;
  pageTitle: string;
  pageSubtitle: string;
  unreadCount: number;
};

export function Navbar({
  onOpenNotifications,
  onOpenNav,
  pageTitle,
  pageSubtitle,
  unreadCount,
}: NavbarProps) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("swasthya-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("swasthya-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
      localStorage.setItem("swasthya-theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <header className="surface sticky top-0 z-20 border-x-0 border-t-0 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--text-1)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:hidden"
            onClick={onOpenNav}
            aria-label="Open navigation"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-1)]">
              SwasthAI
            </p>

            <h1 className="truncate text-lg font-semibold">
              {pageTitle}
            </h1>

            <p className="hidden text-xs text-[var(--text-2)] sm:block">
              {pageSubtitle}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Light mode" : "Dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] text-[var(--text-1)] transition-all hover:border-[var(--accent)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-0)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {darkMode ? (
              /* Sun */
              <svg
                viewBox="0 0 24 24"
                className="h-[17px] w-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.42 1.42" />
                <path d="m17.65 17.65 1.42 1.42" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.35 17.65-1.42 1.42" />
                <path d="m19.07 4.93-1.42 1.42" />
              </svg>
            ) : (
              /* Moon */
              <svg
                viewBox="0 0 24 24"
                className="h-[17px] w-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <Button
            variant="ghost"
            onClick={onOpenNotifications}
            className="px-3"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
              <path d="M9.5 20a2.5 2.5 0 0 0 5 0" />
            </svg>

            <span className="hidden sm:inline">
              Alerts {unreadCount > 0 ? `(${unreadCount})` : ""}
            </span>

            <span className="sm:hidden">
              {unreadCount > 0 ? unreadCount : ""}
            </span>
          </Button>

          {/* Profile */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--accent-dark),var(--accent))] text-xs font-semibold text-white">
            SP
          </div>
        </div>
      </div>
    </header>
  );
}