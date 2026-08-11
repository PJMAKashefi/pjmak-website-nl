import { Link } from "@tanstack/react-router";
import logo from "@/assets/pjmak-logo.jpg.asset.json";
import { useLang, pick } from "@/lib/i18n";
import { copy } from "@/content/copy";

export function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-border bg-surface-deep">
      <div className="h-0.5 w-full flag-rule opacity-60" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo.url} alt="PJMAK" className="h-9 w-auto rounded-sm bg-white p-1" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{pick(lang, copy.footer.tagline)}</p>
        </div>
        <div>
          <h3 className="eyebrow">{pick(lang, copy.footer.company)}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/approach" className="hover:text-foreground">{pick(lang, copy.nav.approach)}</Link></li>
            <li><Link to="/platform" className="hover:text-foreground">{pick(lang, copy.nav.platform)}</Link></li>
            <li><Link to="/tiers" className="hover:text-foreground">{pick(lang, copy.nav.tiers)}</Link></li>
            <li><Link to="/about" className="hover:text-foreground">{pick(lang, copy.nav.about)}</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">{pick(lang, copy.nav.demo)}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>PJMAK — KvK 91081289</li>
            <li>'s-Hertogenbosch, Netherlands</li>
            <li><a href="tel:+31610269554" className="hover:text-foreground">+31 (0)6 10269554</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PJMAK. {pick(lang, copy.footer.rights)}
      </div>
    </footer>
  );
}
