import clsx from "clsx";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/70" />
    </div>
  );
}
