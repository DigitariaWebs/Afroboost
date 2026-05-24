import { useTranslations } from 'next-intl';
import {
  MessageSquareText,
  PhoneCall,
  LineChart,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import clsx from 'clsx';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { IconDisc } from '@/components/IconDisc';

type Tone = 'emerald' | 'gold' | 'plum';

const toneStyles: Record<
  Tone,
  {
    rail: string;
    hoverGlow: string;
    chip: string;
    chipText: string;
    accentText: string;
    softBg: string;
    border: string;
    hoverBorder: string;
    rgb: string;
  }
> = {
  emerald: {
    rail: 'bg-[linear-gradient(90deg,#3DAA68,#1F8A55,#15643E)]',
    hoverGlow: 'hover:shadow-[0_24px_60px_-28px_rgba(31,138,85,0.45)]',
    chip: 'bg-[#E6F4EC] ring-1 ring-[#1F8A55]/20',
    chipText: 'text-[#15643E]',
    accentText: 'text-[#15643E]',
    softBg: 'bg-[#F4FBF7]',
    border: 'border-[#E5EAE7]',
    hoverBorder: 'group-hover:border-[#1F8A55]/40',
    rgb: '31,138,85',
  },
  gold: {
    rail: 'bg-[linear-gradient(90deg,#F2C95C,#E8B84A,#B8842A)]',
    hoverGlow: 'hover:shadow-[0_24px_60px_-28px_rgba(232,184,74,0.55)]',
    chip: 'bg-[#FBF1D4] ring-1 ring-[#E8B84A]/30',
    chipText: 'text-[#8A5E1A]',
    accentText: 'text-[#8A5E1A]',
    softBg: 'bg-[#FFFCF3]',
    border: 'border-[#E5EAE7]',
    hoverBorder: 'group-hover:border-[#E8B84A]/50',
    rgb: '232,184,74',
  },
  plum: {
    rail: 'bg-[linear-gradient(90deg,#C58FB5,#6E3360,#3D1A36)]',
    hoverGlow: 'hover:shadow-[0_24px_60px_-28px_rgba(91,42,79,0.45)]',
    chip: 'bg-[#F1E4ED] ring-1 ring-[#6E3360]/20',
    chipText: 'text-[#5B2A4F]',
    accentText: 'text-[#5B2A4F]',
    softBg: 'bg-[#FBF6FA]',
    border: 'border-[#E5EAE7]',
    hoverBorder: 'group-hover:border-[#6E3360]/40',
    rgb: '91,42,79',
  },
};

function ContentDemo({ t, tone }: { t: ReturnType<typeof useTranslations>; tone: Tone }) {
  const s = toneStyles[tone];
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-lg border border-[#ECECEC] p-4',
        s.softBg,
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={clsx(
            'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]',
            s.chip,
            s.chipText,
          )}
        >
          <Sparkles className="h-3 w-3" />
          {t('content.demoTone')}
        </span>
        <span className="font-mono text-[10px] text-[#9CA39E]">FB · IG</span>
      </div>
      <p className="mt-3 font-serif text-[1.05rem] italic leading-snug text-[#0E1A14]">
        &ldquo;{t('content.demoCaption')}&rdquo;
      </p>
      <div className="mt-3 flex items-center justify-between text-caption text-[#6B7570]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1F8A55]" />
          {t('content.demoTime')}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1F8A55]">
          programmé
        </span>
      </div>
    </div>
  );
}

function AgentDemo({ t, tone }: { t: ReturnType<typeof useTranslations>; tone: Tone }) {
  const s = toneStyles[tone];
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-lg border border-[#ECECEC] p-4 space-y-2.5',
        s.softBg,
      )}
    >
      <div className="flex justify-start">
        <span className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[13px] text-[#0E1A14] ring-1 ring-[#ECECEC]">
          {t('agent.demoLine1')}
        </span>
      </div>
      <div className="flex justify-end">
        <span
          className={clsx(
            'max-w-[85%] rounded-2xl rounded-tr-sm px-3 py-2 text-[13px]',
            s.chip,
            s.chipText,
          )}
        >
          {t('agent.demoLine2')}
        </span>
      </div>
      <div className="flex justify-start">
        <span className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[13px] text-[#0E1A14] ring-1 ring-[#ECECEC]">
          {t('agent.demoLine3')}
        </span>
      </div>
      <div className="flex items-center gap-1.5 pt-1 text-caption">
        <CheckCircle2 className="h-3.5 w-3.5 text-[#3DAA68]" />
        <span className={clsx('font-medium', s.accentText)}>{t('agent.demoBadge')}</span>
      </div>
    </div>
  );
}

function IntelDemo({ t, tone }: { t: ReturnType<typeof useTranslations>; tone: Tone }) {
  const s = toneStyles[tone];
  return (
    <div className="grid grid-cols-2 gap-2">
      <div
        className={clsx(
          'relative overflow-hidden rounded-lg border border-[#ECECEC] p-3',
          s.softBg,
        )}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6B7570]">
          {t('intel.demoKpi1')}
        </p>
        <p className="mt-1 font-display text-[1.6rem] leading-none text-[#0E1A14] tabular-nums">
          $8,420
        </p>
        <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#E6F4EC] px-1.5 py-0.5 text-[11px] font-semibold text-[#15643E]">
          <TrendingUp className="h-3 w-3" /> +18%
        </p>
        {/* Sparkline */}
        <svg
          viewBox="0 0 80 24"
          className="absolute right-2 bottom-2 h-4 w-16 opacity-70"
          aria-hidden
        >
          <path
            d="M0 18 L12 14 L22 16 L34 8 L46 10 L58 4 L70 6 L80 2"
            fill="none"
            stroke="#1F8A55"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={clsx(
          'relative overflow-hidden rounded-lg border border-[#ECECEC] p-3',
          s.softBg,
        )}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6B7570]">
          {t('intel.demoKpi2')}
        </p>
        <p className="mt-1 font-display text-[1.6rem] leading-none text-[#0E1A14] tabular-nums">
          142
        </p>
        <p className="mt-1.5 text-[11px] text-[#6B7570]">{t('intel.demoTrend')}</p>
        {/* Bars */}
        <div className="absolute right-2 bottom-2 flex items-end gap-0.5">
          {[6, 10, 7, 12, 9, 14, 11].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-sm bg-[#5B2A4F]/60"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Pillars() {
  const t = useTranslations('pillars');

  const pillars: {
    tone: Tone;
    icon: typeof MessageSquareText;
    label: string;
    title: string;
    body: string;
    demo: React.ReactNode;
  }[] = [
    {
      tone: 'emerald',
      icon: MessageSquareText,
      label: t('content.label'),
      title: t('content.title'),
      body: t('content.body'),
      demo: <ContentDemo t={t} tone="emerald" />,
    },
    {
      tone: 'gold',
      icon: PhoneCall,
      label: t('agent.label'),
      title: t('agent.title'),
      body: t('agent.body'),
      demo: <AgentDemo t={t} tone="gold" />,
    },
    {
      tone: 'plum',
      icon: LineChart,
      label: t('intel.label'),
      title: t('intel.title'),
      body: t('intel.body'),
      demo: <IntelDemo t={t} tone="plum" />,
    },
  ];

  return (
    <Section id="features" className="relative bg-white">
      {/* Soft topo decorative tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(232,184,74,0.10) 0%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, #000, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, #000, transparent)',
        }}
      />

      <Reveal direction="up">
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="inline-flex items-center gap-2 text-overline uppercase font-medium text-accent-muted tracking-[0.22em]">
            <span className="h-px w-6 bg-accent-muted/60" />
            {t('overline')}
            <span className="h-px w-6 bg-accent-muted/60" />
          </span>
          <h2 className="font-display text-[2.5rem] sm:text-[3rem] leading-[1.05] tracking-[-0.03em] text-[#0E1A14] max-w-3xl">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-[#4A5750] max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          const s = toneStyles[p.tone];
          return (
            <Reveal key={p.title} direction="up" delay={i * 140}>
              <article
                className={clsx(
                  'group relative h-full overflow-hidden rounded-2xl border bg-white p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1',
                  s.border,
                  s.hoverBorder,
                  'shadow-[0_8px_24px_-16px_rgba(15,30,25,0.18)]',
                  s.hoverGlow,
                )}
              >
                {/* Tone-colored top rail */}
                <span aria-hidden className={clsx('absolute inset-x-0 top-0 h-[3px]', s.rail)} />

                {/* Soft tone glow at top-right */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, rgba(${s.rgb},0.18), transparent 70%)`,
                  }}
                />

                <div className="relative flex h-full flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <IconDisc tone={p.tone} size="md">
                      <Icon className="h-5 w-5" />
                    </IconDisc>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA39E]">
                      0{i + 1} <span className="text-[#D6D6D6]">/</span> 03
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p
                      className={clsx(
                        'text-[10.5px] font-semibold uppercase tracking-[0.22em]',
                        s.accentText,
                      )}
                    >
                      {p.label}
                    </p>
                    <h3 className="font-display text-[1.5rem] sm:text-[1.65rem] leading-tight text-[#0E1A14]">
                      {p.title}
                    </h3>
                    <p className="text-body text-[#4A5750] leading-relaxed">{p.body}</p>
                  </div>
                  <div className="mt-auto pt-2">{p.demo}</div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
