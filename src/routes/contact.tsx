import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLang, pick } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PJMAK — Project Control & Data Integration" },
      {
        name: "description",
        content:
          "Talk to PJMAK about unifying your project, cost and document data into one on-premise command center. Based in 's-Hertogenbosch, Netherlands.",
      },
      { property: "og:title", content: "Contact PJMAK" },
      { property: "og:description", content: "Start with a structural data audit of your project landscape." },
    ],
  }),
  component: Contact,
});

const t = {
  eyebrow: { en: "Contact", nl: "Contact" },
  title: { en: "Start with a structural data audit.", nl: "Begin met een structurele data-audit." },
  lead: {
    en: "Tell us which systems hold your project truth today. We will map them and show what a unified command center would look like for your portfolio.",
    nl: "Vertel ons welke systemen vandaag uw projectwaarheid bevatten. Wij brengen ze in kaart en tonen hoe een uniform commandocentrum eruitziet voor uw portfolio.",
  },
  name: { en: "Full name", nl: "Volledige naam" },
  company: { en: "Organisation", nl: "Organisatie" },
  email: { en: "Work email", nl: "Zakelijk e-mailadres" },
  message: { en: "What are you trying to get visibility on?", nl: "Waar wilt u zicht op krijgen?" },
  send: { en: "Send message", nl: "Bericht versturen" },
  thanks: {
    en: "Thank you — your message is noted. We reply within two working days.",
    nl: "Dank u — uw bericht is genoteerd. Wij reageren binnen twee werkdagen.",
  },
};

function Contact() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="command-bg">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow">{pick(lang, t.eyebrow)}</p>
          <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{pick(lang, t.title)}</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">{pick(lang, t.lead)}</p>

          <ul className="mt-10 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+31610269554" className="hover:text-foreground">+31 (0)6 10269554</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@pjmak.nl" className="hover:text-foreground">info@pjmak.nl</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              's-Hertogenbosch, Netherlands · KvK 91081289
            </li>
          </ul>
        </div>

        <div className="panel p-7">
          {sent ? (
            <p className="text-sm text-primary">{pick(lang, t.thanks)}</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {(["name", "company", "email"] as const).map((f) => (
                <label key={f} className="block">
                  <span className="text-xs text-muted-foreground">{pick(lang, t[f])}</span>
                  <input
                    required
                    name={f}
                    type={f === "email" ? "email" : "text"}
                    className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
              <label className="block">
                <span className="text-xs text-muted-foreground">{pick(lang, t.message)}</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {pick(lang, t.send)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
