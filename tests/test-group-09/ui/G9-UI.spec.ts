import { test } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";

test.describe("Group 9 UI - Footer and Public Links", () => {
  test("G9-UI-01, @C170 - Footer Link Sections", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Open https://eatstreet.com/.", async () => {
      await homePage.goto();
    });

    await test.step("Scroll to footer.", async () => {
      await homePage.skipCookiesBannerIfVisible();
      await homePage.scrollToFooter();
    });

    await test.step("Verify sections EatStreet, Support, Legal, and Get the App.", async () => {
      await homePage.verifyFooterSections();
    });
  });

  test("G9-UI-02, @C171 - App Store Links", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Open https://eatstreet.com/.", async () => {
      await homePage.goto();
      await homePage.skipCookiesBannerIfVisible();
    });

    await test.step("Scroll to Get the App.", async () => {
      await homePage.scrollToGetTheApp();
    });

    await test.step("Verify Get app in Google Play.", async () => {
      await homePage.verifyGooglePlayLink();
    });

    await test.step("Verify Get app in App Store.", async () => {
      await homePage.verifyAppStoreLink();
    });
  });
});

test.describe("Group 8 UI - Invalid and Edge-Case Search", () => {
  test("G8-UI-03, @C164 - Whitespace and Case Handling", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Search for madison, wi.", async () => {
      await homePage.goto();
      await homePage.skipCookiesBannerIfVisible();
      await homePage.searchAndSubmitFromAutocomplete("madison, wi");
      await homePage.verifyMadisonSearchAccepted();
    });

    await test.step("Search for MADISON, WI.", async () => {
      await homePage.goto();
      await homePage.skipCookiesBannerIfVisible();
      await homePage.searchAndSubmitFromAutocomplete("MADISON, WI");
      await homePage.verifyMadisonSearchAccepted();
    });

    await test.step("Search for   Madison, WI  .", async () => {
      await homePage.goto();
      await homePage.skipCookiesBannerIfVisible();
      await homePage.searchAndSubmitFromAutocomplete("   Madison, WI  ");
      await homePage.verifyMadisonSearchAccepted();
    });
  });
});
