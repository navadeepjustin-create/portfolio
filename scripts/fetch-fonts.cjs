const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.resolve(__dirname, '../public/fonts');
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location, headers).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const gfontsUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@500;700;800&display=swap';
  
  // Modern browser user-agent to get WOFF2
  const cssBuffer = await fetch(gfontsUrl, {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const css = cssBuffer.toString('utf-8');
  console.log(`Fetched Google Fonts CSS (${css.length} bytes)`);

  // Parse font blocks
  const fontBlocks = css.split('@font-face {').slice(1);
  let localCss = '';
  const preloads = [];

  let count = 0;
  for (const block of fontBlocks) {
    // Only latin subset
    if (!block.includes('/* latin */')) continue;

    const familyMatch = block.match(/font-family:\s*['"]?([^'";]+)['"]?/);
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const urlMatch = block.match(/url\((https:[^)]+\.woff2)\)/);

    if (familyMatch && weightMatch && urlMatch) {
      const family = familyMatch[1].trim();
      const weight = weightMatch[1].trim();
      const style = styleMatch ? styleMatch[1].trim() : 'normal';
      const remoteUrl = urlMatch[1].trim();

      const safeFamily = family.toLowerCase().replace(/\s+/g, '-');
      const filename = `${safeFamily}-${weight}-${style}.woff2`;
      const filePath = path.join(FONTS_DIR, filename);

      console.log(`Downloading ${filename} from ${remoteUrl}...`);
      const woff2Data = await fetch(remoteUrl);
      fs.writeFileSync(filePath, woff2Data);

      localCss += `
@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${filename}') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`;
      if (['Space Grotesk', 'Inter', 'JetBrains Mono'].includes(family) && ['400', '700'].includes(weight)) {
        preloads.push(`/fonts/${filename}`);
      }
      count++;
    }
  }

  const fontsCssPath = path.resolve(__dirname, '../src/fonts.css');
  fs.writeFileSync(fontsCssPath, localCss.trim());
  console.log(`Saved ${count} self-hosted fonts and generated src/fonts.css`);
  console.log(`Preloads: ${JSON.stringify(preloads)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
