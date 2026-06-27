'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { BackgroundKey, sectionBackgrounds } from '@/lib/data/backgroundImages';

interface ThemedCardProps {
  background: BackgroundKey;
  children: ReactNode;
  className?: string;
  overlay?: 'light' | 'dark' | 'medium';
  minHeight?: string;
}

const overlayClasses = {
  light: 'from-white/88 via-white/78 to-white/92 dark:from-gray-900/88 dark:via-gray-900/78 dark:to-gray-900/92',
  medium: 'from-gray-900/55 via-gray-900/45 to-gray-900/65',
  dark: 'from-gray-900/75 via-gray-900/65 to-gray-900/80',
};

export default function ThemedCard({
  background,
  children,
  className,
  overlay = 'light',
  minHeight,
}: ThemedCardProps) {
  const src = sectionBackgrounds[background];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all',
        className
      )}
      style={minHeight ? { minHeight } : undefined}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        unoptimized
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          overlayClasses[overlay]
        )}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
