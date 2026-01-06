'use client';

import HeroSection from '@/components/features/home/HeroSection';
import StatisticsSection from '@/components/features/home/StatisticsSection';
import FeaturesSection from '@/components/features/home/FeaturesSection';
import ServicesPreviewSection from '@/components/features/home/ServicesPreviewSection';
import PortfolioPreviewSection from '@/components/features/home/PortfolioPreviewSection';
import TestimonialsSection from '@/components/features/home/TestimonialsSection';
import BlogPreviewSection from '@/components/features/home/BlogPreviewSection';
import CTASection from '@/components/features/home/CTASection';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <ServicesPreviewSection />
      <PortfolioPreviewSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  );
}
