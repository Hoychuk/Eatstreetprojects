import { expect, test } from '@playwright/test';
import { HomePage } from './home-page';

test.describe('Group 2 UI', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.dismissCookiePopupIfVisible();
  });

  test('G2-UI-01: Delivery and Takeout Toggle', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.deliveryRadio).toBeVisible();
    await homePage.takeoutRadio.click();
    await expect(homePage.takeoutRadio).toBeVisible();
    await homePage.deliveryRadio.click();
    await expect(homePage.addressInput).toBeVisible();
  });

  test('G2-UI-02: Address Field Input', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.addressInput).toBeVisible();
    await homePage.addressInput.fill(homePage.madisonAddress);
    await expect(homePage.addressInput).toHaveValue(homePage.madisonAddress);
  });

  test('G2-UI-03: Valid Location Search', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.addressInput).toBeVisible();
    await homePage.searchMadison();
    await expect(page).toHaveURL(/\/restaurants\/search\?espPageNumber=1/);
  });
});
