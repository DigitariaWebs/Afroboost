import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E1A14',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://afroboost.app'),
  title: {
    default: 'AfroBoost — AI for Afro-Caribbean entrepreneurs',
    template: '%s · AfroBoost',
  },
  description:
    'AfroBoost is the AI that publishes your posts, answers your calls 24/7, and tells you what is working — built for restaurants, bars, and small businesses.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
