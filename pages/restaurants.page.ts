import { expect, Locator, Page } from "@playwright/test";

export class RestaurantsPage {
  public readonly openNowToggle: Locator;
  public readonly freeDeliveryToggle: Locator;
  public readonly ratingFourPlusToggle: Locator;
  public readonly orderAheadToggle: Locator;
  public readonly specialsToggle: Locator;
  public readonly matchingHeader: Locator;
  public readonly openNowFilter: Locator;
  public readonly freeDeliveryFilter: Locator;
  public readonly ratingFourPlusFilter: Locator;
  public readonly orderAheadFilter: Locator;
  public readonly specialsFilter: Locator;
  public readonly prevButton: Locator;
  public readonly nextButton: Locator;
  public readonly cookiesButton: Locator;
  public readonly restaurantNameHeading: Locator;
  public readonly restaurantAddress: Locator;
  public readonly menuTab: Locator;
  public readonly reviewsTab: Locator;
  public readonly hoursTab: Locator;
  public readonly noReviewsYetText: Locator;
  public readonly popularItemsHeading: Locator;
  public readonly vegetableSamosaItem: Locator;
  public readonly vegetableSamosaPrice: Locator;

  constructor(private page: Page) {
    this.matchingHeader = page.getByText("matching restaurants near you");
    this.openNowToggle = page.getByText("Open Now");
    this.freeDeliveryToggle = page.getByText("Free Delivery", { exact: true });
    this.ratingFourPlusToggle = page.getByText("Rating 4+");
    this.orderAheadToggle = page
      .locator("list-sidebar")
      .getByText("Order Ahead");
    this.specialsToggle = page.locator("list-sidebar").getByText("Specials");
    this.openNowFilter = page.locator("#filters").getByText("Open Now");
    this.freeDeliveryFilter = page
      .locator("#filters")
      .getByText("Free Delivery");
    this.ratingFourPlusFilter = page.locator("#filters").getByText("Rating 4+");
    this.orderAheadFilter = page.locator("#filters").getByText("Order Ahead");
    this.specialsFilter = page.locator("#filters").getByText("Specials");
    this.prevButton = page.getByRole("button", { name: "Prev" });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.cookiesButton = page.locator(".cipa-overlay");
    this.restaurantNameHeading = page.getByRole("heading", {
      name: "Amber Indian Cuisine",
      exact: true,
    });
    this.restaurantAddress = page.getByText(
      "6913 University Ave Middleton WI, 53562",
      { exact: true },
    );
    this.menuTab = page.getByRole("radio", { name: "Menu" });
    this.reviewsTab = page.getByRole("radio", { name: "Reviews" });
    this.hoursTab = page.getByRole("radio", { name: "Hours" });
    this.noReviewsYetText = page.getByText(/No reviews yet\.?/i);
    this.popularItemsHeading = page.getByText("Popular Items", { exact: true });
    this.vegetableSamosaItem = page
      .locator("product")
      .filter({ hasText: "1. Vegetable Samosa (2 Pieces)" })
      .first();
    this.vegetableSamosaPrice = this.vegetableSamosaItem
      .locator(".food-price")
      .first();
  }

  async verifyUrl() {
    await expect(this.page).toHaveURL(/espPageNumber=1$/);
  }

  async clickAndVerifyOpenNowFilter() {
    await this.openNowToggle.click();
    await expect(this.openNowFilter).toBeVisible();
  }

  async clickAndVerifyFreeDeliveryFilter() {
    await this.freeDeliveryToggle.click();
    await expect(this.freeDeliveryFilter).toBeVisible();
  }

  async clickAndVerifyRatingFourPlusFilter() {
    await this.ratingFourPlusToggle.click();
    await expect(this.ratingFourPlusFilter).toBeVisible();
  }

  async clickAndVerifyOrderAheadFilter() {
    await this.orderAheadToggle.click();
    await expect(this.orderAheadFilter).toBeVisible();
  }

  async clickAndVerifySpecialsFilter() {
    await this.specialsToggle.click();
    await expect(this.specialsFilter).toBeVisible();
  }

  async verifyNextButton(){
    await expect(this.nextButton).toBeEnabled();
    await expect(this.nextButton).toBeVisible();
  }

  async verifyPrevButton(){
    await expect(this.prevButton).toBeEnabled();
    await expect(this.prevButton).toBeVisible();
  }

  async gotoAmberIndianCuisine(url: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
  }

  async skipCookiesBannerIfVisible() {
    if (await this.cookiesButton.isVisible().catch(() => false)) {
      await this.cookiesButton.click();
    }
  }

  async verifyRestaurantDetailHeader() {
    await expect(this.restaurantNameHeading).toBeVisible();
    await expect(this.restaurantAddress).toBeVisible();
  }

  async verifyMenuReviewsAndHoursTabsVisible() {
    await expect(this.menuTab).toBeVisible();
    await expect(this.reviewsTab).toBeVisible();
    await expect(this.hoursTab).toBeVisible();
  }

  async openReviewsTab() {
    await this.reviewsTab.click();
  }

  async openHoursTab() {
    await this.hoursTab.click();
  }

  async verifyReviewsContentOrNoReviewsYet() {
    const ratingScore = this.page.locator('[class*="rating"]').first();
    const reviewCard = this.page.locator('[class*="review"]').first();

    if (await this.noReviewsYetText.isVisible().catch(() => false)) {
      await expect(this.noReviewsYetText).toBeVisible();
      return;
    }

    await expect(reviewCard.or(ratingScore)).toBeVisible();
  }

  async verifyPopularItemsAndVegetableSamosa() {
    await expect(this.popularItemsHeading).toBeVisible();
    await expect(this.vegetableSamosaItem).toBeVisible();
    await expect(this.vegetableSamosaPrice).toBeVisible();
  }
}
