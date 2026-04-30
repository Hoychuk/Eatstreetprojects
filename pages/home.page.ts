import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  public readonly homeUrl = "https://eatstreet.com/";
  public readonly cookiesButton: Locator;
  public readonly takeOutButton: Locator;
  public readonly addressField: Locator;
  public readonly getFedButton: Locator;
  public readonly deliveryRadio: Locator;
  public readonly takeoutRadio: Locator;
  public readonly suggesstionsBlock: Locator;

  constructor(private page: Page) {
    this.cookiesButton = page.locator(".cipa-overlay");
    this.takeOutButton = page.getByText("Takeout", { exact: true });
    this.addressField = page.getByRole("textbox", {name: "Enter Your Address",});
    this.getFedButton = page.getByText("Get Fed");
    this.deliveryRadio = page.getByText("Delivery", { exact: true });
    this.takeoutRadio = page.getByText("Takeout", { exact: true });
    this.suggesstionsBlock = page.locator("autocomplete ul");
  }

  async goto() {
    await this.page.goto(this.homeUrl);
    await expect(this.page).toHaveURL(this.homeUrl);
  }

  async skipCookiesBannerIfVisible() {
    if (await this.cookiesButton.isVisible().catch(() => false)) {
      await this.cookiesButton.click();
    }
  }

  async searchAddress(address: string) {
    await this.addressField.fill(address);
  }

  async searchAndSubmitLocation(searchString: string, location: string): Promise<void> {
    await this.searchAddress(searchString);
    await this.selectAddressSuggestion(location);
    await this.submitSearch();
  }

  async selectAddressSuggestion(suggestion: string): Promise<void> {
    await this.suggesstionsBlock.getByText(suggestion).first().click();
    return;
  }

  getFirstAddressSuggestion(suggestion: string): Locator {
    return this.suggesstionsBlock.getByText(suggestion).first();
  }

    await this.page.getByText(suggestion).first().click();
    return;
  }

  async submitSearch(): Promise<void> {
    await this.getFedButton.click();
  }
}
