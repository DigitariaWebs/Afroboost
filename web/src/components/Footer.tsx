import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from './Container';
import { LanguageToggle } from './LanguageToggle';

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
    <footer className="relative border-t border-border bg-surface/40">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-5 flex flex-col gap-5">
            <Logo width={150} className="self-start" />
            <p className="max-w-sm text-body text-muted">{t('tagline')}</p>
            <a
              href="mailto:kamungapatrick@gmail.com"
              className="inline-flex items-center gap-2 text-caption text-muted hover:text-accent transition"
            >
              <Mail className="h-3.5 w-3.5" />
              kamungapatrick@gmail.com
            </a>
            <LanguageToggle className="self-start" />
          </div>

          <div className="md:col-span-7 grid gap-8 sm:grid-cols-3">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-overline uppercase font-medium tracking-[0.18em] text-accent mb-4">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        className="text-body text-muted hover:text-foreground transition"
                      >
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 sm:flex-row sm:items-center">
          <p className="text-caption text-muted-fg">
            © {year} AfroBoost — {t('madeIn')}
          </p>
          <p className="text-caption text-muted-fg">{t('rights')}</p>
        </div>
      </Container>
    </footer>
  );
}
