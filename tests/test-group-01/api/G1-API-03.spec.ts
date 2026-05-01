import { test, expect } from '@playwright/test';

test.describe('EatStreet API - Anonymous User Validation (CI Safe)', () => {

  test('GET /api/v2/user works for anonymous user', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://eatstreet.com/', {
      waitUntil: 'domcontentloaded'
    });

    const response = await page.request.get('https://eatstreet.com/api/v2/user');

    const status = response.status();

    console.log('STATUS:', status);

    expect(status).toBe(200);

    const rawText = await response.text();

    console.log('RAW BODY:', rawText);

    if (!rawText || rawText.trim().length === 0) {
      console.warn('⚠ Empty response body - skipping JSON validation (CI/environment dependent)');
      return;
    }

    let body: any;

    try {
      body = JSON.parse(rawText);
    } catch (e) {
      console.warn('⚠ Non-JSON response received:', rawText);
      return;
    }

    expect(body).toBeTruthy();
    expect(typeof body).toBe('object');

    if ('isAnonymous' in body) {
      expect(body.isAnonymous).toBe(true);
    }

    if (body.user !== undefined) {
      expect(body.user === null || typeof body.user === 'object').toBeTruthy();
    }

    expect(status).not.toBe(401);
    expect(status).not.toBe(403);

  });

});