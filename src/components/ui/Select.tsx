import { forwardRef } from "react";
import clsx from "clsx";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, id, className, children, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.2em] text-cream-100/60">
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        className={clsx(
          "rounded-lg border border-cream-100/15 bg-cream-100/[0.04] px-4 py-3 text-cream-50 outline-none transition-colors focus:border-gold-400/70 focus:bg-cream-100/[0.06]",
          error && "border-wine-500/80 focus:border-wine-500",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#e08a97]">
          {error}
        </p>
      )}
    </div>
  );
});
