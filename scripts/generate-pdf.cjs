/**
 * Playwright-based PDF Generator
 * Renders the /resume route in print media format and exports to public/resume.pdf
 * Respects user overrides: If public/resume.pdf already exists, it is NOT overwritten.
 */

const fs = require('fs');
const path = require('path');

const targetPdf = path.join(__dirname, '..', 'public', 'resume.pdf');

// NEVER overwrite if public/resume.pdf already exists
if (fs.existsSync(targetPdf) && !process.env.FORCE_RESUME_OVERWRITE) {
  console.log('NOTICE: public/resume.pdf already exists. Preserving existing export per instructions.');
  console.log('To regenerate from source, set FORCE_RESUME_OVERWRITE=1 or remove public/resume.pdf.');
  process.exit(0);
}

async function exportPdf() {
  try {
    let playwright;
    try {
      playwright = require('playwright');
    } catch {
      playwright = require('@playwright/test');
    }

    const { chromium } = playwright;
    console.log('Launching headless Chromium to render /resume...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const targetUrl = process.env.RESUME_URL || 'http://localhost:5173/resume';
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // Emulate print media style
    await page.emulateMedia({ media: 'print' });

    console.log(`Exporting A4 PDF to ${targetPdf}...`);
    await page.pdf({
      path: targetPdf,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm',
      },
    });

    await browser.close();
    console.log('Successfully generated public/resume.pdf!');
  } catch (error) {
    console.error('Failed to generate PDF via Playwright:', error.message);
    console.log('Note: If dev server is not running or Playwright is not yet installed, you can start the dev server and install playwright.');
    process.exit(1);
  }
}

exportPdf();
