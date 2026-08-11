import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sectors } from "@/content/sectors";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/demo/")({
  head: () => ({
    meta: [
      { title: "Request a Command Center Demo — PJMAK" },
      {
        name: "description",
        content:
          "Answer three short questions about your organisation and we route you to the PJMAK command center environment configured for your sector.",
      },
      { property: "og:title", content: "Request a Command Center Demo — PJMAK" },
      { property: "og:description", content: "Sector-specific demo routing for EPC, public sector, logistics, energy, industry and regulated networks." },
    ],
  }),
  component: DemoQualifier,
});

const t = {
  eyebrow: { en: "Demo routing", nl: "Demo-routing" },
  title: { en: "Which environment should we open for you?", nl: "Welke omgeving zullen wij voor u openen?" },
  lead: {
    en: "The command center is configured per industry. Three questions and you are routed to the right one.",
    nl: "Het commandocentrum is per sector ingericht. Drie vragen en u wordt naar de juiste omgeving geleid.",
  },
  q1: { en: "1. What type of organisation are you?", nl: "1. Wat voor organisatie bent u?" },
  q2: { en: "2. What is your role?", nl: "2. Wat is uw rol?" },
  q3: { en: "3. How large is the portfolio you oversee?", nl: "3. Hoe groot is het portfolio dat u overziet?" },
  back: { en: "Back", nl: "Terug" },
  next: { en: "Continue", nl: "Doorgaan" },
  step: { en: "Step", nl: "Stap" },
  of: { en: "of", nl: "van" },
};

const roles = [
  { id: "exec", en: "Executive / board", nl: "Directie / bestuur" },
  { id: "pmo", en: "PMO or programme director", nl: "PMO- of programmadirecteur" },
  { id: "controls", en: "Project controls / planning", nl: "Projectbeheersing / planning" },
  { id: "it", en: "IT, data or security", nl: "IT, data of security" },
];

const scales = [
  { id: "s", en: "Under €10M per year", nl: "Onder €10 mln per jaar" },
  { id: "m", en: "€10M – €100M per year", nl: "€10 mln – €100 mln per jaar" },
  { id: "l", en: "€100M – €500M per year", nl: "€100 mln – €500 mln per jaar" },
  { id: "xl", en: "Above €500M per year", nl: "Boven €500 mln per jaar" },
];

function DemoQualifier() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const persist = (scale: string) => {
    window.localStorage.setItem(
      "pjmak-demo-profile",
      JSON.stringify({ sector, role, scale, at: new Date().toISOString() }),
    );
  };

  return (
    <div className="command-bg">
      <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
        <p className="eyebrow">{pick(lang, t.eyebrow)}</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{pick(lang, t.title)}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{pick(lang, t.lead)}</p>

        <div className="mt-10 flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1 w-16 ${i <= step ? "bg-primary" : "bg-border"}`} />
          ))}
          <span className="font-mono text-xs text-muted-foreground">
            {pick(lang, t.step)} {step + 1} {pick(lang, t.of)} 3
          </span>
        </div>

        <div className="panel mt-8 p-6 md:p-10">
          {step === 0 && (
            <>
              <h2 className="text-lg font-semibold">{pick(lang, t.q1)}</h2>
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                {sectors.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSector(s.id);
                      setStep(1);
                    }}
                    className="group bg-card p-5 text-left transition-colors hover:bg-accent"
                  >
                    <span className="font-mono text-[11px] text-primary">{s.code}</span>
                    <h3 className="mt-2 font-semibold">{pick(lang, s.name)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pick(lang, s.short)}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">{pick(lang, t.q2)}</h2>
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setStep(2);
                    }}
                    className="bg-card p-5 text-left font-medium transition-colors hover:bg-accent"
                  >
                    {lang === "en" ? r.en : r.nl}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold">{pick(lang, t.q3)}</h2>
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                {scales.map((sc) => (
                  <Link
                    key={sc.id}
                    to="/demo/$sector"
                    params={{ sector: sector ?? "epc" }}
                    onClick={() => persist(sc.id)}
                    className="flex items-center justify-between gap-2 bg-card p-5 text-left font-medium transition-colors hover:bg-accent"
                  >
                    {lang === "en" ? sc.en : sc.nl}
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </Link>
                ))}
              </div>
            </>
          )}

          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {pick(lang, t.back)}
            </button>
          )}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {role ? `role: ${role} · ` : ""}
          {sector ? `sector: ${sector}` : ""}
        </p>
      </div>
    </div>
  );
}
