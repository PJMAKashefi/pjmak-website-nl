import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/routes/index";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

export const Route = createFileRoute("/tiers")({
  head: () => ({
    meta: [
      { title: "Service Tiers — Silver, Gold & Diamond | PJMAK" },
      {
        name: "description",
        content:
          "Three deployment depths for the PJMAK command center: Silver core monitoring, Gold active governance, Diamond predictive command room.",
      },
      { property: "og:title", content: "Service Tiers — Silver, Gold & Diamond | PJMAK" },
      {
        property: "og:description",
        content: "Every tier is a complete standalone product, upgradeable without a rewrite or downtime.",
      },
    ],
  }),
  component: Tiers,
});

function Tiers() {
  const { lang } = useLang();

  return (
    <>
      <div className="border-b border-border command-bg">
        <Section eyebrow={pick(lang, copy.tiers.eyebrow)} title={pick(lang, copy.tiers.title)} lead={pick(lang, copy.tiers.lead)} />
      </div>

      <Section>
        <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
          {copy.tiers.items.map((t, i) => (
            <div key={t.name} className="flex flex-col bg-card p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                {`0${i + 1}`} · {t.name}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{pick(lang, t.subtitle)}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{pick(lang, t.body)}</p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                {pick(lang, t.points).map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <div className="border-y border-border bg-surface-deep">
        <Section eyebrow={pick(lang, copy.compliance.eyebrow)} title={pick(lang, copy.compliance.title)}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {copy.compliance.items.map((c) => (
              <div key={c.title.en} className="panel p-6">
                <h3 className="text-lg font-semibold">{pick(lang, c.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(lang, c.body)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <CtaBand />
    </>
  );
}
