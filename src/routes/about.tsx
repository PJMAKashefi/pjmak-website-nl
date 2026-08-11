import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/routes/index";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PJMAK — Project Control Engineering from 's-Hertogenbosch" },
      {
        name: "description",
        content:
          "PJMAK is a Dutch project control and enterprise data integration practice founded by Mohammad Ali Kashefi, combining EPC project controls experience with an MBA in international management.",
      },
      { property: "og:title", content: "About PJMAK" },
      { property: "og:description", content: "Engineering-grade project controls and on-premise data integration, based in the Netherlands." },
    ],
  }),
  component: About,
});

const t = {
  eyebrow: { en: "About", nl: "Over ons" },
  title: { en: "A practice built on delivery, not slideware.", nl: "Een praktijk gebouwd op uitvoering, niet op slides." },
  lead: {
    en: "PJMAK is an independent Dutch practice for enterprise data integration and project control. We combine hands-on project controls work in capital-intensive industries with a governance-first view of how strategy becomes delivery.",
    nl: "PJMAK is een onafhankelijke Nederlandse praktijk voor enterprise data-integratie en projectbeheersing. Wij combineren praktijkervaring in kapitaalintensieve sectoren met een governance-gedreven blik op hoe strategie realiteit wordt.",
  },
  blocks: [
    {
      title: { en: "Founder", nl: "Oprichter" },
      body: {
        en: "Mohammad Ali Kashefi — MBA International Management (Wittenborg University), with a career in project controls, planning and PMO delivery across engineering and industrial organisations.",
        nl: "Mohammad Ali Kashefi — MBA International Management (Wittenborg University), met een loopbaan in projectbeheersing, planning en PMO-uitvoering binnen engineering- en industriële organisaties.",
      },
    },
    {
      title: { en: "Method", nl: "Methode" },
      body: {
        en: "Structural data audit first, connectors second, dashboards last. We never build a view on a number we cannot trace back to its source system.",
        nl: "Eerst een structurele data-audit, dan connectoren, dan pas dashboards. Wij bouwen nooit een weergave op een getal dat we niet kunnen herleiden tot het bronsysteem.",
      },
    },
    {
      title: { en: "Standards", nl: "Standaarden" },
      body: {
        en: "Cost and forecasting logic follows AACE International and PMI global standards; data exchange follows ISO/IEC data management guidelines.",
        nl: "Kosten- en prognoselogica volgt AACE International- en PMI-standaarden; data-uitwisseling volgt ISO/IEC-richtlijnen voor databeheer.",
      },
    },
    {
      title: { en: "Registered in the Netherlands", nl: "Gevestigd in Nederland" },
      body: {
        en: "PJMAK, KvK 91081289, based in 's-Hertogenbosch and serving clients across the Netherlands and the wider European Union.",
        nl: "PJMAK, KvK 91081289, gevestigd in 's-Hertogenbosch en actief voor klanten in Nederland en de bredere Europese Unie.",
      },
    },
  ],
};

function About() {
  const { lang } = useLang();
  return (
    <>
      <div className="border-b border-border command-bg">
        <Section eyebrow={pick(lang, t.eyebrow)} title={pick(lang, t.title)} lead={pick(lang, t.lead)} />
      </div>
      <Section>
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {t.blocks.map((b) => (
            <div key={b.title.en} className="bg-card p-8">
              <h2 className="text-lg font-semibold">{pick(lang, b.title)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{pick(lang, b.body)}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
