import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homeUrl = 'https://eatstreet.com/';
  readonly madisonAddress = 'Madison, WI';
  readonly deliveryRadio: Locator;
  readonly takeoutRadio: Locator;
  readonly addressInput: Locator;
  readonly madisonSuggestion: Locator;
  readonly optOutButtonByRole: Locator;
  readonly addressPopupOverlay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliveryRadio = this.page.getByText('Delivery', { exact: true }).first();
    this.takeoutRadio = this.page.getByText('Takeout', { exact: true }).first();
    this.addressInput = this.page.getByRole('textbox', { name: 'Enter Your Address' }).first();
    this.madisonSuggestion = this.page.getByText('Madison, WI, USA').first();
    this.optOutButtonByRole = this.page.getByRole('button', { name: /^Opt Out$/i }).first();
    this.addressPopupOverlay = this.page.locator('#no-address-modal .modal-overlay').first();
  }

  async open(): Promise<void> {
    await this.page.goto(this.homeUrl);
  }

  async dismissCookiePopupIfVisible(): Promise<void> {
    if (await this.optOutButtonByRole.isVisible().catch(() => false)) {
      await this.optOutButtonByRole.click({ force: true });
    }
    return;
  }

  async selectAddressSuggestion(): Promise<void> {
      await this.madisonSuggestion.click();
      return;
  }

  async closeAddressPopupIfVisible(): Promise<void> {
    if (await this.addressPopupOverlay.isVisible().catch(() => false)) {
      await this.addressPopupOverlay.click({ force: true });
    }
  }

  async submitSearch(): Promise<void> {
    await this.addressInput.press('Enter');
  }

  async searchMadison(): Promise<void> {
    await this.addressInput.fill(this.madisonAddress);
    await this.selectAddressSuggestion();
    await this.submitSearch();
  }
}
