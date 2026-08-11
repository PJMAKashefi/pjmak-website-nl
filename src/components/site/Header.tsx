import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/pjmak-logo.jpg.asset.json";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

const links = [
  { to: "/approach", key: "approach" },
  { to: "/platform", key: "platform" },
  { to: "/tiers", key: "tiers" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const;

export function Header() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface-deep/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="PJMAK" className="h-8 w-auto rounded-sm bg-white p-0.5" />
          <span className="sr-only">PJMAK</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {pick(lang, copy.nav[l.key])}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-sm border border-border text-[11px] font-medium">
            {(["en", "nl"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 uppercase transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/demo"
            className="hidden rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {pick(lang, copy.nav.demo)}
          </Link>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface-deep px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
            >
              {pick(lang, copy.nav[l.key])}
            </Link>
          ))}
          <Link to="/demo" onClick={() => setOpen(false)} className="mt-2 block py-2 text-sm font-semibold text-primary">
            {pick(lang, copy.nav.demo)}
          </Link>
        </nav>
      )}
    </header>
  );
}
