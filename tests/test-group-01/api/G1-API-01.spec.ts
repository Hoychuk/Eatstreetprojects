import { test, expect, request } from '@playwright/test';

test.describe('G1-API-01 @C123 EatStreet API - Order Session Info', () => {

  const baseUrl = 'https://eatstreet.com';

  test('GET /api/v2/order-session-info returns 200 and no payment data', async () => {

    const apiContext = await request.newContext({
      baseURL: baseUrl,
    });

    const response = await apiContext.get('/api/v2/order-session-info');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toBeTruthy();

    const bodyString = JSON.stringify(body).toLowerCase();

    expect(bodyString).not.toContain('card');
    expect(bodyString).not.toContain('payment');
    expect(bodyString).not.toContain('cvv');
    expect(bodyString).not.toContain('credit');
    expect(bodyString).not.toContain('billing');

  });

});