'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// useLayoutEffect memicu warning saat SSR; pakai useEffect di server.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type ScrollRevealProps = {
  children: ReactNode;
  /** Elemen pembungkus (default 'div'). Mis. 'section', 'ul'. */
  as?: ElementType;
  className?: string;
  /** Jarak translateY awal dalam px (default 24). */
  y?: number;
  /** Jeda sebelum animasi mulai dalam detik (default 0). */
  delay?: number;
  /** Animasikan anak-anak langsung secara berurutan (cascade). */
  stagger?: boolean;
  /** Jeda antar anak saat stagger dalam detik (default 0.08). */
  staggerEach?: number;
  /** Durasi animasi dalam detik (default 0.6). */
  duration?: number;
  /** Reveal sekali lalu tetap tampil. Bila false (default), animasi berulang
   *  setiap elemen masuk viewport lagi. */
  once?: boolean;
  /** Posisi pemicu relatif viewport (default 'top 85%'). */
  start?: string;
};

/**
 * Bungkus konten agar fade + rise saat masuk viewport (scroll reveal) via
 * GSAP ScrollTrigger. Menghormati prefers-reduced-motion (tampil penuh tanpa
 * gating) dan aman untuk SSR - konten tidak pernah disembunyikan permanen.
 */
export function ScrollReveal({
  children,
  as,
  className,
  y = 24,
  delay = 0,
  stagger = false,
  staggerEach = 0.08,
  duration = 0.6,
  once = false,
  start = 'top 85%',
}: ScrollRevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const targets = stagger
        ? (gsap.utils.toArray(el.children) as HTMLElement[])
        : el;
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        stagger: stagger ? staggerEach : 0,
        // Lepas transform inline setelah selesai agar hover :hover translate
        // dari Tailwind tidak tertimpa style inline GSAP.
        clearProps: once ? 'transform' : '',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once
            ? 'play none none none'
            : 'restart none none reverse',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger, staggerEach, duration, once, start]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
