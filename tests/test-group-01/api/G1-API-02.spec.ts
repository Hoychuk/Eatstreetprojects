import { test, expect } from '@playwright/test';

test.describe(' G1-API-02 @C125 EatStreet API - Locale Alerts', () => {

  const baseUrl = 'https://eatstreet.com';

  test('GET /api/v2/locale-alerts should return 200 and valid payload', async ({ request }) => {

    const response = await request.get(`${baseUrl}/api/v2/locale-alerts`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toBeTruthy();

    expect(body).toHaveProperty('alerts');

    expect(Array.isArray(body.alerts)).toBeTruthy();

    if (body.alerts.length > 0) {
      for (const alert of body.alerts) {
        expect(alert).toHaveProperty('id');
        expect(alert).toHaveProperty('message');

        if (alert.startDate) {
          expect(typeof alert.startDate).toBe('string');
        }
        if (alert.endDate) {
          expect(typeof alert.endDate).toBe('string');
        }
      }
    }

    expect(body.alerts).not.toBeNull();

  });

});