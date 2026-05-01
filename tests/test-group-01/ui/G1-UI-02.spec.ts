import { test, expect } from '@playwright/test';

test.describe('EatStreet - Header Navigation Validation (stable)', () => {

  test('Navigation elements are visible on homepage', async ({ page, context }) => {

    await test.step('Bypass cookie banner (best effort)', async () => {
      await context.addCookies([
        {
          name: 'OptanonAlertBoxClosed',
          value: 'true',
          domain: '.eatstreet.com',
          path: '/'
        }
      ]);
    });

    await test.step('Open homepage', async () => {
      await page.goto('https://eatstreet.com/', {
        waitUntil: 'networkidle'
      });
    });

    await test.step('Verify page is rendered', async () => {
      await expect(page.locator('body')).toBeVisible();
    });

    await test.step('Debug fallback: check page variant', async () => {
      const html = await page.content();

      // якщо раптом інший layout / редірект / bot page
      if (!html.includes('eatstreet') && !html.includes('EatStreet')) {
        await page.screenshot({ path: 'debug-eatstreet.png', fullPage: true });
        throw new Error('Unexpected page variant or redirect detected');
      }
    });

    await test.step('Validate navigation elements (robust approach)', async () => {

      // Partner with us (може бути link або button)
      const partner = page
        .getByRole('link', { name: /partner/i })
        .or(page.getByRole('button', { name: /partner/i }));

      // Sign In / Login fallback
      const signIn = page
        .getByRole('link', { name: /sign in|login/i })
        .or(page.getByRole('button', { name: /sign in|login/i }));

      // Cart is often icon-based
      const cart = page.locator(
        '[aria-label*="cart" i], [data-testid*="cart" i], .cart, svg'
      );

      await expect(partner.first()).toBeVisible({ timeout: 15000 });
      await expect(signIn.first()).toBeVisible({ timeout: 15000 });

      // cart is sometimes icon-only → just check existence
      await expect(cart.first()).toBeVisible({ timeout: 15000 });
    });

  });

});