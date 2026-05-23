import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/sections/Hero';
import { Pillars } from '@/sections/Pillars';
import { HowItWorks } from '@/sections/HowItWorks';
import { Integrations } from '@/sections/Integrations';
import { Pricing } from '@/sections/Pricing';
import { Founders } from '@/sections/Founders';
import { Testimonials } from '@/sections/Testimonials';
import { FAQ } from '@/sections/FAQ';
import { FinalCTA } from '@/sections/FinalCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Pillars />
      <HowItWorks />
      <Integrations />
      <Pricing />
      <Founders />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
