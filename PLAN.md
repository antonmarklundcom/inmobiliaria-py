# inmobiliaria.com.py — Build Plan (v1, 2026-07-12)

Custom Next.js real estate platform + cinematic scroll-world hero. Plan only — no code yet.

---

## 1. Decisions locked (interview 2026-07-12)

| Decision | Choice |
|---|---|
| Hero budget | **Standard — 5 scenes, architecture A** (continuous forward take, no connectors). ≈10 gens + re-roll buffer ≈ 13 total |
| Mobile tier | **Mobile encodes** (720p `-m.mp4` siblings, no extra credits) |
| Operations | **Venta + Alquiler** |
| Inventory segments | 1) Premium high-rise Asunción (departamentos, incl. en pozo) · 2) Exclusive villas + vast land (casas/terrenos) · 3) New house projects in nature (proyectos / barrios cerrados) |
| Brand name | **Inmobiliaria.com.py** (domain-as-brand) |
| Brand palette | Pending — 3 Claude Design comps first (prompts in §5) |
| Hosting | **Hostinger LATAM account**, Node.js slot; domain already registered |
| Listing extras | Amenities checklist, video/YouTube tour, map pin (lat/lng), project extras — plus my recommended additions (§7) |

## 2. Skill invocation map (order matters)

| Phase | Skill | What it supplies |
|---|---|---|
| Planning (done) | `nextjs-national-lead-gen` | Archetype A (lead-gen/product), page architecture rules, design-pattern menu, anti-fabrication rules |
| Planning (done) | `paraguay-local-seo` | Voseo CTA rules, WhatsApp-first conversion, `[servicio]+[ciudad]` keyword pattern, JSON-LD, es-PY technical SEO |
| Phase 1 (brand) | Claude Design (external) | 3 color-scheme comps → you pick → I extract tokens |
| Phase 3–4 (platform + SEO) | `paraguay-local-seo` references | `keywords-paraguay.md` for keyword lists; JSON-LD patterns adapted to RealEstateAgent |
| Phase 4 (admin dashboard) | `dataviz` (optional) | Only if we add stat tiles/charts to the admin (listings per segment, WhatsApp clicks). Read BEFORE writing any chart code |
| Phase 5 (hero) | `scroll-world` | Full Higgsfield pipeline: anchor-gated stills → sequential legs → encode → SSIM gate → scrub engine |
| Phase 6 (deploy) | `nextjs-deploy-hostinger` | GitHub→Hostinger flow, MySQL+Drizzle §6a procedure, env vars, PowerShell pitfalls |

## 3. Tech stack

- **Next.js 16.2.10** (scaffolded via `create-next-app@latest` 2026-07-12 — newer than the 15.x assumed when this plan was drafted; using it since it's current stable), **App Router, TypeScript, Tailwind CSS v4.** Server components for all SEO surfaces; server actions for admin CRUD.
- **Database: Hostinger MySQL + Drizzle ORM** (recommended over Neon/Prisma).
  - Live app connects via `localhost` on the same infra — no cross-network dependency, no Neon-IPv6-on-Hostinger failure mode.
  - Deploy skill §6a has the verified playbook (Remote MySQL whitelisting, `$env:DATABASE_URL` + `npx tsx` for seeds, password-change gotcha).
  - Trade-off accepted: local dev needs your IP whitelisted in hPanel Remote MySQL (re-add after router restarts).
- **Images: Cloudinary free tier** for listing photos.
  - Admin uploads must survive redeploys — Hostinger rebuilds from git, so runtime-uploaded files are not durable. Cloudinary gives durable storage + automatic WebP/AVIF + on-the-fly resizing via a `next/image` custom loader.
  - Free tier (~25k transformations / 25 GB bandwidth-equivalent monthly credits) is ample at launch.
  - Scroll-world clips are build-time static assets in `public/` (~10 clips ≈ 60–80 MB incl. mobile encodes — fine for git).
- **Auth (admin only): NextAuth v5, credentials provider**, single admin user, middleware-protected `/admin`.
- **Maps:** Google Maps embed (lazy iframe) on detail pages; admin stores lat/lng.
- **Currency:** listings store `price_amount + price_currency (GS|USD)`; an admin-set reference exchange rate produces a normalized USD value for cross-currency filtering/sorting. UI shows original currency, toggle shows conversion "aprox."

## 4. Sitemap & SEO architecture (es-PY, voseo)

```
/                                    → scroll-world hero + destacadas + segmentos + SEO copy block
/propiedades                         → full index + filters (query params; canonical → itself, filtered states noindex-follow via canonical to base)
/propiedades/[slug]                  → listing detail (gallery, amenities, map, WhatsApp CTA)
/venta/departamentos/asuncion        → curated indexable landing (money keyword)
/alquiler/departamentos/asuncion     → idem
/venta/casas/asuncion                → villas segment
/venta/terrenos                      → land segment
/proyectos                           → new developments hub ("barrios cerrados", "en pozo")
/proyectos/[slug]                    → project detail (masterplan, unit table, financing, delivery)
/vender                              → "Vendé tu propiedad" (seller lead form + WhatsApp)
/nosotros                            → trust page
/contacto                            → NAP + map + WhatsApp + 3-field form
robots.txt · sitemap.xml (dynamic from DB) · OG images per listing
```

- Landing pages are **static routes with real copy (400–800 words)** + a pre-filtered listing grid — one primary intent each, no cannibalization with the filter index. Add more (`/venta/casas/san-bernardino`, …) only as inventory justifies — no doorway pages.
- **Keyword tree:** "departamentos en venta asunción", "departamentos en pozo asunción" (pre-construction — high intent, underserved), "departamentos en alquiler asunción", "casas en venta asunción", "terrenos en venta paraguay", "barrios cerrados paraguay", "casas en barrio cerrado". Barrio modifiers (Villa Morra, Recoleta, Carmelitas) woven into copy, not separate pages at launch.
- **Titles:** `{Tipo} en {Operación} en {Zona} | Inmobiliaria.com.py` (≤60 chars). Metas ≤155 chars with voseo CTA ("Escribinos por WhatsApp").
- **JSON-LD:** `RealEstateAgent` site-wide (PY address, `areaServed`, WhatsApp tel, sameAs); `RealEstateListing` + `Offer` per listing; `BreadcrumbList` everywhere; `FAQPage` on hubs and /vender; `WebSite` + `SearchAction` on home.
- **Hero SEO:** the scroll-world engine renders copy client-side → the `data-sw-seo` server-rendered block is mandatory (h1 = "Propiedades premium en venta y alquiler en Asunción", one h2+p per scene, real links). Never skip.
- Voseo everywhere: "Escribinos", "Agendá una visita", "Consultá", "Vendé tu propiedad", "Encontrá tu próxima propiedad".
- WhatsApp: floating button all pages, `wa.me/595…?text=` prefilled per listing ("Hola, vi [REF-código] en inmobiliaria.com.py…") so you know which listing converted.

## 5. Brand & design direction — LOCKED 2026-07-12

**Winner: B — Petrol + gold.** Tokens implemented in `app/globals.css` / Tailwind theme:

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#14303B` | Dark petrol base — hero bg, header text |
| `--color-ink-deep` | `#0C1F26` | Darkest shade — button text on gold |
| `--color-surface` | `#F4F1EA` | Off-white — light section backgrounds |
| `--color-surface-alt` | `#ECE6D8` | Slightly deeper cream — card backgrounds |
| `--color-gold` | `#B99457` | Accent — CTAs, links, highlights |
| `--color-gold-deep` | `#9C7C42` | Gold hover state |
| `--color-text-on-dark` | `#F4F1EA` | Text on ink backgrounds |
| `--color-text-on-light` | `#14303B` | Text on surface backgrounds |
| `--color-text-muted` | `#5A6F76` | Secondary text |

Typography: **Fraunces** (display serif, headlines) + **Inter** (UI/body), both via `next/font/google`. Verified rendering in dev preview 2026-07-12.

**Style preamble for scroll-world (Phase 5), updated with this palette:**
> Photorealistic cinematic aerial/steadicam footage, golden-hour light, anamorphic feel, gentle atmospheric haze, rich foliage, no people, no text, no logos. Color grading: dark petrol blue undertones in shadow, warm off-white/cream highlights, muted gold accents in the light — classic luxury-realty grading.

<details><summary>Original 3-way comparison prompts (for reference)</summary>

**Step 1 (you):** run these three prompts in Claude Design, pick a winner (or a blend). Short, color-focused, as requested:

**A — Deep green + sand**
> Landing page hero and property-card grid for "Inmobiliaria.com.py", premium real estate in Asunción, Paraguay. Color scheme: deep forest green #1E3A2B base, warm sand #E9DFCC surfaces, gold accent #C9A45C, off-white text. Elegant serif headlines, clean sans body. Spanish copy: hero "Encontrá tu próxima propiedad en Asunción", green WhatsApp CTA button "Escribinos".

**B — Petrol + gold**
> Landing page hero and property-card grid for "Inmobiliaria.com.py", premium real estate in Asunción, Paraguay. Color scheme: dark petrol blue #14303B base, off-white #F4F1EA surfaces, muted gold accent #B99457. Classic luxury-realty feel, serif headlines. Spanish copy: hero "Encontrá tu próxima propiedad en Asunción", WhatsApp CTA "Escribinos".

**C — Charcoal + terracotta**
> Landing page hero and property-card grid for "Inmobiliaria.com.py", premium real estate in Asunción, Paraguay. Color scheme: near-black charcoal #1C1B19 base, warm gray #E7E2DA surfaces, terracotta accent #C6683F. Modern architectural minimalism, large display type. Spanish copy: hero "Encontrá tu próxima propiedad en Asunción", WhatsApp CTA "Escribinos".

**Step 2 (me):** extract the winning kit → 4–6 named hex tokens + typography (proposal: Fraunces or Playfair Display for display serif, Inter for UI/body) → becomes the scroll-world style preamble palette AND the Tailwind theme.

</details>

**Design patterns** (from the lead-gen menu, deliberately limited): split-screen listing cards, big-type editorial headings on hubs, scroll-triggered reveals below the hero. No bento, no glassmorphism — premium restraint.

**Hero → platform visual hand-off:** the final scene (terrace at sunset) settles with the CTA pinned; page background under the scroll-world container matches the sunset's warm dark tones, so scrolling out of the hero lands on a matching dark "Propiedades destacadas" band, which then transitions to the light surface color for the rest of the site. Sticky nav (logo + WhatsApp) fades in only after the hero completes. Reduced-motion/data-saver users get the stills-crossfade fallback automatically.

## 6. Scroll-world hero spec

- **Architecture A** (continuous forward take — mandatory for realistic walkthrough; B's pull-outs read as rewind stutter). Model: `seedance_2_0`, legs sequential, each leg's start-image = previous leg's actual last frame. No connectors.
- **Style preamble (draft, locked after anchor approval):** "Photorealistic cinematic aerial/steadicam footage, golden-hour light, anamorphic feel, gentle atmospheric haze, rich foliage, no people, no text, no logos" + winning palette grading.
- **5 scenes / story beats:**

| # | Scene | Camera (grammar: real estate = steadicam glides, crane-ups, rise-and-reveal) | Copy beat (voseo) |
|---|---|---|---|
| 1 | Aerial over Asunción at golden hour — river, Costanera, tower skyline | Drone rise-and-reveal, then forward drift descending toward the premium corridor. Higher `scroll` + `linger` | "Asunción desde arriba" / "Tu próxima propiedad te está esperando" |
| 2 | Tree-lined premium barrio street, lapachos in bloom | Descending swoop settling into a low forward glide toward a villa gate | "Los mejores barrios" / segment: departamentos premium |
| 3 | Through the villa gate — garden path, facade, door opening | Steadicam glide through the gate and entrance | "Villas exclusivas y tierras amplias" |
| 4 | Interior living room — bright, modern, double-height | Glide through the living space, gentle crane-up, toward open terrace doors. **NSFW re-roll risk: prompt "empty, unoccupied, architectural", budget 2–3 attempts** | "Proyectos nuevos en la naturaleza" |
| 5 | Terrace at sunset — pool edge, city glowing below | Ease onto the terrace, settle into slow drift into the sunset. Highest `scroll` + `linger`; CTA pinned | "Encontrá tu propiedad" + WhatsApp CTA + "Ver propiedades" |

- **Anchor gate:** scene 3 (gate/garden/facade — best style definer) generated first, you approve before the other 4 stills batch. Hard gate.
- **Budget:** 5 stills (`gpt_image_2`) + 5 legs (`seedance_2_0`) = 10 gens + ~3 re-rolls ≈ **13 generations**; legs are sequential (3–8 min each) → ~1.5–3 h wall time. Mobile encodes cost only ffmpeg time. Spend approved at Standard tier.
- **Pipeline:** encode 1080p `crf 20 -g 8` + 720p `-g 4` mobile siblings → posters extracted from encoded clips → SSIM seam gate ≥0.90 → wire `scrub-engine.js` into a Next.js client component with `data-sw-seo` server-rendered → Step-8 browser QA (incl. phone CPU-throttled scrub, iOS priming, data-saver stills fallback).

## 7. Data model (listings)

Core: `id, slug, ref_code (INM-0001), title, description, operation (venta|alquiler), type (departamento|casa|terreno|oficina|local), segment (premium_highrise|villa_land|nature_project), city, barrio, price_amount, price_currency (GS|USD), price_on_request (bool), bedrooms, bathrooms, area_total_m2, area_built_m2, parking, photos[] (Cloudinary IDs, ordered), featured, status, published, created_at, updated_at`.

Chosen extras: `amenities[]` (piscina, quincho, seguridad 24hs, gym, ascensor, generador, …— filterable chips), `video_url` (YouTube), `lat/lng`, project extras (`masterplan_assets[], unit_types (JSON table), delivery_date, financing_text`).

My recommended additions (approved "any other you recommend"):
- `status` enum: disponible | reservado | vendido | alquilado (sold listings stay live with a badge — SEO asset + social proof)
- `expensas_gs` (monthly, for high-rise), `year_built`, `floor` + `total_floors`, `balcony_m2`, `orientation`
- `is_en_pozo` + `delivery_date` (pre-construction — its own keyword tree)
- `seo_title` / `seo_description` overrides, `whatsapp_message` override per listing
- `display_order` weight for the destacadas band

Second table: `leads` (seller leads from /vender + contact form: nombre, teléfono, mensaje, listing_ref, source page). Third: `settings` (exchange rate, WhatsApp number, agency NAP).

## 8. Build phases

| Phase | Delivers | Who |
|---|---|---|
| **0. Scaffold** | git init, Next.js 15 + TS + Tailwind, repo `antonmarklundcom/inmobiliaria-py` (private), folder structure, CI-less simple setup | Autonomous (cheap model OK) |
| **1. Brand kit** | You run the 3 Claude Design prompts → pick → I lock tokens + typography + style preamble | **YOU** (pick), then autonomous |
| **2. Data layer** | hPanel MySQL DB created, Remote MySQL whitelist, Drizzle schema + migrations + seed (6–10 placeholder listings, clearly marked) | **YOU** (hPanel clicks + IP), rest autonomous |
| **3. Listing platform** | /propiedades + filters, detail pages w/ gallery + map + WhatsApp, curated SEO landings, /proyectos, /vender, /nosotros, /contacto | Autonomous grunt (cheap model executes against this spec) |
| **4. Admin** | /admin auth, listing CRUD w/ Cloudinary upload + drag-order photos, leads inbox, settings (FX rate). Optional dataviz stat tiles | Autonomous; **YOU** create Cloudinary account (free) |
| **5. Scroll-world hero** | Anchor still → **YOU approve** → batch stills → sequential legs → encode + mobile encodes → SSIM gate → engine wired → **YOU review draft page** | Mixed: approvals YOU, pipeline autonomous (long-running, background) |
| **6. SEO layer** | Metadata, JSON-LD, dynamic sitemap.xml, robots, OG images, data-sw-seo block | Autonomous |
| **7. Deploy** | See §9 | **YOU** (hPanel), guided |
| **8. QA + launch** | scroll-world Step-8 QA, Lighthouse mobile ≥90 on listing pages, real-listing data entry, GBP checklist handoff | Mixed; listing data **YOU** |

Real listing data, photos, agency NAP (phone +595 9XX XXX XXX, address, hours, socials) are yours to supply — placeholders like `[TELÉFONO]` until then, never invented.

## 9. Deployment (per nextjs-deploy-hostinger)

1. Code on `main` of private repo `antonmarklundcom/inmobiliaria-py`.
2. hPanel (LATAM) → Websites → Add Website → **Node.js Apps** → Import Git Repository → select repo/`main`. Verify: Next.js, `npm run build`, `npm start`. Record slot count remaining.
3. Create MySQL DB in hPanel first; note the **live** `DATABASE_URL` uses `localhost`; local dev uses `srv####.hstgr.io` (or raw IP if ECONNREFUSED) with your IP whitelisted in Remote MySQL.
4. Env vars in hPanel (value field gets ONLY the raw value — never `KEY=value`):
   `DATABASE_URL` (mysql://…@localhost:3306/…), `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (temp hostingersite.com URL first), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.
5. DB init **from local machine** (never Hostinger SSH): `npx drizzle-kit migrate`, then `$env:DATABASE_URL = "mysql://…"` + `npx tsx scripts/seed.ts` (plain tsx doesn't auto-load .env). `.env` files written with `Set-Content -Encoding utf8`, never `>`.
6. Deploy → verify on temp URL → map **inmobiliaria.com.py** (DNS per NIC.py registration: A record to Hostinger target) → SSL → update `NEXTAUTH_URL` + `NEXT_PUBLIC_SITE_URL` → **redeploy** (env changes need redeploy, restart isn't enough).
7. Post-deploy checklist: login with rotated real admin creds, one test listing write from live admin, robots/sitemap reachable, WhatsApp links fire with prefill, slot recorded.
8. If DB password ever changes: update hPanel `DATABASE_URL` too, then redeploy — the live app crashes silently otherwise ("Application error"/Digest page).

## 10. Sister site: realestateinparaguay.com (added 2026-07-12)

This DB is the **source of truth** for an English international storefront (plan: `C:\Claude 1\realestateinparaguay-com\PLAN.md`, §5a lists the exact spec). Work that lands in THIS repo, scheduled on top of Phase 4:

1. `listing_translations` table (`listing_id, locale, title, description, seo_*, slug, whatsapp_message, translation_status, source_hash, translated_at`).
2. Translation server action on publish/update (Claude API drafts EN; admin reviews).
3. Token-protected `GET /api/export/listings?locale=en` (listings + translations + Cloudinary IDs + FX/settings).
4. `POST /api/leads` accepting external `source: 'reip'`; leads inbox gains a source column.
5. Fire-and-forget revalidate ping to the EN site after listing/translation writes.

The scroll-world hero clips are shared: whichever site generates them first, the other copies `public/scroll-world/` wholesale (clips contain no text/people/logos).

## 11. Open items needing you

1. Run the 3 Claude Design prompts (§5) and pick a direction.
2. Agency facts: WhatsApp number (+595…), address/NAP, socials, Google Business Profile status.
3. Higgsfield: confirm `higgsfield auth login` works + credits cover ~13 gens.
4. Cloudinary free account (2 min signup) when Phase 4 starts.
5. Real listings (photos + data) whenever ready — platform launches with marked placeholders.
