import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { RestaurantsPage } from "../../../pages/restaurants.page";

test.describe("G3-UI-01, @C133", () => {
  test("Verify Madison, WI restaurant search", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("go to and verify home page", async () => {
      await homePage.goto();
    });

    await test.step("skip cookies banner if visible", async () => {
      await homePage.skipCookiesBannerIfVisible();
    });

    await test.step("fill search field and submit", async () => {
      await homePage.takeOutButton.click();
      await homePage.searchAddress("Madison WI");
      await expect(page.getByText(/^Madison, WI,/).first()).toBeVisible();
      await homePage.getFedButton.click();
    });
    const restaurantPage = new RestaurantsPage(page);

    await test.step("verify restaurant results", async () => {
      await restaurantPage.verifyUrl();
      await expect(
        page.getByRole("heading", {
          name: "Madison Restaurants That Deliver & Takeout",
        }),
      ).toBeVisible();
      
      await expect(restaurantPage.matchingHeader).toBeVisible();
    });
  });
});
