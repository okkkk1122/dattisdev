import { mkdir, writeFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');

const images = {
  blog1: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  blog6: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  portfolio1: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  portfolio2: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  portfolio3: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80',
  portfolio4: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  portfolio5: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
  portfolio6: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  portfolio7: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80',
  portfolio8: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80',
  team1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  team4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  testimonial1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
  testimonial2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  testimonial3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  testimonial4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  hero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
  splash: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
};

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(images)) {
  const dest = join(outDir, `${name}.jpg`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(res.body, createWriteStream(dest));
    console.log(`✓ ${name}.jpg`);
  } catch (e) {
    console.warn(`✗ ${name}: ${e.message}, using placeholder`);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#8b5cf6"/></linearGradient></defs><rect fill="url(#g)" width="800" height="600"/><text x="400" y="300" text-anchor="middle" fill="white" font-size="32" font-family="sans-serif">${name}</text></svg>`;
    await writeFile(dest.replace('.jpg', '.svg'), svg);
  }
}

console.log('Done!');
