import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { RestaurantsPage } from "../../../pages/restaurants.page";

test.describe("G3-UI-03, @C134", () => {
  test("Verify buttons Prev/Next in restaurants page", async ({ page }) => {
    let homePage = new HomePage(page);

    await test.step("go to home page", async () => {
      await homePage.goto();
    });

    await test.step("skip banner if visible", async () => {
      await homePage.skipCookiesBannerIfVisible();
    });

    await test.step("fill search field and submit", async () => {
      await homePage.searchAddress("Madison WI");
      await expect(page.getByText(/^Madison, WI,/).first()).toBeVisible();
      await homePage.getFedButton.click();
    });

    const restaurantPage = new RestaurantsPage(page);

    await test.step("Verify restaurants url", async () => {
      await restaurantPage.verifyUrl();
    });

    await test.step("Verify Next button", async () => {
      await restaurantPage.verifyNextButton();
    });

    await test.step("Verify Prev button", async () => {
      await restaurantPage.verifyPrevButton();
    });
  });
});
