const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
  const imagesDir = path.resolve(__dirname, '../src/assets/images');
  const publicImagesDir = path.resolve(__dirname, '../public/images');

  // 1. Remove duplicate navadeep-vision.png
  const duplicates = [
    path.join(imagesDir, 'navadeep-vision.png'),
    path.join(publicImagesDir, 'navadeep-vision.png'),
  ];
  for (const dup of duplicates) {
    if (fs.existsSync(dup)) {
      fs.unlinkSync(dup);
      console.log(`Deleted duplicate image: ${dup}`);
    }
  }

  // 2. Convert sunset and studio portraits to WebP and AVIF
  const targets = ['navadeep-sunset', 'navadeep-studio'];
  for (const name of targets) {
    const pngPath = path.join(imagesDir, `${name}.png`);
    if (fs.existsSync(pngPath)) {
      // Generate WebP
      const webpPath = path.join(imagesDir, `${name}.webp`);
      await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath);
      console.log(`Generated WebP: ${webpPath}`);

      // Generate AVIF
      const avifPath = path.join(imagesDir, `${name}.avif`);
      await sharp(pngPath).avif({ quality: 80 }).toFile(avifPath);
      console.log(`Generated AVIF: ${avifPath}`);

      // Also copy to public/images for direct static resolution
      fs.copyFileSync(webpPath, path.join(publicImagesDir, `${name}.webp`));
      fs.copyFileSync(avifPath, path.join(publicImagesDir, `${name}.avif`));
    }
  }

  // 3. Generate high-end 1200x630 OpenGraph Social Card
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#080A0D"/>
    <!-- Cybernetic hairline grid -->
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.06"/>
      </pattern>
      <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#C6FF00" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#C6FF00" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Ambient radial glow -->
    <circle cx="950" cy="200" r="300" fill="#C6FF00" fill-opacity="0.08" filter="blur(60px)"/>
    <circle cx="200" cy="500" r="250" fill="#171D24" fill-opacity="0.8" filter="blur(50px)"/>

    <!-- Outer frame border -->
    <rect x="30" y="30" width="1140" height="570" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.15"/>
    <!-- Corner marks -->
    <path d="M 24 45 L 24 24 L 45 24" fill="none" stroke="#C6FF00" stroke-width="4"/>
    <path d="M 1176 45 L 1176 24 L 1155 24" fill="none" stroke="#C6FF00" stroke-width="4"/>
    <path d="M 24 585 L 24 606 L 45 606" fill="none" stroke="#C6FF00" stroke-width="4"/>
    <path d="M 1176 585 L 1176 606 L 1155 606" fill="none" stroke="#C6FF00" stroke-width="4"/>

    <!-- Header Telemetry Strip -->
    <text x="70" y="90" font-family="monospace" font-size="14" fill="#929BA6" letter-spacing="2">00 // HYDERABAD, IN [17.54°N, 78.43°E] — B.TECH AIML (2022–2026)</text>
    <rect x="70" y="110" width="1060" height="1" fill="#ffffff" fill-opacity="0.1"/>

    <!-- Monogram Badge -->
    <rect x="70" y="145" width="48" height="48" fill="#C6FF00"/>
    <text x="82" y="177" font-family="monospace" font-size="20" font-weight="900" fill="#080A0D">ND</text>

    <!-- Main Headline -->
    <text x="70" y="250" font-family="'Space Grotesk', sans-serif" font-size="56" font-weight="900" fill="#F4F6F8" letter-spacing="-1">NAVADEEP</text>
    <text x="70" y="315" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="800" fill="#C6FF00" letter-spacing="1">SOFTWARE ENGINEERING &amp; APPLIED AIML</text>

    <!-- Subtitle summary -->
    <text x="70" y="375" font-family="sans-serif" font-size="20" fill="#929BA6">B.Tech student at MLR Institute of Technology. Turning campus friction</text>
    <text x="70" y="405" font-family="sans-serif" font-size="20" fill="#929BA6">into carefully architected software and intelligent client interfaces.</text>

    <!-- Projects & Systems Strip -->
    <rect x="70" y="445" width="1060" height="90" fill="#11151A" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1"/>
    <text x="100" y="485" font-family="monospace" font-size="12" fill="#929BA6">FEATURED PLATFORMS</text>
    <text x="100" y="515" font-family="monospace" font-size="18" font-weight="bold" fill="#F4F6F8">Statio-MLR <tspan fill="#C6FF00">·</tspan> Fast Bite <tspan fill="#C6FF00">·</tspan> In-Browser ML Lab</text>

    <text x="780" y="485" font-family="monospace" font-size="12" fill="#929BA6">CORE STACK</text>
    <text x="780" y="515" font-family="monospace" font-size="18" font-weight="bold" fill="#C6FF00">React 19 · TypeScript · Python</text>

    <!-- Footer telemetry -->
    <text x="70" y="575" font-family="monospace" font-size="12" fill="#929BA6">OPEN TO INTERNSHIPS — CLASS OF 2026 // GITHUB: navadeepjustin-create</text>
    <text x="960" y="575" font-family="monospace" font-size="12" fill="#C6FF00" font-weight="bold">AUTH. PORTFOLIO</text>
  </svg>
  `;

  const ogOutputPath = path.resolve(__dirname, '../public/og-image.png');
  await sharp(Buffer.from(ogSvg))
    .png({ quality: 95 })
    .toFile(ogOutputPath);
  console.log(`Generated 1200x630 OG Image: ${ogOutputPath}`);
}

optimizeImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
