import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/routes/index";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Strategy & Projects — PJMAK" },
      {
        name: "description",
        content:
          "Why efficient project execution is not enough: projects are the pieces that assemble an enterprise strategy, and they need one governed data frame.",
      },
      { property: "og:title", content: "Strategy & Projects — PJMAK" },
      {
        property: "og:description",
        content: "Projects are the implementation instrument of enterprise strategy. Here is how PJMAK closes the loop.",
      },
    ],
  }),
  component: Approach,
});

function Approach() {
  const { lang } = useLang();

  return (
    <>
      <div className="border-b border-border command-bg">
        <Section eyebrow={pick(lang, copy.thesis.eyebrow)} title={pick(lang, copy.thesis.title)} lead={pick(lang, copy.thesis.body)} />
      </div>

      <Section>
        <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {copy.thesis.steps.map((s) => (
            <li key={s.n} className="bg-card p-8">
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold">{pick(lang, s.title)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pick(lang, s.body)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="border-y border-border bg-surface-deep">
        <Section eyebrow={pick(lang, copy.problem.eyebrow)} title={pick(lang, copy.problem.title)}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {copy.problem.items.map((item) => (
              <div key={item.title.en} className="panel p-6">
                <h3 className="text-lg font-semibold">{pick(lang, item.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(lang, item.body)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

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

      <CtaBand />
    </>
  );
}
