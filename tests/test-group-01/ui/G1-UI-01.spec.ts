import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/home.page';

test.describe('G1-UI-01 @C120 EatStreet Homepage - Smoke', () => {

  let homePage: HomePage;

  test.beforeEach(async ({ context, page }) => {

    homePage = new HomePage(page);

    await test.step('Set cookies to bypass banner', async () => {
      await context.addCookies([
        {
          name: 'OptanonAlertBoxClosed',
          value: 'true',
          domain: '.eatstreet.com',
          path: '/',
        },
        {
          name: 'OptanonConsent',
          value: 'isIABGlobal=false',
          domain: '.eatstreet.com',
          path: '/',
        },
      ]);
    });

    await test.step('Open homepage', async () => {
      await homePage.goto();
      await homePage.skipCookiesBannerIfVisible();
    });

  });

  test('Validate homepage loads and main UI elements are visible', async () => {

    await test.step('Verify URL', async () => {
      await homePage.verifyUrl();
    });

    await test.step('Verify logo is visible', async () => {
      await expect(homePage.logo).toBeVisible();
    });

    await test.step('Verify address input field', async () => {
      await expect(homePage.addressField).toBeVisible();
      await expect(homePage.addressField).toBeEnabled();
    });

    await test.step('Verify Takeout option', async () => {
      await expect(homePage.takeoutRadio).toBeVisible();
    });

    await test.step('Verify Delivery option', async () => {
      await expect(homePage.deliveryRadio).toBeVisible();
    });

    await test.step('Verify Get Fed button', async () => {
      await expect(homePage.getFedButton).toBeVisible();
      await expect(homePage.getFedButton).toBeEnabled();
    });

  });

});