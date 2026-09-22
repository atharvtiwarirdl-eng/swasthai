import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "surface w-full rounded-xl px-3 py-2.5 text-sm text-[var(--text-0)] placeholder:text-[var(--text-1)]/70 outline-none transition focus:border-[rgba(189,206,238,0.55)]",
        className,
      )}
      {...props}
    />
  );
});