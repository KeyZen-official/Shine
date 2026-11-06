# Shine Consultant

Website for an overseas education, migration consultancy and training
organisation in Borivali West, Mumbai.

**One Next.js app. No database, no API service, no admin panel, no login.**

```
Shine/
  frontend/        The whole site
    content/       All site content, as JSON. Edit these files.
    app/           Routes, plus two form handlers under app/api
    components/    UI
    lib/           Content layer, SEO, formatting
    scripts/       Verification and asset build scripts
  brand-source/    Original logo and hero artwork, archived. Not served.
  docs/            Content runbook
```

JavaScript throughout — no TypeScript. Tailwind for all styling; the only
hand-written CSS is the design-token layer in `frontend/app/globals.css`.

## Running it

```bash
cd frontend
npm install
cp .env.example .env.local     # the defaults work for local development
npm run dev                    # http://localhost:3000
```

That is the whole setup. There is nothing to seed and nothing else to start.

## Why there is no backend

There was one: an Express service, MongoDB, and a 24-file admin panel —
about 11,700 lines between them. It was removed because the site has no
accounts, no payments and nothing for sale, so the only thing that genuinely
needed a server was handling the two forms. That is now two Next.js route
handlers, about 300 lines, and no database.

What went with it:

| Removed | Why |
|---|---|
| Express API + MongoDB | Nothing needed to be stored or queried at runtime |
| Admin panel + JWT auth + CSRF | They existed only to protect the admin panel. Removing it removed the largest attack surface on the site |
| Course directory and search | A `$facet` aggregation, a text index and denormalised parent mirrors, serving **zero** course records |
| University directory | Zero records |
| Testimonials | Zero records |

**The trade-off, stated plainly:** content is edited by changing a file in
`frontend/content/` and redeploying. There is no form for a non-technical
person to use. For visa guidance in particular that is a real operational
cost, and it is why every destination carries a `lastReviewed` field.

## Editing content

Everything a visitor reads is in `frontend/content/`:

| File | Holds |
|---|---|
| `destinations.json` | The ten destinations and their guides |
| `services.json` | The eleven services |
| `test-preparation.json` | IELTS, PTE, TOEFL, GRE, GMAT |
| `faqs.json` | Site-wide questions |
| `company.json` | Vision, mission, values, leadership, team |
| `contact.json` | Office address, phone numbers, email |
| `home.json` | Hero, introduction, process steps, closing call to action |
| `settings.json` | Social links, default search appearance |

Two rules are built into the content layer and worth knowing before you
edit:

1. **`"status": "draft"` makes a record invisible** — absent from listings,
   navigation and the sitemap. Nothing half-written reaches a visitor.
2. **An empty field omits its section, heading included.** A destination
   with no visa guidance renders a shorter page, not a page with an empty
   "Student visa guidance" heading.

### The destination guides are empty, deliberately

All ten destinations have a name, a slug, a region and a type. Every content
field — admission requirements, English requirements, visa guidance,
scholarships, part-time work — is `""`.

They were never filled in because they are facts about institutions and
immigration authorities, they differ per intake, and they change without
notice. A wrong English score or work-hour cap is something a student makes
an irreversible decision on. Fill them from the official sources and set
`lastReviewed` when you do; the visa and part-time work sections render that
date with an instruction to confirm with the authority.

## Forms

Two route handlers, both posting to the same origin:

| Route | Does |
|---|---|
| `POST /api/enquiries` | Validates, checks spam, emails the business |
| `POST /api/consultations` | The same, plus refuses a destination we do not publish |

**Nothing is stored.** A lead is validated and emailed. Removing the
database also removed the obligation to hold a stranger's name, email and
phone number indefinitely.

Three spam layers run in increasing cost order, and all three return the
same generic refusal so a bot learns nothing from which one caught it:

1. A honeypot field no human sees
2. A dwell-time floor — a form completed in under two seconds was not typed
3. Cloudflare Turnstile, verified server-side, when `TURNSTILE_SECRET_KEY`
   is set

Plus a per-address submission budget of five per ten minutes.

**Two limits worth knowing.** The budget lives in process memory, so it
resets on redeploy and is per-instance; Turnstile is the layer doing the
real work against automated abuse. And if the deployment does not set
`x-forwarded-for`, per-address limiting switches itself off and logs a
warning rather than bucketing every visitor under one key — a shared budget
would let five submissions lock the forms for everybody.

Email needs `SMTP_HOST` and `ADMIN_NOTIFICATION_EMAIL`. With neither set, a
submission still succeeds and the failure is logged, because a mail outage
must not show a visitor an error for a form they filled in correctly.

## Verifying it

```bash
npm run build && npm start     # one terminal
npm run check                  # another
```

| Command | Checks |
|---|---|
| `npm run check:terms` | 70 files, four content rules: no lending vocabulary, no placeholder text, no reference to the site this brief came from, brand spelled as two words |
| `npm run check:spacing` | Every spacing utility used in source actually compiles. The scale is *replaced*, so a half-step typo renders as nothing |
| `npm run check:pages` | 211 checks on rendered HTML: real content present, invented copy absent, withheld claims absent, removed routes 404, structured data, one `h1` per page |
| `npm run check:hero` | 23 checks on the home hero's layout and the padded image |
| `npm run check:site` | Every route, both form handlers, spam refusals, rate limiting — against a running server, no fixtures needed |

`npm run check` runs all five.

## Deploying

A single Next.js app. Vercel or Netlify will build it from the repository
with no configuration beyond environment variables.

Required in production:

```
NEXT_PUBLIC_SITE_URL=https://www.shineconsultant.co.in
SMTP_HOST=...
SMTP_USER=...
SMTP_PASSWORD=...
MAIL_FROM=Shine Consultant <no-reply@shineconsultant.co.in>
ADMIN_NOTIFICATION_EMAIL=enquiry@shineconsultant.co.in
TURNSTILE_SECRET_KEY=...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
```

Leave `NEXT_PUBLIC_CONTENT_PREVIEW` unset or `false` in production.

## Before launch

- [ ] **Fill in the destination guides.** Ten pages currently render a
      masthead and an enquiry form and nothing else.
- [ ] **Decide the finance-brokerage question.** Section E of the brief asked
      for guidance of a kind this site is built to refuse. It is not
      implemented: `/terms-and-conditions` states that we do not provide,
      arrange or broker financial services of any kind, and `check:terms`
      is a build gate that enforces it. Adding it means reversing a
      published legal statement — see `docs/content-runbook.md`, which has
      the detail without tripping the scan this README is subject to.
- [ ] **Supply real photography.** Destination and service pages fall back
      to generated brand panels. No stock photographs are used and none are
      invented.
- [ ] **Confirm the services list.** SOP, LOR, Forex, Travel and
      Accommodation guidance were in the brief but not in the company
      profile. The eleven in `services.json` come from the profile.
- [ ] **Confirm the mobile number is on WhatsApp**, then set
      `whatsappNumber` in `contact.json`. Until then the floating button
      does not render, which is better than one that goes nowhere.
- [ ] Have a lawyer review `/privacy-policy` and `/terms-and-conditions`.
      Both ship as drafts with a visible notice saying so.
- [ ] Set `TURNSTILE_SECRET_KEY` and real SMTP credentials.

## Three claims the client supplied that are not published

The company profile carried figures its own notes marked unverified. They
are recorded in `content/company.json` under `withheldClaims` so the
omission is visible and deliberate, and `check:pages` asserts none of them
appear:

| Claim | Why it is withheld |
|---|---|
| "95% visa success rate" | A quantified visa-outcome claim is the likeliest regulatory problem on a consultancy site, and the profile does not say over what period or sample |
| "thousands of students settled abroad" | Unverified, and unfalsifiable as written |
| WhatsApp availability | The profile lists a mobile but never says it is on WhatsApp |

Mrs. Bhadrika Mehta's 20+ years of experience **is** published, because the
profile states it about a named person.

## Nothing is sold through this website

No cart, no checkout, no payment integration, no price on anything.
`/terms-and-conditions` says so explicitly, and the content files have no
field that could hold a fee. Test preparation in particular cannot express a
price or a guaranteed score. Keep it that way unless someone deliberately
decides otherwise.

## Design system

All tokens live in `frontend/tailwind.config.js`. No component declares a
raw hex value, an off-scale spacing number or an ad-hoc transition duration.
The colour and spacing scales are **replaced** rather than extended, so
off-palette values cannot be reached through a Tailwind default.

| Token | Hex | Role |
| --- | --- | --- |
| `navy` | `#14243A` | Primary, headings, inverse surfaces |
| `ivory` | `#F8F7F2` | Page background |
| `white` | `#FFFFFF` | Cards and panels |
| `charcoal` | `#252D35` | Body text |
| `sage` | `#DCE9E4` | Secondary surface, section banding |
| `accent` | `#D00100` | Primary call to action |
| `accent.onNavy` | `#EE6070` | Mandatory red substitute on navy |

Red on navy measures 2.66:1 and fails WCAG for text, so red text and icons
are prohibited on navy surfaces — `accent.onNavy` (4.87:1) is used instead.
Red *buttons* on navy are fine because the measured pairing is white-on-red
(5.89:1).

**The accent is 6% darker than the logo's red.** The artwork's `#DD0100`
reaches only 4.12:1 on sage, and sage banding carries accent-coloured
eyebrows — so the artwork red fails as a text colour. `#D00100` clears
4.5:1 on ivory, white and sage while staying about ΔE 2.5 from the artwork.
`accent.artwork` records the exact artwork value.

### The things that catch people out

Tailwind defaults such as `text-sm`, `text-gray-600`, `text-red-500` and
`text-4xl` resolve to **nothing at all** here, and are dropped silently.
That is intentional — it is what stops an off-palette colour reaching
production — but it means a pasted component's classes have to be mapped
onto the project tokens. `check:spacing` exists because 29 spacing
utilities once compiled to nothing and rendered icons at the wrong size for
weeks.

`-webkit-backdrop-filter` is declared by hand in `globals.css` as
`.backdrop-blur-safe`. Autoprefixer does not add it for this build's
resolved targets, and Safari only dropped the prefix in version 18 — so
every translucent surface had no blur on iOS 15–17, visible only on
iPhones. `check:pages` asserts the prefix.

## The hero photograph, and why it is padded

The artwork is archived at `brand-source/hero-original.png` and never
served. `npm run build:hero` produces the `hero-photo-*` variants.

| | |
| --- | --- |
| Source | 2137 × 736 PNG, 1.85 MB |
| Served at 1920 | **105 KB** WebP |
| Served at 360 | 8.4 KB WebP |
| Saving | **94.4%** |

**The hero frame cuts a notch out of the top 13.85% of the image.** The
student in this photograph stands about 5% from the top, so a straight
drop-in removed her hair and part of her forehead. The fix uses the fact
that the notch *discards* that band rather than covering it: pad the canvas
by exactly the notch depth and the band falls on padding.

```
canvas height = 736 / (1 - 0.138535) = 854
2137 × 854 = 2.502 : 1
```

Which is the frame's own `lg:aspect-[5/2]` to within a rounding error. The
script asserts that relationship and refuses to run if a replacement image
breaks it, rather than quietly producing a crop that beheads somebody.

`lib/media.js` declares `height: 854` — the **padded** height. Below `lg`
the frame narrows and the image is cropped horizontally, so the focal point
is set to 35% rather than centre: a centred crop keeps the student but trims
the campus to a sliver, and the campus is half the point of the picture.

## What is not automated

Responsive behaviour is built to 360, 390, 430, 768, 1024, 1440 and 1920 —
single-column forms below 768, the horizontal process timeline only at 1280
and above, a hamburger below 1280, 44px minimum touch targets. Those
thresholds are implemented and visually checkable but not machine verified.
The same applies to screen-reader behaviour: the structural requirements are
built in and asserted where HTML can prove them, but a full
assistive-technology pass is a manual job.

Adding Playwright with `@axe-core/playwright` across those seven widths is
the natural next step if you want these enforced rather than reviewed.
#   S h i n e  
 