'use client';

import { useEffect } from 'react';
import { usePostsStore } from '@/lib/stores/postsStore';
import { usePortfolioStore } from '@/lib/stores/portfolioStore';
import { useTestimonialsStore } from '@/lib/stores/testimonialsStore';
import { usePricingStore } from '@/lib/stores/pricingStore';
import { useFAQStore } from '@/lib/stores/faqStore';
import { useChatStore } from '@/lib/stores/chatStore';
import { useUsersStore } from '@/lib/stores/usersStore';
import { applyContentDefaults } from '@/lib/i18n/mergeDefaults';

function rehydrateAllStores() {
  return Promise.all([
    usePostsStore.persist.rehydrate(),
    usePortfolioStore.persist.rehydrate(),
    useTestimonialsStore.persist.rehydrate(),
    usePricingStore.persist.rehydrate(),
    useFAQStore.persist.rehydrate(),
    useChatStore.persist.rehydrate(),
    useUsersStore.persist.rehydrate(),
  ]);
}

export default function StoreHydrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    void rehydrateAllStores().then(() => {
      applyContentDefaults();
    });
  }, []);

  return <>{children}</>;
}
