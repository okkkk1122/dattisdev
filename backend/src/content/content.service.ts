import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ContentService {
  constructor(private readonly storage: StorageService) {}

  getPosts() {
    return this.storage.get('posts');
  }

  async setPosts(posts: unknown[]) {
    return this.storage.set('posts', posts);
  }

  getPortfolio() {
    return this.storage.get('portfolio');
  }

  async setPortfolio(portfolio: unknown[]) {
    return this.storage.set('portfolio', portfolio);
  }

  getTestimonials() {
    return this.storage.get('testimonials');
  }

  async setTestimonials(testimonials: unknown[]) {
    return this.storage.set('testimonials', testimonials);
  }

  getPricing() {
    return this.storage.get('pricing');
  }

  async setPricing(pricing: unknown[]) {
    return this.storage.set('pricing', pricing);
  }

  getFaq() {
    return this.storage.get('faq');
  }

  async setFaq(faq: unknown[]) {
    return this.storage.set('faq', faq);
  }

  getSettings() {
    const settings = this.storage.get('settings');
    const { smtpPass, ...safe } = settings as Record<string, unknown>;
    return { ...safe, smtpPass: smtpPass ? '********' : '' };
  }

  async updateSettings(settings: Record<string, unknown>) {
    return this.storage.updateSettings(settings);
  }

  getAll() {
    return {
      posts: this.getPosts(),
      portfolio: this.getPortfolio(),
      testimonials: this.getTestimonials(),
      pricing: this.getPricing(),
      faq: this.getFaq(),
      settings: this.getSettings(),
    };
  }

  async syncAll(data: Partial<Record<string, unknown[]>>) {
    if (data.posts) await this.setPosts(data.posts);
    if (data.portfolio) await this.setPortfolio(data.portfolio);
    if (data.testimonials) await this.setTestimonials(data.testimonials);
    if (data.pricing) await this.setPricing(data.pricing);
    if (data.faq) await this.setFaq(data.faq);
    return this.getAll();
  }
}
