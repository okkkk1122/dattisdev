import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export interface StoredEmail {
  id: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  receivedAt: string;
  read: boolean;
  source: 'haraka' | 'contact';
}

export interface SiteContent {
  posts: unknown[];
  portfolio: unknown[];
  testimonials: unknown[];
  pricing: unknown[];
  faq: unknown[];
  emails: StoredEmail[];
  settings: Record<string, unknown>;
}

const DEFAULT_CONTENT: SiteContent = {
  posts: [],
  portfolio: [],
  testimonials: [],
  pricing: [],
  faq: [],
  emails: [],
  settings: {
    siteName: 'DattisDev',
    contactEmail: 'info@dattisdev.com',
    contactPhone: '+98 21 1234 5678',
    address: 'تهران، خیابان ولیعصر',
    mailDomain: 'dattisdev.com',
    smtpHost: 'haraka',
    smtpPort: 25,
    smtpUser: '',
    smtpPass: '',
    smtpFrom: 'info@dattisdev.com',
  },
};

@Injectable()
export class StorageService implements OnModuleInit {
  private dataPath: string;
  private content: SiteContent = { ...DEFAULT_CONTENT };

  constructor() {
    this.dataPath = join(process.cwd(), 'data', 'content.json');
  }

  async onModuleInit() {
    await this.load();
  }

  private async load() {
    try {
      if (!existsSync(this.dataPath)) {
        await mkdir(join(process.cwd(), 'data'), { recursive: true });
        await this.save(DEFAULT_CONTENT);
        return;
      }
      const raw = await readFile(this.dataPath, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<SiteContent>;
      this.content = {
        ...DEFAULT_CONTENT,
        ...parsed,
        emails: parsed.emails ?? [],
        settings: { ...DEFAULT_CONTENT.settings, ...(parsed.settings ?? {}) },
      };
    } catch {
      this.content = { ...DEFAULT_CONTENT };
    }
  }

  private async save(data: SiteContent) {
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
    await writeFile(this.dataPath, JSON.stringify(data, null, 2), 'utf-8');
    this.content = data;
  }

  getAll(): SiteContent {
    return this.content;
  }

  get<K extends keyof SiteContent>(key: K): SiteContent[K] {
    return this.content[key];
  }

  async set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    const updated = { ...this.content, [key]: value };
    await this.save(updated);
    return value;
  }

  async updateSettings(settings: Record<string, unknown>) {
    const updated = {
      ...this.content,
      settings: { ...this.content.settings, ...settings },
    };
    await this.save(updated);
    return updated.settings;
  }

  async addEmail(email: Omit<StoredEmail, 'id'>) {
    const entry: StoredEmail = {
      ...email,
      id: `mail-${Date.now()}`,
    };
    const updated = {
      ...this.content,
      emails: [entry, ...(this.content.emails ?? [])],
    };
    await this.save(updated);
    return entry;
  }

  async markEmailRead(id: string, read: boolean) {
    const emails = (this.content.emails ?? []).map((item) =>
      item.id === id ? { ...item, read } : item,
    );
    const updated = { ...this.content, emails };
    await this.save(updated);
    return emails.find((item) => item.id === id);
  }

  async deleteEmail(id: string) {
    const emails = (this.content.emails ?? []).filter((item) => item.id !== id);
    const updated = { ...this.content, emails };
    await this.save(updated);
    return true;
  }
}
