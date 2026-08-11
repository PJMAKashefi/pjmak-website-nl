import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-20 md:py-28 ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && (
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      )}
      {lead && <p className="mt-4 max-w-2xl text-base text-muted-foreground">{lead}</p>}
      {children}
    </section>
  );
}
