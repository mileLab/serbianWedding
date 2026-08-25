import clsx from "clsx";

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
};

export function ButtonLink({ className, variant = "primary", children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300",
        variant === "primary" &&
          "bg-gold-400 text-ink-950 shadow-[0_0_0_1px_rgba(212,168,63,0.4)] hover:bg-gold-300 hover:shadow-[0_0_30px_-4px_rgba(212,168,63,0.6)]",
        variant === "ghost" &&
          "border border-cream-100/25 text-cream-100 hover:border-gold-300/70 hover:text-gold-200",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
