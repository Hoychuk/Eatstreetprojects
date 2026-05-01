import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { RestaurantsPage } from "../../../pages/restaurants.page";

test.describe("G3-UI-02, @C135", () => {
  test("Verify Listing Filters", async ({ page }) => {
    let homePage = new HomePage(page);

    await test.step("go to home page", async () => {
      await homePage.goto();
    });

    await test.step("skip banner if visible", async () => {
      await homePage.skipCookiesBannerIfVisible();
    });

    await test.step("fill search field and submit", async () => {
      await homePage.takeOutButton.click();
      await homePage.searchAddress("Madison WI");
      await expect(page.getByText(/^Madison, WI,/).first()).toBeVisible();
      await homePage.getFedButton.click();
    });

    const restaurantPage = new RestaurantsPage(page);

    await test.step("Verify restaurants url", async () => {
      await restaurantPage.verifyUrl();
    });

    await test.step("Verify Open Now Toogle/Filter", async () => {
      await restaurantPage.clickAndVerifyOpenNowFilter();
    });

    await test.step("Verify Free Delivery Toogle/Filter", async () => {
      await restaurantPage.clickAndVerifyFreeDeliveryFilter();
    });

    await test.step("Verify Rating 4+ Toogle/Filter", async () => {
      await restaurantPage.clickAndVerifyRatingFourPlusFilter();
    });

    await test.step("Verify Order Ahead Toogle/Filter", async () => {
      await restaurantPage.clickAndVerifyOrderAheadFilter();
    });

    await test.step("Verify Specials Toogle/Filter", async () => {
      await restaurantPage.clickAndVerifySpecialsFilter();
    });
  });
});

