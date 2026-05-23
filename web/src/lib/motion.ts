'use client';

import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px', ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, visible };
}

export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}

export function useActiveSection(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? '');
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);
  return active;
}

export function useTypewriter(
  words: string[],
  {
    typeMs = 65,
    deleteMs = 32,
    holdMs = 1400,
    holdEndMs = 600,
    loop = true,
  }: {
    typeMs?: number;
    deleteMs?: number;
    holdMs?: number;
    holdEndMs?: number;
    loop?: boolean;
  } = {},
) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    let cancelled = false;
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer: number | undefined;

    const step = () => {
      if (cancelled) return;
      const word = words[wi];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) {
          if (!loop && wi === words.length - 1) {
            setDone(true);
            return;
          }
          timer = window.setTimeout(() => {
            deleting = true;
            step();
          }, holdMs);
          return;
        }
        timer = window.setTimeout(step, typeMs);
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          timer = window.setTimeout(step, holdEndMs);
          return;
        }
        timer = window.setTimeout(step, deleteMs);
      }
    };

    timer = window.setTimeout(step, 400);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [words, typeMs, deleteMs, holdMs, holdEndMs, loop]);

  return { text, done };
}

export function useCounter(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const tick = (t: number) => {
      const u = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * ease(u)));
      if (u < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}
