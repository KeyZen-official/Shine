import Link from 'next/link';
import { ArrowRight, GraduationCap, Languages, Target } from 'lucide-react';
import { getTestPreparation } from '../../../lib/content';
import { buildMetadata } from '../../../lib/seo';
import { SectionShell } from '../../../components/ui/SectionShell';
import { EmptyState } from '../../../components/ui/States';
import { CtaStrip } from '../../../components/sections/FinalCta';
import { TEST_PREPARATION_FAMILIES } from '../../../shared/constants';

export const metadata = buildMetadata({
  title: 'Test Preparation',
  description:
    'Coaching for IELTS, PTE, TOEFL, GRE and GMAT — taught by qualified teachers, with mock tests, practice sessions and a study plan built around your current level.',
  path: '/test-preparation',
});

const FAMILY_ICON = {
  english: Languages,
  entrance: Target,
};

/**
 * Composition: a type-led hero, then one band per test family so the five
 * programmes read as two coherent groups rather than an undifferentiated
 * row of five.
 *
 * A family with nothing published omits itself along with its heading, so
 * publishing only the English tests gives a complete page rather than a
 * page with an empty half.
 *
 * No score, pass rate or fee appears anywhere, and the content files hold
 * no field that could carry one.
 */
export default function TestPreparationPage() {
  const tests = getTestPreparation();

  const groups = TEST_PREPARATION_FAMILIES.map((family) => ({
    ...family,
    tests: tests.filter((test) => test.family === family.value),
  })).filter((group) => group.tests.length > 0);

  return (
    <>
      <section className="bg-ivory">
        <div className="shell py-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="eyebrow">Training</p>
            <h1 className="mt-5 text-display font-extrabold">
              Coaching for the tests your application depends on.
            </h1>
            <p className="mt-8 max-w-prose text-lead text-charcoal-70">
              We teach the English language tests and the graduate entrance tests, in person, with
              qualified teachers. Every programme starts with a diagnostic test, because teaching
              you what you already know is a waste of your time.
            </p>
            <span className="rule-accent mt-10" aria-hidden="true" />
          </div>
        </div>
      </section>

      {tests.length === 0 ? (
        <section className="section-y bg-sage">
          <div className="shell">
            <EmptyState
              icon={GraduationCap}
              title="Test preparation details are being prepared"
              description="Our coaching pages are being written. In the meantime, tell us which test you are sitting and we will explain how we prepare candidates for it."
              actionLabel="Send an enquiry"
              actionHref="/contact"
            />
          </div>
        </section>
      ) : (
        groups.map((group, index) => {
          const FamilyIcon = FAMILY_ICON[group.value] ?? GraduationCap;

          return (
            <SectionShell
              key={group.value}
              id={`tests-${group.value}`}
              eyebrow={index === 0 ? 'What we teach' : 'Also taught'}
              title={group.label}
              surface={index % 2 === 0 ? 'sage' : 'white'}
            >
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.tests.map((test) => (
                  <li key={test.slug} className="group">
                    <Link
                      href={`/test-preparation/${test.slug}`}
                      className="flex h-full flex-col rounded-xl border border-navy/10 bg-white p-6 transition-colors duration-base ease-standard hover:border-navy/25 hover:bg-ivory lg:p-8"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage text-navy transition-colors duration-base ease-standard group-hover:bg-navy group-hover:text-white">
                        <FamilyIcon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <h3 className="mt-6 font-heading text-h3 font-bold leading-snug text-navy">
                        {test.name}
                      </h3>

                      {test.fullName ? (
                        <p className="mt-1.5 text-micro uppercase tracking-[0.08em] text-charcoal-50">
                          {test.fullName}
                        </p>
                      ) : null}

                      {test.summary ? (
                        <p className="mt-4 flex-1 text-caption leading-relaxed text-charcoal-70">
                          {test.summary}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}

                      <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-accent">
                        How we prepare you
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-base ease-standard group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SectionShell>
          );
        })
      )}

      <SectionShell
        id="how-we-teach"
        eyebrow="How we teach"
        title="Diagnose first, then teach to the gap"
        surface="ivory"
        containerClassName="max-w-4xl"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: 'A diagnostic test first',
              body: 'We find where you are actually losing marks before we plan a single session.',
            },
            {
              title: 'Mock tests under real conditions',
              body: 'Timed, complete and reviewed afterwards, because pacing is half the problem.',
            },
            {
              title: 'No score promises',
              body: 'We will tell you what your current level supports. Anyone guaranteeing a band is selling you something.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg bg-sage p-6">
              <h3 className="font-heading text-body font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-caption text-charcoal-70">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-prose rounded-lg border border-navy/10 bg-white p-5 text-caption leading-relaxed text-charcoal-70">
          Nothing is sold or booked through this website. Enquire for current batch timings and
          availability, and a counsellor will come back to you.
        </p>
      </SectionShell>

      <CtaStrip
        title="Not sure which test you need?"
        description="Which test you sit depends on where you are applying and what the institution accepts. Ask us before you book one."
        secondaryLabel="Send an enquiry"
        secondaryHref="/contact"
        surface="white"
      />
    </>
  );
}
