import { test, expect } from '@playwright/test';

test.describe('EatStreet - Header Navigation Validation', () => {

  test('Header navigation elements are visible on homepage', async ({ page, context }) => {

    await test.step('Setup - bypass cookie banner if needed', async () => {
      await context.addCookies([
        {
          name: 'OptanonAlertBoxClosed',
          value: 'true',
          domain: '.eatstreet.com',
          path: '/'
        }
      ]);
    });

    await test.step('Open EatStreet homepage', async () => {
      await page.goto('https://eatstreet.com/');
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify header navigation is visible', async () => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    await test.step('Verify "Partner with us" is visible in header', async () => {
      await expect(page.getByText('Partner with us')).toBeVisible();
    });

    await test.step('Verify "Sign In" is visible in header', async () => {
      await expect(page.getByText('Sign In')).toBeVisible();
    });

    await test.step('Verify "Cart" is visible in header', async () => {
      await expect(page.getByText('Cart')).toBeVisible();
    });

  });

});