import { forwardRef } from "react";
import clsx from "clsx";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.2em] text-cream-100/60">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        rows={5}
        className={clsx(
          "resize-none rounded-lg border border-cream-100/15 bg-cream-100/[0.04] px-4 py-3 text-cream-50 placeholder:text-cream-100/30 outline-none transition-colors focus:border-gold-400/70 focus:bg-cream-100/[0.06]",
          error && "border-wine-500/80 focus:border-wine-500",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#e08a97]">
          {error}
        </p>
      )}
    </div>
  );
});
