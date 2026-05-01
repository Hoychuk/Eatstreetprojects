import { test } from "@playwright/test";
import { RestaurantsPage } from "../../../pages/restaurants.page";

const amberIndianCuisineUrl =
  "https://eatstreet.com/madison-wi/restaurants/amber-indian-cuisine";

test.describe("G4-UI-03, @C140", () => {
  test("Verify menu item visibility", async ({ page }) => {
    const restaurantPage = new RestaurantsPage(page);

    await test.step("open amber indian cuisine page", async () => {
      await restaurantPage.gotoAmberIndianCuisine(amberIndianCuisineUrl);
    });

    await test.step("skip cookie banner if visible", async () => {
      await restaurantPage.skipCookiesBannerIfVisible();
    });

    await test.step("verify popular items and vegetable samosa with price", async () => {
      await restaurantPage.verifyPopularItemsAndVegetableSamosa();
    });
  });
});
