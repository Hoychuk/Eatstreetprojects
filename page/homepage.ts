import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly cartButton: Locator;
  readonly deliveryButton: Locator;
  readonly takeoutButton: Locator;
  readonly addressInput: Locator;
  readonly getFedButton: Locator;
 readonly gotItButton: Locator;
  readonly SignInorSignUP: Locator;
  readonly userflow: Locator;
  constructor(page: Page) {
    this.page = page;

    this.signInButton = page.getByRole('button', { name: 'Sign In' }).first();
    this.cartButton = page.getByRole('button', { name: 'Cart' }).first();

    this.deliveryButton = page.getByRole('button', { name: /Delivery/i });
    this.takeoutButton = page.getByRole('button', { name: /Takeout/i });
 this.gotItButton = page.getByRole('button', { name: /Got it/i });
    this.addressInput = page.getByPlaceholder(/Enter Your Address/i);
    this.getFedButton = page.getByRole('button', { name: /Get Fed/i });
    this.SignInorSignUP=page.getByText('Sign Up or Sign In');
    this.userflow=page.locator('#main_content #accounts-frontend').contentFrame().getByRole('textbox', { name: 'Email Address' });
  }

  async open() {
    await this.page.goto('https://eatstreet.com/');
    await this.addressInput.waitFor();
     await this.closeCookiesIfVisible();
  }
async closeCookiesIfVisible() {
    if (await this.gotItButton.isVisible().catch(() => false)) {
      await this.gotItButton.click();
    }
  }
  async selectDelivery() {
    await this.deliveryButton.click();
  }

  async selectTakeout() {
    await this.takeoutButton.click();
  }

  async enterAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async clickGetFed() {
    await this.getFedButton.click();
  }

  async searchFoodByAddress(address: string) {
    await this.enterAddress(address);
    await this.clickGetFed();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async openSignIn() {
    await this.signInButton.click();
  }
  async openSignInorSignUP() {
   expect(this.SignInorSignUP).toBeVisible();
    expect(this.userflow).toBeVisible();
  }
}
