# Remove the architecture layers + make the site content editable

Two changes: strip the internal architecture story out of the public site, and put all page content in a database with a private admin screen where you can edit it.

## 1. Delete the layers

Everything describing "four layers", "Layer 1-4", "four data zones" and the internal PMIS architecture comes off the public site.

- Home page: remove the layers preview section, and drop the "4 — Architecture layers" hero statistic.
- Platform page: remove the layer list and the data-zone diagram entirely. The page is rebuilt as **Services & capabilities** — what PJMAK actually does for a client, in the language of project and programme management (project controls, planning & scheduling, cost and risk control, PMO set-up and governance, portfolio and change management, data & reporting). This is the content style of the reference site you gave, adapted to PJMAK; the business plan stays internal and is only used to keep claims accurate.
- Sector pages, service tiers, approach, about and contact keep working; any stray "layer" wording in them is rewritten in outcome terms (what the client gets), not architecture terms.
- The result: the site talks about strategy, projects and results — never about how the system is built inside.

## 2. Editable content database

Turn on Lovable Cloud (the built-in database and login) and move the site text out of code into content records.

**How it will work for you**

- A private `/admin` page, reachable only after you sign in with your own email and password. It is not linked from the public menu.
- The admin page lists every editable block of the site, grouped by page (Home, Approach, Services, Tiers, About, Contact, plus each sector).
- Each block shows its English and Dutch text side by side. You edit, press Save, and the public site shows the new text immediately.
- Sectors are editable as records too: name, description, pain points, what the environment shows, KPI figures, suggested tier, and the demo link. You can also add a new sector or hide one — the demo qualifier picks these up automatically.
- Demo requests and contact messages are stored in the database and listed in the admin area, so you stop losing leads to the browser-only storage used today.

**Fallback safety:** the current text stays in the code as the default. If a block has not been edited yet, the site shows the built-in text, so nothing can ever render empty.

## Technical notes

- Lovable Cloud (Postgres + auth) is enabled for this project.
- Tables: `content_blocks` (key, page, label, `value_en`, `value_nl`, list items as JSON), `sectors` (slug, ordered fields, active flag), `leads` (name, organisation, email, sector, role, scale, type, created_at). Row-level security: public read on `content_blocks` and active `sectors`; insert-only on `leads` for visitors; full read/write restricted to an `admin` role held in a separate `user_roles` table.
- Public pages read content through a server function using the publishable key, so the text is server-rendered and stays SEO-indexable.
- `src/content/copy.ts` and `src/content/sectors.ts` become the seed and fallback source; a migration seeds the tables with today's text so the site looks identical the moment the database goes live.
- Admin routes live under the authenticated layout; writes go through authenticated server functions with an admin role check.
