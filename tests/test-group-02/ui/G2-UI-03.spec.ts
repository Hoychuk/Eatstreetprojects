import { expect, test } from '@playwright/test';
import { HomePage } from '../../../pages/home.page';

test.describe('G2-UI-03 @C129', () => {
  test('Valid Location Search', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Go To and Verify Home Page", async () => {
      await homePage.goto();
    });

    await test.step("Skip Cookie Banner", async () => {
      await homePage.skipCookiesBannerIfVisible();
    });

    await test.step("Search and Submit Location", async () => {
      await homePage.searchAndSubmitLocation('Madison, WI', 'Madison, WI'); 
    });

    await test.step("Verify Restaurant Results", async () => {
      await expect(page).toHaveURL(/espPageNumber=1$/);
      await expect(page.getByRole("heading", { name: "Madison Restaurants That Deliver & Takeout" })).toBeVisible();
      await expect(page.getByText(/\d+ matching restaurants near you/)).toBeVisible();
    });
  });
});
