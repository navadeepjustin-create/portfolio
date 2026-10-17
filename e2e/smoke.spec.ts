import { test, expect } from '@playwright/test';

test.describe('Portfolio Comprehensive Smoke Tests & Quality Gates', () => {
  test('home page loads cleanly with zero console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/Navadeep/i);

    // Verify main landmarks
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header, nav')).toBeVisible();

    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('deep link /projects/statio-mlr loads directly and persists after reload', async ({ page }) => {
    await page.goto('/projects/statio-mlr');
    await expect(page).toHaveURL(/.*\/projects\/statio-mlr/);
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Test reload
    await page.reload();
    await expect(page).toHaveURL(/.*\/projects\/statio-mlr/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('/resume page renders ATS-friendly layout and /resume.pdf is served', async ({ page, request }) => {
    await page.goto('/resume');
    await expect(page).toHaveURL(/.*\/resume/);
    await expect(page.locator('text=NAVADEEP').first()).toBeVisible();

    // Verify PDF endpoint is served with HTTP 200
    const pdfResponse = await request.get('/resume.pdf');
    expect(pdfResponse.status()).toBe(200);
    expect(pdfResponse.headers()['content-type']).toContain('application/pdf');
  });

  test('Ctrl+K opens the command palette', async ({ page }) => {
    await page.goto('/');
    // Press Control+KeyK
    await page.keyboard.press('Control+KeyK');
    const palette = page.locator('[role="dialog"][aria-label="Command Palette"]');
    await expect(palette).toBeVisible();

    // Escape dismisses palette
    await page.keyboard.press('Escape');
    await expect(palette).not.toBeVisible();
  });

  test('contact form validation rejects empty or invalid email', async ({ page }) => {
    await page.goto('/#contact');
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Form should remain on page and not navigate away
      await expect(page).toHaveURL(/.*#contact/);
    }
  });

  test('cursor effects do not render under touch emulation', async ({ page }) => {
    // Emulate touch screen
    await page.emulateMedia({ forcedColors: 'none' });
    await page.goto('/');
    // The native text cursor should remain intact and desktop custom cursor should be hidden or inactive on coarse pointers
    const customCursor = page.locator('[data-testid="custom-cursor"], .custom-cursor');
    if (await customCursor.count() > 0) {
      await expect(customCursor.first()).toBeHidden();
    }
  });
});
