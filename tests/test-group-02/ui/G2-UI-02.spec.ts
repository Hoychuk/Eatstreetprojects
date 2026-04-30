import { expect, test } from '@playwright/test';
import { HomePage } from '../../../pages/home.page';

test.describe('G2-UI-02 @C127', () => {
  test('Address Field Input', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Open Home Page', async () => {
      homePage.goto();
    });

    await test.step('Skip Cookies Banner', async () => {
      homePage.skipCookiesBannerIfVisible();
    });

    await test.step('Fill Address', async () => {
      await homePage.addressField.fill('Madison, WI');
    });

    await test.step('SuggestionsAreVisible', async () => {
      await expect(homePage.suggesstionsBlock).toBeVisible();
    });

    await test.step('Matching Suggestion Is Displayed', async () => {
      await expect(homePage.getFirstAddressSuggestion('Madison, WI')).toBeVisible();
    })  
  });
});
