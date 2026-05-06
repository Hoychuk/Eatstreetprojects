import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.page';

test.describe('G1-UI-03 @C122 EatStreet - Homepage Marketing Validation', () => {

  test('Marketing sections are displayed correctly', async ({ page }) => {

    const home = new HomePage(page);

    await test.step('Open homepage', async () => {
      await home.goto();
    });

    await test.step('Handle cookies if present', async () => {
      await home.skipCookiesBannerIfVisible();
    });

    await test.step('Verify main page loaded correctly', async () => {
      await expect(page.getByRole('navigation')).toBeVisible();
      await expect(page.locator('footer, .es-footer').first()).toBeVisible();
    });

    await test.step('Verify marketing headline', async () => {
      const headline = page.locator('h1, h2').filter({
        hasText: 'EatStreet'
      });

      await expect(headline.first()).toBeVisible();
    });

    await test.step('Verify marketing sections', async () => {

      await expect(page.getByText('Sign Up Your Restaurant')).toBeVisible();
      await expect(page.getByText('Join Our Team')).toBeVisible();
      await expect(page.getByText('Download The App')).toBeVisible();

    });

    await test.step('Verify footer structure using POM', async () => {
      await home.scrollToFooter();
      await home.verifyFooterSections();
    });

  });

});