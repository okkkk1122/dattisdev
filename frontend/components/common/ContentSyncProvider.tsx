'use client';

import { useContentSync } from '@/lib/hooks/useContentSync';

export default function ContentSyncProvider({ children }: { children: React.ReactNode }) {
  useContentSync();
  return <>{children}</>;
}
