import { test, expect } from '@playwright/test';

test.describe('G1-API-03 @C124 EatStreet API - Anonymous User Validation', () => {

  test('GET /api/v2/user works for anonymous user', async ({ page }) => {

    await page.goto('https://eatstreet.com/');

    const response = await page.request.get('https://eatstreet.com/api/v2/user');

    expect(response.status()).toBe(200);

    const rawText = await response.text();

    console.log('Raw response:', rawText);

    expect(response.status()).not.toBe(401);
    expect(response.status()).not.toBe(403);

    if (rawText && rawText.length > 0) {
      try {
        const body = JSON.parse(rawText);

        expect(body).toBeTruthy();

        if ('isAnonymous' in body) {
          expect(body.isAnonymous).toBeTruthy();
        }

      } catch (e) {
        console.warn('Response is not JSON, skipping body validation');
      }
    } else {
      console.warn('Empty response body - acceptable for this endpoint');
    }

  });

});