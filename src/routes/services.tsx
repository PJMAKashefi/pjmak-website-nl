import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/routes/index";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Project Controls, PMO & Portfolio Delivery | PJMAK" },
      {
        name: "description",
        content:
          "Project controls, cost and risk management, PMO set-up, portfolio and change management, and executive reporting for capital-intensive organisations.",
      },
      { property: "og:title", content: "Services — Project Controls, PMO & Portfolio Delivery | PJMAK" },
      {
        property: "og:description",
        content: "The disciplines that turn a project portfolio into delivered enterprise strategy.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  const { lang } = useLang();

  return (
    <>
      <div className="border-b border-border command-bg">
        <Section
          eyebrow={pick(lang, copy.services.eyebrow)}
          title={pick(lang, copy.services.title)}
          lead={pick(lang, copy.services.lead)}
        />
      </div>

      <Section>
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {copy.services.items.map((s) => (
            <div key={s.title.en} className="bg-card p-7">
              <h3 className="text-xl font-semibold">{pick(lang, s.title)}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{pick(lang, s.body)}</p>
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
