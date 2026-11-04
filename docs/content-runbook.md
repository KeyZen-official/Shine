# Content runbook

All site content lives in `frontend/content/` as JSON. Editing it is a file
change and a redeploy — there is no admin panel and no database.

| File | Holds |
| --- | --- |
| `destinations.json` | The ten destinations and their guides |
| `services.json` | The eleven services |
| `test-preparation.json` | IELTS, PTE, TOEFL, GRE, GMAT |
| `faqs.json` | Site-wide questions |
| `company.json` | Vision, mission, values, leadership, team |
| `contact.json` | Office address, phone numbers, email |
| `home.json` | Hero, introduction, process steps, closing call to action |
| `settings.json` | Social links, default search appearance |

## Two rules built into the content layer

**1. `"status": "draft"` makes a record invisible.** It is dropped from
listings, the navigation dropdowns and the sitemap. Nothing half-written
reaches a visitor, so there is no need to keep an unfinished guide in a
branch.

**2. An empty field omits its section, heading included.** A destination
with no visa guidance renders a shorter page — not a page with an empty
"Student visa guidance" heading. This is what lets you fill a guide in over
several sittings without it ever looking broken.

Both are enforced in `frontend/lib/content.js`, and `npm run check:pages`
asserts them against the rendered HTML.

## After editing

```bash
cd frontend
npm run build && npm start
npm run check
```

There is nothing to seed and no cache to clear. Content is imported at build
time, so a rebuild is the only step.

## The destination guides are empty

All ten destinations have a name, slug, region and type. Every content field
is `""`.

That is deliberate, and it is the main outstanding task. These are facts
about institutions and immigration authorities: they differ per intake, they
change without notice, and a wrong English score or work-hour cap is
something a student makes an irreversible decision on.

Fill each one from the official source, then set `lastReviewed` to the date
you checked it. The visa guidance and part-time work sections render that
date beside the text with an instruction to confirm with the immigration
authority, so an undated guide says so rather than implying currency.

| Field | Notes |
| --- | --- |
| `shortIntroduction` | Up to ~300 characters. Used on cards and as the meta description fallback. |
| `content.countryIntroduction` | Separate paragraphs with a blank line. |
| `content.whyStudyThere` | |
| `content.educationSystem` | |
| `content.popularCoursesNote` | Prose about the programmes and institutions there. There is no course catalogue, so this is where that belongs. |
| `content.admissionRequirements` | |
| `content.englishRequirements` | Per institution and per course. Say so rather than publishing one threshold. |
| `content.applicationProcess` | |
| `content.visaGuidance` | **Renders with `lastReviewed` and a confirm-with-the-authority note.** Keep current or leave empty. |
| `content.scholarships` | Do not name an award or amount unless checked against the awarding body this cycle. |
| `content.accommodation` | |
| `content.partTimeWork` | **Same provenance treatment as visa guidance.** Work entitlement is a visa condition. Leave empty rather than approximate the hour cap. |
| `content.costOfLiving` | A list of `{ label, value, note }`. |
| `faqs` | Destination-specific questions. |

## Three things never to do

1. **Do not add lending, loan or finance-brokerage content.** Shine
   Consultant provides education and admissions guidance only.
   `npm run check:terms` fails the build on that vocabulary outside the one
   allow-listed disclaimer sentence. Section E of the original brief asked
   for guidance of that kind; it is not implemented, because
   `/terms-and-conditions` publicly states the company does not provide,
   arrange or broker such services. Changing that is a decision for the
   client and a lawyer, not a content edit.
2. **Do not invent a statistic, ranking, partnership or review.** If it is
   not verified, leave the field empty — every page is built to cope.
3. **Do not invent anything about Shine Consultant either.** The office
   address, services, vision, mission, founder and team all come from the
   company profile. Change one because the company changed, not to fill a
   gap.

## Three claims withheld on purpose

The company profile carried figures its own notes marked unverified. They
are recorded in `company.json` under `withheldClaims` so the omission is
visible rather than looking like something lost in migration, and
`check:pages` asserts none of them appear.

| Claim | Why |
| --- | --- |
| "95% visa success rate" | A quantified visa-outcome claim is the likeliest regulatory problem on a consultancy site, and the profile gives no period or sample. |
| "thousands of students settled abroad" | Unverified, and unfalsifiable as written. |
| WhatsApp availability | The profile lists a mobile but never says it is on WhatsApp. Until confirmed, `whatsappNumber` stays empty and the floating button hides itself. |

Mrs. Bhadika Mehta's 20+ years of experience **is** published, because the
profile states it about a named person.

## Nothing is sold through this website

No cart, no checkout, no payment integration, no price on anything. The
content files have no field that could hold a fee, and the test-preparation
records cannot express a price or a guaranteed score.
`/terms-and-conditions` says so explicitly.

Keep it that way unless someone deliberately decides otherwise — adding a
price to a service page changes what this site is.

## Where the forms go

`POST /api/enquiries` and `POST /api/consultations` validate the submission,
check it for spam, and email it to `ADMIN_NOTIFICATION_EMAIL`. **Nothing is
stored.** There is no database, which also means no obligation to hold a
stranger's name, email and phone number indefinitely.

The consultation handler refuses a destination that is not published, so a
visitor cannot book against a country the site says nothing about. That
check reads the same `destinations.json` the form's select was built from.
