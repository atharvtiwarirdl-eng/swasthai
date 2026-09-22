import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg items-center px-4">
      <div className="surface-strong w-full rounded-3xl p-8 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-1)]">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-[var(--text-1)]">This route is outside the Phase 1 scope.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Back to landing</Button>
        </Link>
      </div>
    </div>
  );
}