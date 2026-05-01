import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/G1home.page';

test.describe('EatStreet Homepage - Smoke', ()  => {

  let homePage: HomePage;

  test.beforeEach(async ({ context, page }) => {

    homePage = new HomePage(page);

    await test.step('Set cookies to bypass banner', async () => {
      await context.addCookies([
        {
          name: 'OptanonAlertBoxClosed',
          value: 'true',
          domain: '.eatstreet.com',
          path: '/'
        },
        {
          name: 'OptanonConsent',
          value: 'isIABGlobal=false',
          domain: '.eatstreet.com',
          path: '/'
        }
      ]);
    });

    await test.step('Open EatStreet homepage', async () => {
      await page.goto('https://eatstreet.com/');
    });

  });

  test('Validate homepage loads and UI elements are visible', async ({ page }) => {

    await test.step('Verify homepage URL', async () => {
      await expect(page).toHaveURL('https://eatstreet.com/');
    });

    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Order Food Online Near You \| EatStreet\.com/);
    });

    await test.step('Verify EatStreet logo is visible', async () => {
      await expect(page.locator('img[alt*="EatStreet"]')).toBeVisible();
    });

    await test.step('Verify address input field', async () => {
      const addressInput = page.getByPlaceholder(/Enter your address/i);
      await expect(addressInput).toBeVisible();
      await expect(addressInput).toBeEnabled();
    });

    await test.step('Verify Delivery and Takeout options', async () => {
      await expect(page.getByText('Delivery')).toBeVisible();
      await expect(page.getByText('Takeout')).toBeVisible();
    });

    await test.step('Verify Use my location option', async () => {
      await expect(page.getByText(/Use my location/i)).toBeVisible();
    });

    await test.step('Verify Get Fed button', async () => {
      const getFedBtn = page.getByRole('button', { name: /Get Fed/i });
      await expect(getFedBtn).toBeVisible();
      await expect(getFedBtn).toBeEnabled();
    });

  });

});