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
  public readonly footer: Locator;
  public readonly footerEatStreetSection: Locator;
  public readonly footerSupportSection: Locator;
  public readonly footerLegalSection: Locator;
  public readonly footerGetTheAppSection: Locator;
  public readonly googlePlayBadgeLink: Locator;
  public readonly appStoreBadgeLink: Locator;
  public readonly logo: Locator;

  constructor(private page: Page) {
    this.cookiesButton = page.locator(".cipa-overlay");
    this.takeOutButton = page.getByText("Takeout", { exact: true });
    this.addressField = page.getByRole("textbox", {name: "Enter Your Address",});
    this.getFedButton = page.getByText("Get Fed");
    this.deliveryRadio = page.getByText("Delivery", { exact: true });
    this.takeoutRadio = page.getByText("Takeout", { exact: true });
    this.suggesstionsBlock = page.locator("autocomplete ul");
    this.footer = page.locator("footer, .es-footer").first();
    this.footerEatStreetSection = this.footer.getByRole("heading", {
      name: "EatStreet",
    });
    this.footerSupportSection = this.footer.getByRole("heading", {
      name: "Support",
    });
    this.footerLegalSection = this.footer.getByRole("heading", {
      name: "Legal",
    });
    this.footerGetTheAppSection = this.footer.getByRole("heading", {
      name: "Get the App",
    });
    this.googlePlayBadgeLink = this.footer.locator("a.app-btn-android").first();
    this.appStoreBadgeLink = this.footer.locator("a.app-btn-iphone").first();
    this.logo = page.getByRole('link', { name: /eatstreet logo/i });
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

  async submitSearch(): Promise<void> {
    await this.getFedButton.click();
  }

  async searchAndSubmitFromAutocomplete(address: string): Promise<void> {
    const madisonSuggestion = this.page.getByText(/Madison,\s*WI/i).first();
    await this.addressField.click();
    await this.addressField.fill("");
    await this.addressField.type(address, { delay: 35 });
    await expect(madisonSuggestion).toBeVisible({ timeout: 10000 });
    await madisonSuggestion.click();
    await this.submitSearch();
  }

  async verifyMadisonSearchAccepted(): Promise<void> {
    await expect(this.page).toHaveURL(/madison/i);
  }

  async scrollToFooter(): Promise<void> {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.footer).toBeVisible();
  }

  async verifyFooterSections(): Promise<void> {
    await expect(this.footerEatStreetSection).toBeVisible();
    await expect(this.footerSupportSection).toBeVisible();
    await expect(this.footerLegalSection).toBeVisible();
    await expect(this.footerGetTheAppSection).toBeVisible();
  }

  async scrollToGetTheApp(): Promise<void> {
    await this.footerGetTheAppSection.scrollIntoViewIfNeeded();
    await expect(this.footerGetTheAppSection).toBeVisible();
  }

  async verifyGooglePlayLink(): Promise<void> {
    await expect(this.googlePlayBadgeLink).toBeVisible();
    await expect(this.googlePlayBadgeLink).toHaveAttribute(
      "href",
      /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.eatstreet\.android(&hl=en)?/i,
    );
  }

  async verifyAppStoreLink(): Promise<void> {
    await expect(this.appStoreBadgeLink).toBeVisible();
    await expect(this.appStoreBadgeLink).toHaveAttribute(
      "href",
      /https:\/\/itunes\.apple\.com\/us\/app\/eatstreet-food-delivery-take-out-app\/id664697933\?mt=8/i,
    );
  }
  async verifyUrl() {
    await expect(this.page).toHaveURL(this.homeUrl);
  }
}
