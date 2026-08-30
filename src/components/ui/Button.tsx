import { forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[background-color,box-shadow,border-color,color] duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-gold-400 text-ink-950 shadow-[0_0_0_1px_rgba(212,168,63,0.4)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-gold-300 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_30px_-4px_rgba(212,168,63,0.6)]",
        variant === "ghost" &&
          "border border-cream-100/25 text-cream-100 [@media(hover:hover)_and_(pointer:fine)]:hover:border-gold-300/70 [@media(hover:hover)_and_(pointer:fine)]:hover:text-gold-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
