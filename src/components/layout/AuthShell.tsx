import { type PropsWithChildren, type ReactNode } from "react";

type AuthShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer: ReactNode;
}>;

export function AuthShell({ eyebrow, title, subtitle, footer, children }: AuthShellProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <section className="surface-strong w-full rounded-[28px] p-7 sm:p-8">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--text-1)]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-[var(--text-1)]">{subtitle}</p> : null}
        <div className="mt-6 space-y-4">{children}</div>
        <div className="mt-5 text-sm text-[var(--text-1)]">{footer}</div>
      </section>
    </div>
  );
}