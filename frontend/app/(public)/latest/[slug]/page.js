import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Compass,
  MessageCircle,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { getUpdate, getUpdates, getRelatedUpdates, getContact } from '../../../../lib/content';
import { metadataForRecord, breadcrumbJsonLd, articleJsonLd } from '../../../../lib/seo';
import { siteConfig } from '../../../../lib/config';
import { JsonLd } from '../../../../components/seo/JsonLd';
import { Breadcrumbs } from '../../../../components/ui/Breadcrumbs';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';
import { CtaStrip } from '../../../../components/sections/FinalCta';
import { UpdateCard } from '../../../../components/cards/UpdateCard';
import { whatsappHref } from '../../../../lib/format';

export function generateStaticParams() {
  return getUpdates().map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) return { title: 'Update not found' };

  return metadataForRecord(update, {
    path: `/latest/${update.slug}`,
    fallbackTitle: `${update.title} | Shine Consultant`,
    fallbackDescription:
      update.shortDescription ||
      `Read the latest guidance and insights on ${update.title} from Shine Consultant.`,
    image: update.featuredImage,
    type: 'article',
  });
}

export default async function LatestDetailPage({ params }) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();

  const related = getRelatedUpdates(slug, update.category, 3);
  const contact = getContact();

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Latest Updates', href: '/latest' },
    { label: update.title, href: `/latest/${update.slug}` },
  ];

  const formattedDate = update.publishedAt
    ? new Date(update.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const shareUrl = `${siteConfig.siteUrl}/latest/${update.slug}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareTitle = encodeURIComponent(`${update.title} - Shine Consultant`);

  const whatsappShareHref = `https://api.whatsapp.com/send?text=${encodedShareTitle}%20${encodedShareUrl}`;
  const linkedinShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`;
  const directWhatsapp = whatsappHref(contact?.whatsappNumber, `Hi Shine Consultant, I was reading your update on "${update.title}" and would like to know more.`);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={articleJsonLd(update)} />

      {/* Header section with Navy surface */}
      <section className="bg-navy on-navy text-white border-b border-white/10">
        <div className="shell py-12 lg:py-16">
          <Breadcrumbs trail={trail} surface="navy" />

          <div className="mt-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">{update.category}</Badge>
              {formattedDate ? (
                <span className="flex items-center gap-1.5 text-caption text-white/70">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <time dateTime={update.publishedAt}>{formattedDate}</time>
                </span>
              ) : null}
              {update.readingTime ? (
                <span className="flex items-center gap-1.5 text-caption text-white/70">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{update.readingTime}</span>
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-h1 font-extrabold text-white leading-tight">
              {update.title}
            </h1>

            {update.shortDescription ? (
              <p className="mt-5 text-lead text-white/80 leading-relaxed">
                {update.shortDescription}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Main article content and sidebar */}
      <div className="shell py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Content Column */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            {update.featuredImage ? (
              <div className="mb-10 overflow-hidden rounded-xl border border-navy/10 bg-sage/30 shadow-card">
                <img
                  src={update.featuredImage}
                  alt={update.featuredImageAlt || update.title}
                  className="h-auto w-full object-cover max-h-[480px]"
                />
              </div>
            ) : null}

            {/* Content summary callout */}
            {update.content?.summary ? (
              <div className="mb-8 rounded-lg border-l-4 border-accent bg-[#FAF8F3] p-5 sm:p-6 text-charcoal">
                <p className="text-body font-medium leading-relaxed">
                  {update.content.summary}
                </p>
              </div>
            ) : null}

            {/* Content sections */}
            <div className="space-y-8">
              {update.content?.sections?.map((section, idx) => (
                <section key={idx} className="prose-section">
                  <h2 className="font-heading text-h2 font-bold text-navy mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-body text-charcoal leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            {/* Advisory guidance note */}
            <div className="mt-12 rounded-xl border border-navy/10 bg-ivory p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <ShieldCheck className="h-6 w-6 stroke-[1.8]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-h3 font-bold text-navy">
                    Need Case-Specific Evaluation?
                  </h3>
                  <p className="mt-2 text-caption text-charcoal-70 leading-relaxed">
                    Immigration rules, university entry criteria, and visa requirements are subject to periodic changes. Our experienced education and visa counsellors evaluate your academic profile against the latest embassy directives.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button href="/book-consultation" variant="primary" size="sm">
                      Book Free Consultation
                    </Button>
                    <Button href="/contact" variant="secondary" size="sm">
                      Contact Counsellor
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back navigation */}
            <div className="mt-10 pt-6 border-t border-navy/10 flex items-center justify-between">
              <Link
                href="/latest"
                className="inline-flex items-center gap-2 font-heading text-caption font-semibold text-navy hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Latest Updates</span>
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Counsellor Guidance Card */}
            <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5F2EC] text-navy">
                  <Compass className="h-5 w-5 stroke-[1.8]" />
                </span>
                <div>
                  <p className="font-heading text-caption font-bold text-navy">Shine Consultant</p>
                  <p className="text-micro text-charcoal-50">Mumbai, Maharashtra</p>
                </div>
              </div>

              <p className="text-caption text-charcoal-70 leading-relaxed mb-5">
                Have questions regarding your study abroad applications or student visa requirements? Speak directly with our advisory team.
              </p>

              <div className="space-y-2.5">
                <Button href="/book-consultation" variant="primary" size="md" className="w-full">
                  Book Free Consultation
                </Button>
                {directWhatsapp ? (
                  <a
                    href={directWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#25D366] bg-[#25D366]/10 px-4 py-2.5 font-heading text-caption font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Share Update Card */}
            <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-card">
              <h3 className="font-heading text-caption font-semibold uppercase tracking-wider text-navy flex items-center gap-2 mb-4">
                <Share2 className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>Share this update</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-navy/15 px-3 py-1.5 text-micro font-heading font-medium text-charcoal hover:border-navy hover:text-navy transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={linkedinShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-navy/15 px-3 py-1.5 text-micro font-heading font-medium text-charcoal hover:border-navy hover:text-navy transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5 text-[#0A66C2]" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Quick Navigation / Key Services */}
            <div className="rounded-xl border border-navy/10 bg-[#FAF8F3] p-6">
              <h3 className="font-heading text-caption font-semibold uppercase tracking-wider text-navy mb-3">
                Key Services
              </h3>
              <ul className="space-y-2 text-caption">
                <li>
                  <Link href="/services/study-abroad" className="text-charcoal-70 hover:text-navy flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    <span>Study Abroad Counselling</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/visa-counselling" className="text-charcoal-70 hover:text-navy flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    <span>Student Visa Guidance</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/test-preparation" className="text-charcoal-70 hover:text-navy flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    <span>IELTS & PTE Coaching</span>
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="text-charcoal-70 hover:text-navy flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    <span>Explore Study Destinations</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Updates Section */}
      {related.length > 0 ? (
        <section className="bg-ivory py-14 lg:py-16 border-t border-navy/10">
          <div className="shell">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="eyebrow">Continue Reading</p>
                <h2 className="mt-1 font-heading text-h2 font-bold text-navy">
                  Related Updates & Insights
                </h2>
              </div>
              <Link
                href="/latest"
                className="hidden sm:inline-flex items-center gap-1.5 font-heading text-caption font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                <span>View all updates</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((item) => (
                <UpdateCard key={item.slug} update={item} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button href="/latest" variant="secondary" size="sm">
                View all updates
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <CtaStrip
        title="Ready to plan your international education?"
        description="Schedule a comprehensive profile assessment with Mrs. Bhadrika Mehta and our senior advisory team."
        primaryLabel="Book Free Consultation"
        primaryHref="/book-consultation"
      />
    </>
  );
}
