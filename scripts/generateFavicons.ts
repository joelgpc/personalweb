// Este script generará los favicons en diferentes tamaños usando el SVG base
import sharp from 'sharp';
import fs from 'fs';

const sizes = [16, 32, 192, 512];
const svgContent = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" stroke="#0284c7" stroke-width="2"/>
  <path d="M55 30V55C55 62 50 65 45 65" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
  <path d="M25 65V35L35 50L45 35V65" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
</svg>`;

async function generateFavicons() {
  for (const size of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .toFile(`public/favicon-${size}x${size}.png`);
  }
}

generateFavicons(); 