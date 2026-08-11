import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { getSector, COMMAND_CENTER_URL } from "@/content/sectors";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/demo/$sector")({
  loader: ({ params }) => {
    const sector = getSector(params.sector);
    if (!sector) throw notFound();
    return { sectorId: sector.id };
  },
  head: ({ params }) => {
    const s = getSector(params.sector);
    const name = s ? s.name.en : "Sector";
    return {
      meta: [
        { title: `${name} Demo — PJMAK Command Center` },
        {
          name: "description",
          content: s
            ? `A command center environment configured for ${name.toLowerCase()}: ${s.short.en}`
            : "PJMAK command center demo.",
        },
        { property: "og:title", content: `${name} Demo — PJMAK Command Center` },
        {
          property: "og:description",
          content: "Request access to the sector-specific PJMAK command center environment.",
        },
        ...(s ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: SectorDemo,
});

const t = {
  eyebrow: { en: "Sector environment", nl: "Sectoromgeving" },
  pains: { en: "What we usually find", nl: "Wat wij meestal aantreffen" },
  focus: { en: "What this environment shows", nl: "Wat deze omgeving toont" },
  preview: { en: "Live snapshot (sample data)", nl: "Live momentopname (voorbeelddata)" },
  gateTitle: { en: "Open the command center", nl: "Open het commandocentrum" },
  gateBody: {
    en: "Tell us who is looking and we open the interactive environment immediately.",
    nl: "Vertel ons wie er kijkt en wij openen de interactieve omgeving direct.",
  },
  name: { en: "Full name", nl: "Volledige naam" },
  company: { en: "Organisation", nl: "Organisatie" },
  email: { en: "Work email", nl: "Zakelijk e-mailadres" },
  submit: { en: "Unlock the demo", nl: "Demo ontgrendelen" },
  ready: { en: "Access granted", nl: "Toegang verleend" },
  readyBody: {
    en: "Your environment is ready. It opens in a new tab.",
    nl: "Uw omgeving is klaar. Deze opent in een nieuw tabblad.",
  },
  open: { en: "Launch command center", nl: "Start commandocentrum" },
  back: { en: "Choose another sector", nl: "Kies een andere sector" },
  suggested: { en: "Suggested tier", nl: "Aanbevolen niveau" },
};

function SectorDemo() {
  const { sectorId } = Route.useLoaderData();
  const sector = getSector(sectorId)!;
  const { lang } = useLang();
  const [unlocked, setUnlocked] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    window.localStorage.setItem(
      "pjmak-demo-lead",
      JSON.stringify({
        sector: sector.id,
        name: data.get("name"),
        company: data.get("company"),
        email: data.get("email"),
        at: new Date().toISOString(),
      }),
    );
    setUnlocked(true);
  };

  const demoUrl = `${COMMAND_CENTER_URL}?sector=${sector.id}`;

  return (
    <div>
      <div className="border-b border-border command-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <Link to="/demo" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {pick(lang, t.back)}
          </Link>
          <p className="eyebrow mt-8">
            {pick(lang, t.eyebrow)} · {sector.code}
          </p>
          <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{pick(lang, sector.name)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{pick(lang, sector.short)}</p>
          <p className="mt-6 inline-flex items-center gap-2 border border-primary/40 px-3 py-1 font-mono text-xs text-primary">
            {pick(lang, t.suggested)}: {sector.tier}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">{pick(lang, t.preview)}</p>
          <div className="panel mt-4 p-6">
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {sector.kpis.map((k) => (
                <div key={k.value + k.label.en} className="bg-card p-5">
                  <p className="text-xs text-muted-foreground">{pick(lang, k.label)}</p>
                  <p className="mt-2 font-display text-3xl font-semibold">{k.value}</p>
                  <p className={`mt-1 font-mono text-xs ${k.good ? "text-primary" : "text-destructive"}`}>{k.delta}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex h-28 items-end gap-1.5" aria-hidden>
              {[38, 52, 44, 61, 57, 73, 66, 81, 70, 88, 79, 94].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/70"
                  style={{ height: `${h}%`, opacity: 0.35 + i * 0.05 }}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="eyebrow">{pick(lang, t.pains)}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {pick(lang, sector.pains).map((p) => (
                  <li key={p} className="border-l-2 border-destructive/60 pl-3">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow">{pick(lang, t.focus)}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {pick(lang, sector.focus).map((p) => (
                  <li key={p} className="border-l-2 border-primary/60 pl-3">{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="panel h-fit p-7 lg:sticky lg:top-24">
          {!unlocked ? (
            <>
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{pick(lang, t.gateTitle)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{pick(lang, t.gateBody)}</p>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {(["name", "company", "email"] as const).map((field) => (
                  <label key={field} className="block">
                    <span className="text-xs text-muted-foreground">{pick(lang, t[field])}</span>
                    <input
                      required
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </label>
                ))}
                <button
                  type="submit"
                  className="w-full rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {pick(lang, t.submit)}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="eyebrow">{pick(lang, t.ready)}</p>
              <h2 className="mt-3 text-xl font-semibold">{pick(lang, sector.name)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{pick(lang, t.readyBody)}</p>
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {pick(lang, t.open)} <ArrowUpRight className="h-4 w-4" />
              </a>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
