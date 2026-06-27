'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createSeededParticles } from '@/lib/utils/seeded';
import { getLoadingText } from '@/lib/i18n/localeHelpers';

const LOADING_TAGLINE: Record<string, string> = {
  fa: 'استودیو نوآوری دیجیتال',
  en: 'Digital Innovation Studio',
  ar: 'استوديو الابتكار الرقمي',
};

const particles = createSeededParticles(40);
const rings = [
  { id: 0, scale: 1, opacity: 0.3, duration: 2 },
  { id: 1, scale: 1.4, opacity: 0.22, duration: 2.5 },
  { id: 2, scale: 1.8, opacity: 0.14, duration: 3 },
];

export default function LoadingScreen({ locale = 'fa' }: { locale?: string }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const finish = useCallback(() => {
    setPhase('exit');
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 40);

    const timer = setTimeout(finish, 2800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [finish, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          initial={false}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0a0a1a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-violet-950/60 to-fuchsia-950/40" />

          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-violet-600/25 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/60"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="relative mb-10">
              {rings.map((ring) => (
                <motion.div
                  key={ring.id}
                  className="absolute inset-0 rounded-full border border-white/20"
                  style={{ margin: `-${ring.id * 20}px` }}
                  animate={{
                    scale: [1, ring.scale, 1],
                    opacity: [ring.opacity, ring.opacity * 0.5, ring.opacity],
                  }}
                  transition={{
                    duration: ring.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
                <svg viewBox="0 0 48 48" className="w-14 h-14" aria-hidden>
                  <path
                    d="M12 36 L24 8 L36 36 M16 28 L32 28"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black tracking-tight text-white">Dattis</span>
              <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                Dev
              </span>
            </div>

            <p className="text-sm text-white/50 tracking-[0.3em] uppercase mb-10">
              {LOADING_TAGLINE[locale] || LOADING_TAGLINE.fa}
            </p>

            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-xs text-white/30">{getLoadingText(locale)}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
