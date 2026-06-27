import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images', 'bg');

const themes = {
  speed: { c1: '#1d4ed8', c2: '#7c3aed', c3: '#06b6d4', accent: 'lines' },
  security: { c1: '#0f172a', c2: '#1e40af', c3: '#3b82f6', accent: 'shield' },
  quality: { c1: '#4c1d95', c2: '#7c3aed', c3: '#a78bfa', accent: 'grid' },
  support: { c1: '#0d9488', c2: '#0891b2', c3: '#22d3ee', accent: 'waves' },
  innovation: { c1: '#6d28d9', c2: '#db2777', c3: '#f472b6', accent: 'stars' },
  experience: { c1: '#1e3a8a', c2: '#4338ca', c3: '#6366f1', accent: 'growth' },
  web: { c1: '#1e40af', c2: '#2563eb', c3: '#38bdf8', accent: 'browser' },
  app: { c1: '#7e22ce', c2: '#a855f7', c3: '#e879f9', accent: 'phones' },
  bot: { c1: '#047857', c2: '#059669', c3: '#34d399', accent: 'chat' },
  software: { c1: '#0f172a', c2: '#334155', c3: '#64748b', accent: 'code' },
  portfolio: { c1: '#b45309', c2: '#d97706', c3: '#fbbf24', accent: 'grid' },
  blog: { c1: '#be185d', c2: '#db2777', c3: '#f9a8d4', accent: 'lines' },
  testimonial: { c1: '#4338ca', c2: '#6366f1', c3: '#a5b4fc', accent: 'quote' },
  statistics: { c1: '#0369a1', c2: '#0284c7', c3: '#38bdf8', accent: 'bars' },
  pricing: { c1: '#15803d', c2: '#16a34a', c3: '#4ade80', accent: 'coins' },
  faq: { c1: '#7c2d12', c2: '#c2410c', c3: '#fb923c', accent: 'question' },
  contact: { c1: '#1d4ed8', c2: '#3b82f6', c3: '#93c5fd', accent: 'mail' },
  cta: { c1: '#4c1d95', c2: '#7c3aed', c3: '#c084fc', accent: 'burst' },
  about: { c1: '#0e7490', c2: '#0891b2', c3: '#67e8f9', accent: 'team' },
  services: { c1: '#312e81', c2: '#4f46e5', c3: '#818cf8', accent: 'services' },
};

function accentSvg(type, c3) {
  const o = `opacity="0.35" fill="${c3}"`;
  switch (type) {
    case 'lines':
      return Array.from({ length: 8 }, (_, i) =>
        `<line x1="0" y1="${80 + i * 60}" x2="800" y2="${40 + i * 60}" stroke="${c3}" stroke-width="3" opacity="0.25"/>`
      ).join('');
    case 'shield':
      return `<path d="M400 120 L520 180 V300 C520 380 400 440 400 440 C400 440 280 380 280 300 V180 Z" fill="${c3}" opacity="0.2"/><path d="M400 200 L460 240 V310 C460 350 400 380 400 380 C400 380 340 350 340 310 V240 Z" fill="${c3}" opacity="0.35"/>`;
    case 'grid':
      return Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) =>
          `<rect x="${c * 100 + 20}" y="${r * 90 + 20}" width="60" height="50" rx="8" fill="${c3}" opacity="0.15"/>`
        ).join('')
      ).join('');
    case 'waves':
      return `<path d="M0 400 Q200 320 400 400 T800 400 V600 H0 Z" fill="${c3}" opacity="0.25"/><path d="M0 460 Q200 380 400 460 T800 460 V600 H0 Z" fill="${c3}" opacity="0.2"/>`;
    case 'stars':
      return Array.from({ length: 20 }, (_, i) => {
        const x = (i * 137) % 760 + 20;
        const y = (i * 89) % 500 + 40;
        const s = 4 + (i % 5);
        return `<circle cx="${x}" cy="${y}" r="${s}" fill="${c3}" opacity="0.4"/>`;
      }).join('');
    case 'growth':
      return `<polyline points="100,450 220,350 340,380 460,250 580,200 700,120" fill="none" stroke="${c3}" stroke-width="6" opacity="0.45"/>`;
    case 'browser':
      return `<rect x="180" y="100" width="440" height="320" rx="16" fill="${c3}" opacity="0.2"/><rect x="180" y="100" width="440" height="40" rx="16" fill="${c3}" opacity="0.35"/>`;
    case 'phones':
      return `<rect x="280" y="80" width="120" height="220" rx="16" fill="${c3}" opacity="0.3"/><rect x="420" y="120" width="100" height="180" rx="14" fill="${c3}" opacity="0.2"/>`;
    case 'chat':
      return `<ellipse cx="300" cy="280" rx="120" ry="70" fill="${c3}" opacity="0.25"/><ellipse cx="500" cy="220" rx="100" ry="60" fill="${c3}" opacity="0.2"/>`;
    case 'code':
      return Array.from({ length: 6 }, (_, i) =>
        `<rect x="200" y="${120 + i * 45}" width="${180 + (i % 3) * 80}" height="20" rx="4" fill="${c3}" opacity="0.25"/>`
      ).join('');
    case 'quote':
      return `<text x="120" y="200" font-size="180" font-family="serif" fill="${c3}" opacity="0.25">"</text><text x="620" y="420" font-size="140" font-family="serif" fill="${c3}" opacity="0.2">"</text>`;
    case 'bars':
      return [120, 200, 280, 360, 440, 520, 600].map((x, i) =>
        `<rect x="${x}" y="${380 - i * 35}" width="50" height="${80 + i * 35}" rx="6" fill="${c3}" opacity="0.3"/>`
      ).join('');
    case 'coins':
      return [300, 400, 500].map((x, i) =>
        `<circle cx="${x}" cy="${280 - i * 20}" r="${50 + i * 10}" fill="none" stroke="${c3}" stroke-width="8" opacity="0.35"/>`
      ).join('');
    case 'question':
      return `<text x="360" y="320" font-size="200" font-family="sans-serif" font-weight="bold" fill="${c3}" opacity="0.25">?</text>`;
    case 'mail':
      return `<rect x="250" y="180" width="300" height="200" rx="12" fill="${c3}" opacity="0.2"/><polyline points="250,180 400,300 550,180" fill="none" stroke="${c3}" stroke-width="6" opacity="0.35"/>`;
    case 'burst':
      return Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x2 = 400 + Math.cos(a) * 280;
        const y2 = 300 + Math.sin(a) * 220;
        return `<line x1="400" y1="300" x2="${x2}" y2="${y2}" stroke="${c3}" stroke-width="4" opacity="0.3"/>`;
      }).join('');
    case 'team':
      return [320, 400, 480].map((x) =>
        `<circle cx="${x}" cy="260" r="40" fill="${c3}" opacity="0.3"/><rect x="${x - 35}" y="310" width="70" height="90" rx="20" fill="${c3}" opacity="0.2"/>`
      ).join('');
    default:
      return `<circle cx="400" cy="300" r="150" fill="${c3}" opacity="0.2"/>`;
  }
}

function buildSvg(name, { c1, c2, c3, accent }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="glow-${name}" cx="70%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg-${name})"/>
  <rect width="800" height="600" fill="url(#glow-${name})"/>
  ${accentSvg(accent, c3)}
</svg>`;
}

await mkdir(outDir, { recursive: true });
for (const [name, theme] of Object.entries(themes)) {
  await writeFile(join(outDir, `${name}.svg`), buildSvg(name, theme), 'utf-8');
  console.log(`✓ ${name}.svg`);
}
console.log('Done!');
