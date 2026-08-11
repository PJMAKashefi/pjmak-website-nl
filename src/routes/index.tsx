import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Activity, Database, Brain } from "lucide-react";
import { Section } from "@/components/site/Section";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PJMAK — Project Control & Enterprise Data Integration" },
      {
        name: "description",
        content:
          "PJMAK unifies project, cost and document data into one on-premise executive command center for capital-intensive enterprises in the Netherlands.",
      },
      { property: "og:title", content: "PJMAK — Project Control & Enterprise Data Integration" },
      {
        property: "og:description",
        content:
          "One governed command center for your portfolio. On-premise, offline AI, zero public cloud routing.",
      },
    ],
  }),
  component: Home,
});

const icons = [Database, Activity, Brain, ShieldCheck];

function Home() {
  const { lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden command-bg">
        <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 md:pb-32 md:pt-28">
          <p className="eyebrow">{pick(lang, copy.hero.eyebrow)}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            {pick(lang, copy.hero.title)}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{pick(lang, copy.hero.lead)}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {pick(lang, copy.hero.ctaPrimary)} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/approach"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              {pick(lang, copy.hero.ctaSecondary)}
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
            {copy.hero.stats.map((s) => (
              <div key={s.value}>
                <dt className="font-display text-3xl font-semibold text-primary">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{pick(lang, s.label)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Thesis */}
      <Section
        eyebrow={pick(lang, copy.thesis.eyebrow)}
        title={pick(lang, copy.thesis.title)}
        lead={pick(lang, copy.thesis.body)}
      >
        <ol className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
          {copy.thesis.steps.map((s) => (
            <li key={s.n} className="bg-card p-6">
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{pick(lang, s.title)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pick(lang, s.body)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Problem */}
      <div className="border-y border-border bg-surface-deep">
        <Section eyebrow={pick(lang, copy.problem.eyebrow)} title={pick(lang, copy.problem.title)}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {copy.problem.items.map((item, i) => {
              const Icon = icons[i % icons.length]!;
              return (
                <div key={item.title.en} className="panel p-6">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{pick(lang, item.title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pick(lang, item.body)}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Layers preview */}
      <Section
        eyebrow={pick(lang, copy.layers.eyebrow)}
        title={pick(lang, copy.layers.title)}
        lead={pick(lang, copy.layers.lead)}
      >
        <div className="mt-12 space-y-px overflow-hidden border border-border bg-border">
          {copy.layers.items.map((l) => (
            <div key={l.n} className="grid gap-4 bg-card p-6 md:grid-cols-[140px_1fr_260px] md:items-baseline">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">{l.n}</span>
              <div>
                <h3 className="text-lg font-semibold">{pick(lang, l.title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pick(lang, l.body)}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{l.codes}</span>
            </div>
          ))}
        </div>
        <Link to="/platform" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {pick(lang, copy.nav.platform)} <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      {/* USPs */}
      <div className="border-y border-border bg-surface-deep">
        <Section eyebrow={pick(lang, copy.usp.eyebrow)} title={pick(lang, copy.usp.title)}>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {copy.usp.items.map((u) => (
              <div key={u.title.en} className="bg-card p-7">
                <h3 className="text-lg font-semibold">{pick(lang, u.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(lang, u.body)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <CtaBand />
    </>
  );
}

export function CtaBand() {
  const { lang } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="panel relative overflow-hidden p-10 md:p-14">
        <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">{pick(lang, copy.ctaBand.title)}</h2>
          <p className="mt-4 text-muted-foreground">{pick(lang, copy.ctaBand.body)}</p>
          <Link
            to="/demo"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {pick(lang, copy.ctaBand.cta)} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
