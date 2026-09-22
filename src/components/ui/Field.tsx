import { type InputHTMLAttributes } from "react";
import { Input } from "./Input";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function Field({ id, label, ...props }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-[0.14em] text-[var(--text-1)]">
        {label}
      </label>
      <Input id={id} {...props} />
    </div>
  );
}