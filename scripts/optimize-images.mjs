import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '../public/images/categories');

async function convertHero() {
  const hero = path.join(dir, 'hero.jpg');
  const sizes = [
    { width: 400, suffix: '400w' },
    { width: 800, suffix: '800w' },
    { width: 1200, suffix: '1200w' },
  ];

  for (const { width, suffix } of sizes) {
    await sharp(hero)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(path.join(dir, `hero-${suffix}.webp`));
    console.log(`Created hero-${suffix}.webp`);

    await sharp(hero)
      .resize(width)
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(dir, `hero-${suffix}.jpg`));
    console.log(`Created hero-${suffix}.jpg`);
  }

  await sharp(hero)
    .webp({ quality: 80 })
    .toFile(path.join(dir, 'hero.webp'));
  console.log('Created hero.webp');
}

async function convertCategories() {
  const files = fs.readdirSync(dir).filter(
    (f) => f.endsWith('.jpg') && f !== 'hero.jpg',
  );

  for (const file of files) {
    const webpFile = file.replace('.jpg', '.webp');
    await sharp(path.join(dir, file))
      .resize(600)
      .webp({ quality: 75 })
      .toFile(path.join(dir, webpFile));
    console.log(`Created ${webpFile}`);
  }
}

(async () => {
  await convertHero();
  await convertCategories();
  console.log('All images optimized!');
})().catch(console.error);
