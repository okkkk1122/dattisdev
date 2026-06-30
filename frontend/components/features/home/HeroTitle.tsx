'use client';

import { motion, useReducedMotion } from 'framer-motion';

type HeroTitleProps = {
  text: string;
  locale: string;
  className?: string;
};

type TitleSegment = {
  text: string;
  kind: 'brand' | 'support';
};

const BRAND_WORDS = new Set(['داتیس‌دِو', 'داتیس‌دو', 'DattisDev', 'داتيس', 'ديف']);

function isBrandWord(word: string) {
  return BRAND_WORDS.has(word) || word.includes('داتیس') || word.toLowerCase().includes('dattis');
}

/** گروه‌بندی هوشمند — «خوش آمدید» یک واحد بماند */
function buildSegments(text: string, locale: string): TitleSegment[] {
  const raw = text.split(/\s+/).filter(Boolean);
  const segments: TitleSegment[] = [];

  for (let i = 0; i < raw.length; i++) {
    const word = raw[i];
    const next = raw[i + 1];

    if (locale === 'fa' && word === 'خوش' && next === 'آمدید') {
      segments.push({ text: 'خوش آمدید', kind: 'support' });
      i++;
      continue;
    }

    if (locale === 'ar' && word === 'داتيس' && next === 'ديف') {
      segments.push({ text: 'داتيس ديف', kind: 'brand' });
      i++;
      continue;
    }

    segments.push({
      text: word,
      kind: isBrandWord(word) ? 'brand' : 'support',
    });
  }

  return segments;
}

export default function HeroTitle({ text, locale, className = '' }: HeroTitleProps) {
  const reduceMotion = useReducedMotion();
  const isRtl = locale !== 'en';
  const segments = buildSegments(text, locale);

  if (!isRtl) {
    return (
      <motion.h1
        className={`font-sans text-5xl md:text-7xl lg:text-8xl font-black mb-12 md:mb-16 leading-[1.08] tracking-tight ${className}`}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="hero-title-en bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
          {text}
        </span>
      </motion.h1>
    );
  }

  return (
    <h1
      className={`hero-title relative mb-10 md:mb-14 text-center ${className}`}
      aria-label={text}
    >
      {/* نور پس‌زمینه */}
      <span
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <span className="hero-title-glow block h-44 w-[32rem] max-w-[95vw] md:h-56" />
        <span className="hero-title-glow-secondary absolute left-1/2 top-1/2 h-28 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </span>

      <span className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 md:gap-x-5 md:gap-y-3">
        {segments.map((segment, i) => {
          const isBrand = segment.kind === 'brand';
          const floatDelay = 0.55 + i * 0.28;

          return (
            <motion.span
              key={`${segment.text}-${i}`}
              className="inline-flex items-baseline"
              initial={reduceMotion ? false : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 85,
                damping: 14,
                delay: i * 0.18,
              }}
            >
              {isBrand ? (
                <span
                  className="hero-title-brand-shell hero-title-float inline-block"
                  style={{ animationDelay: reduceMotion ? undefined : `${floatDelay}s` }}
                >
                  <span className="hero-title-brand font-lotus">{segment.text}</span>
                </span>
              ) : (
                <span
                  className="hero-title-support hero-title-float font-sans inline-block font-extrabold"
                  style={{ animationDelay: reduceMotion ? undefined : `${floatDelay}s` }}
                >
                  {segment.text}
                </span>
              )}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
}
