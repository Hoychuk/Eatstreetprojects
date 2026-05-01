import { test, expect } from '@playwright/test';

test.describe('G1-UI-03 @C122 EatStreet - Homepage Marketing Content Validation', () => {

  test('Marketing sections are displayed correctly', async ({ page, context }) => {

    await test.step('Bypass cookie banner (if present)', async () => {
      await context.addCookies([{
        name: 'OptanonAlertBoxClosed',
        value: 'true',
        domain: '.eatstreet.com',
        path: '/'
      }]);
    });

    await test.step('Open homepage', async () => {
      await page.goto('https://eatstreet.com/', {
        waitUntil: 'domcontentloaded'
      });

      await expect(page).toHaveURL(/eatstreet\.com/);
    });

    await test.step('Verify main marketing headline', async () => {
      const headline = page.locator('h1, h2', {
        hasText: 'EatStreet is the Smartest Way to Order Food Online'
      });

      await expect(headline).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify marketing sections', async () => {

      const signUpRestaurant = page.locator('text=Sign Up Your Restaurant');
      const joinOurTeam = page.locator('text=Join Our Team');
      const downloadApp = page.locator('text=Download The App');

      await expect(signUpRestaurant).toBeVisible();
      await expect(joinOurTeam).toBeVisible();
      await expect(downloadApp).toBeVisible();

    });

    await test.step('Verify page is not broken / empty', async () => {

      await expect(page.locator('body')).toBeVisible();

      await expect.poll(async () => {
        return (await page.locator('body').innerText()).length;
      }).toBeGreaterThan(300);

    });

  });

});