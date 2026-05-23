import { useTranslations } from 'next-intl';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from './Container';
import { LanguageToggle } from './LanguageToggle';
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

  return (
    <footer className="relative border-t border-[#E5E7EB] bg-white overflow-hidden">
      {/* Massive wordmark watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 select-none sm:block"
      >
        <p className="font-display text-[14vw] leading-none text-[#0E1A14]/[0.035] tracking-[-0.04em]">
          AfroBoost
        </p>
      </div>

      <Container>
        <div className="relative grid gap-10 py-16 md:grid-cols-12">
          <Reveal as="div" direction="up" className="md:col-span-5 flex flex-col gap-5">
            <Logo width={150} className="self-start" />
            <p className="max-w-sm text-body text-[#4A5750]">{t('tagline')}</p>
            <a
              href="mailto:kamungapatrick@gmail.com"
              className="group inline-flex items-center gap-2 self-start text-caption text-[#4A5750] transition hover:text-accent-muted"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="link-underline">kamungapatrick@gmail.com</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="inline-flex items-center gap-2 text-caption text-[#6B7570]">
              <MapPin className="h-3.5 w-3.5 text-accent-muted" />
              Montréal, QC
            </p>
            <LanguageToggle className="self-start" />
          </Reveal>

          <Reveal
            as="div"
            direction="up"
            delay={140}
            className="md:col-span-7 grid gap-8 sm:grid-cols-3"
          >
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 inline-flex items-center gap-2 text-overline uppercase font-medium tracking-[0.22em] text-accent-muted">
                  <span className="h-px w-4 bg-accent-muted/60" />
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        className="group inline-flex items-center gap-1.5 text-body text-[#4A5750] transition hover:text-[#0E1A14]"
                      >
                        <span className="link-underline">{it.label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative flex flex-col items-start justify-between gap-3 border-t border-[#E5E7EB] py-6 sm:flex-row sm:items-center">
          <p className="text-caption text-[#6B7570]">
            © {year} AfroBoost — {t('madeIn')}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA39E]">
            {t('rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
