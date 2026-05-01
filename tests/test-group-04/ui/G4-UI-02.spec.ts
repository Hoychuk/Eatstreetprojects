import { test } from "@playwright/test";
import { RestaurantsPage } from "../../../pages/restaurants.page";

const amberIndianCuisineUrl =
  "https://eatstreet.com/madison-wi/restaurants/amber-indian-cuisine";

test.describe("G4-UI-02, @C139", () => {
  test("Verify menu, reviews, and hours tabs", async ({ page }) => {
    const restaurantPage = new RestaurantsPage(page);

    await test.step("open amber indian cuisine page", async () => {
      await restaurantPage.gotoAmberIndianCuisine(amberIndianCuisineUrl);
    });

    await test.step("skip cookie banner if visible", async () => {
      await restaurantPage.skipCookiesBannerIfVisible();
    });

    await test.step("verify menu, reviews and hours tabs are visible", async () => {
      await restaurantPage.verifyMenuReviewsAndHoursTabsVisible();
    });

    await test.step("open reviews and verify content", async () => {
      await restaurantPage.openReviewsTab();
      await restaurantPage.verifyReviewsContentOrNoReviewsYet();
    });

    await test.step("open hours tab", async () => {
      await restaurantPage.openHoursTab();
    });
  });
});
