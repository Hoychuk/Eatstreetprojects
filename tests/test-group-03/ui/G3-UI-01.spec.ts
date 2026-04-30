import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";

test.describe("G3-UI-01, @C133", () => {
  test("Verify Madison, WI restaurant search", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("go to and verify home page", async () => {
      await homePage.goto();
      await expect(page).toHaveURL(homePage.homeUrl);
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

    await test.step("verify restaurant results", async () => {
      await expect(page).toHaveURL(/espPageNumber=1$/);

      await expect(
        page.getByRole("heading", {
          name: "Madison Restaurants That Deliver & Takeout",
        }),
      ).toBeVisible();
      await expect(
        page.getByText(/\d+ matching restaurants near you/),
      ).toBeVisible();
    });
  });
});
