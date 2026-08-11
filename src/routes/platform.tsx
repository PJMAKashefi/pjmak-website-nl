import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/routes/index";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "The Platform — PJMAK Command Center Architecture" },
      {
        name: "description",
        content:
          "A four-layer, on-premise PMIS integration architecture: integration and data quality, PMO governance, accountability, and offline decision intelligence.",
      },
      { property: "og:title", content: "The Platform — PJMAK Command Center Architecture" },
      {
        property: "og:description",
        content: "Four layers, four data zones, zero public cloud routing. Built for GDPR-strict enterprises.",
      },
    ],
  }),
  component: Platform,
});

function Platform() {
  const { lang } = useLang();

  return (
    <>
      <div className="border-b border-border command-bg">
        <Section eyebrow={pick(lang, copy.layers.eyebrow)} title={pick(lang, copy.layers.title)} lead={pick(lang, copy.layers.lead)} />
      </div>

      <Section>
        <div className="space-y-px overflow-hidden border border-border bg-border">
          {copy.layers.items.map((l) => (
            <div key={l.n} className="grid gap-4 bg-card p-7 md:grid-cols-[150px_1fr] md:items-start">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary">{l.n}</span>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{l.codes}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{pick(lang, l.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(lang, l.body)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="border-y border-border bg-surface-deep">
        <Section eyebrow={pick(lang, copy.zones.eyebrow)} title={pick(lang, copy.zones.title)}>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
            {copy.zones.items.map((z) => (
              <div key={z.n} className="bg-card p-6">
                <span className="font-mono text-xs text-primary">{z.n}</span>
                <h3 className="mt-3 font-semibold">{pick(lang, z.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(lang, z.body)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

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

      <CtaBand />
    </>
  );
}
