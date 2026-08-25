import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "max-w-2xl text-balance text-base leading-relaxed text-cream-100/70 sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
