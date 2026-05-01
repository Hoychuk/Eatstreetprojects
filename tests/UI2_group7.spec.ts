import { test, expect } from '@playwright/test';
import { HomePage } from '../page/homepage';

test('G7-UI-02: Sign-In Element Availability', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
    await homePage.closeCookiesIfVisible();
  await homePage.openSignIn();
    await homePage.openSignInorSignUP();
  

});