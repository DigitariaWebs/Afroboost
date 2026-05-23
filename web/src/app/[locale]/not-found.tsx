import Link from 'next/link';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/Button';

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-overline uppercase tracking-[0.18em] text-accent mb-3">404</p>
      <h1 className="font-serif text-display text-foreground mb-4">Page not found</h1>
      <p className="text-muted mb-8">This page does not exist (or no longer does).</p>
      <ButtonLink href="/" variant="gold">
        Back to home
      </ButtonLink>
    </Container>
  );
}
