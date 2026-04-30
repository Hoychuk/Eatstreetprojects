import { Page, Locator } from "@playwright/test";

export class HomePage {
  public readonly homeUrl = "https://eatstreet.com/";
  public readonly cookiesButton: Locator;
  public readonly takeOutButton: Locator;
  public readonly addressField: Locator;
  public readonly getFedButton: Locator;

  constructor(private page: Page) {
    this.cookiesButton = page.locator(".cipa-overlay");
    this.takeOutButton = page.getByText("Takeout", { exact: true });
    this.addressField = page.getByRole("textbox", {
      name: "Enter Your Address",
    });
    this.getFedButton = page.getByText("Get Fed");
  }

  async goto() {
    await this.page.goto(this.homeUrl);
  }

  async skipCookiesBannerIfVisible() {
    if (await this.cookiesButton.isVisible().catch(() => false)) {
      await this.cookiesButton.click();
    }
  }

  async searchAddress(address: string) {
    await this.addressField.fill(address);
  }
}
