import { useTranslations } from 'next-intl';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from './Container';
import { Reveal } from './Reveal';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const cols: { title: string; items: { label: string; href: string }[] }[] = [
    {
      title: t('product.title'),
      items: [
        { label: t('product.features'), href: '#features' },
        { label: t('product.how'), href: '#how' },
        { label: t('product.pricing'), href: '#pricing' },
        { label: t('product.faq'), href: '#faq' },
      ],
    },
    {
      title: t('company.title'),
      items: [
        { label: t('company.about'), href: '#founders' },
        { label: t('company.contact'), href: 'mailto:kamungapatrick@gmail.com' },
      ],
    },
    {
      title: t('legal.title'),
      items: [
        { label: t('legal.privacy'), href: '#' },
        { label: t('legal.terms'), href: '#' },
      ],
    },
  ];

  const flatLinks: { label: string; href: string }[] = [
    { label: t('product.features'), href: '#features' },
    { label: t('product.how'), href: '#how' },
    { label: t('product.pricing'), href: '#pricing' },
    { label: t('product.faq'), href: '#faq' },
    { label: t('company.about'), href: '#founders' },
    { label: t('legal.privacy'), href: '#' },
    { label: t('legal.terms'), href: '#' },
  ];

  return (
    <footer className="relative border-t border-[#E5E7EB] bg-white overflow-hidden pb-24 md:pb-28">
      <Container>
        {/* MOBILE — compact flat layout */}
        <Reveal as="div" direction="up" className="relative md:hidden">
          <div className="flex flex-col gap-4 py-6">
            <div className="flex items-center gap-4">
              <Logo width={120} />
              <p className="max-w-xs text-[14px] leading-snug text-[#4A5750]">
                {t('tagline')}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href="mailto:kamungapatrick@gmail.com"
                className="group inline-flex items-center gap-2 text-[14px] text-[#4A5750] transition hover:text-accent-muted"
              >
                <Mail className="h-4 w-4" />
                <span className="link-underline">kamungapatrick@gmail.com</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="inline-flex items-center gap-2 text-[14px] text-[#6B7570]">
                <MapPin className="h-4 w-4 text-accent-muted" />
                Montréal, QC
              </span>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E5E7EB] py-3"
          >
            {flatLinks.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="text-[14px] text-[#4A5750] transition hover:text-[#0E1A14]"
              >
                <span className="link-underline">{it.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start justify-between gap-2 border-t border-[#E5E7EB] py-2 sm:flex-row sm:items-center">
            <p className="text-[12.5px] text-[#6B7570]">
              © {year} AfroBoost — {t('madeIn')}
            </p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#9CA39E]">
              {t('rights')}
            </p>
          </div>
        </Reveal>

        {/* DESKTOP — richer multi-column layout */}
        <div className="relative hidden md:block">
          {/* Subtle wordmark watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none"
          >
            <p className="font-display text-[12vw] leading-none text-[#0E1A14]/[0.035] tracking-[-0.04em]">
              AfroBoost
            </p>
          </div>

          <div className="relative grid gap-10 py-14 md:grid-cols-12">
            <Reveal as="div" direction="up" className="md:col-span-5 flex flex-col gap-5">
              <Logo width={150} className="self-start" />
              <p className="max-w-sm text-[15.5px] leading-relaxed text-[#4A5750]">
                {t('tagline')}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="mailto:kamungapatrick@gmail.com"
                  className="group inline-flex items-center gap-2 text-[14px] text-[#4A5750] transition hover:text-accent-muted"
                >
                  <Mail className="h-4 w-4" />
                  <span className="link-underline">kamungapatrick@gmail.com</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <span className="inline-flex items-center gap-2 text-[14px] text-[#6B7570]">
                  <MapPin className="h-4 w-4 text-accent-muted" />
                  Montréal, QC
                </span>
              </div>
            </Reveal>

            <Reveal
              as="div"
              direction="up"
              delay={140}
              className="md:col-span-7 grid gap-8 sm:grid-cols-3"
            >
              {cols.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-3 inline-flex items-center gap-2 text-[12px] uppercase font-semibold tracking-[0.22em] text-accent-muted">
                    <span className="h-px w-4 bg-accent-muted/60" />
                    {col.title}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {col.items.map((it) => (
                      <li key={it.label}>
                        <a
                          href={it.href}
                          className="group inline-flex items-center gap-1.5 text-[15px] text-[#4A5750] transition hover:text-[#0E1A14]"
                        >
                          <span className="link-underline">{it.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover:translate-x-0 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="relative flex flex-col items-start justify-between gap-2 border-t border-[#E5E7EB] py-5 sm:flex-row sm:items-center">
            <p className="text-[13px] text-[#6B7570]">
              © {year} AfroBoost — {t('madeIn')}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA39E]">
              {t('rights')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
