import { test, expect } from '@playwright/test';

test.describe('EatStreet - Homepage Marketing Content Validation', () => {

  test('Marketing sections are displayed correctly', async ({ page, context }) => {

    // =========================
    // STEP 0: Setup (cookie bypass)
    // =========================
    await test.step('Bypass cookie banner (if present)', async () => {
      await context.addCookies([
        {
          name: 'OptanonAlertBoxClosed',
          value: 'true',
          domain: '.eatstreet.com',
          path: '/'
        }
      ]);
    });

    // =========================
    // STEP 1: Open homepage
    // =========================
    await test.step('Open EatStreet homepage', async () => {
      await page.goto('https://eatstreet.com/');
      await page.waitForLoadState('domcontentloaded');
    });

    // =========================
    // STEP 2: Verify main marketing headline
    // =========================
    await test.step('Verify main marketing headline is displayed', async () => {
      const headline = page.getByText('EatStreet is the Smartest Way to Order Food Online');

      await expect(headline).toBeVisible();
    });

    // =========================
    // STEP 3: Verify marketing sections
    // =========================
    await test.step('Verify marketing sections are displayed', async () => {

      const signUpRestaurant = page.getByText('Sign Up Your Restaurant');
      const joinOurTeam = page.getByText('Join Our Team');
      const downloadApp = page.getByText('Download The App');

      await expect(signUpRestaurant).toBeVisible();
      await expect(joinOurTeam).toBeVisible();
      await expect(downloadApp).toBeVisible();

    });

    // =========================
    // STEP 4: Validate no broken UI blocks
    // =========================
    await test.step('Verify page has no empty or broken content blocks', async () => {

      const body = page.locator('body');
      await expect(body).toBeVisible();

      // Basic integrity check (page is not blank)
      const allText = await page.locator('body').innerText();
      expect(allText.length).toBeGreaterThan(100);

    });

  });

});