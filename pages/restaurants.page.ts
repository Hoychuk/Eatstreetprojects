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
}
