import { expect, test } from '@playwright/test';
import { HomePage } from '../../../pages/home.page';

test.describe('G2-UI-01 @C126', () => {
  test('Delivery and Takeout Toggle', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Go To and Verify Home Page', async () => {
      await homePage.goto();
    });

    await test.step("Skip Cookie Banner", async () => {
      await homePage.skipCookiesBannerIfVisible();
    });
    
    await test.step("Check Delivery Button", async () => {
      await expect(homePage.deliveryRadio).toBeVisible();
      await homePage.takeoutRadio.click();
    });
    
    await test.step("Check Takout Button", async () => {
      await expect(homePage.takeoutRadio).toBeVisible();
      await homePage.deliveryRadio.click();
    });
    
    await test.step("Check Adress Field", async () => {
      await expect(homePage.addressField).toBeVisible();
    })
  });
});
