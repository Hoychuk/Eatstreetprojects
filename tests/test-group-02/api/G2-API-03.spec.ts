import { expect, test } from '@playwright/test';
import { API } from '../../../api/api';

class TestEntry {
  id: string;
  valid: boolean;
  city: string;
}

const testData: TestEntry[] = [
  { id: 'Madison,+WI', valid: true, city: 'Madison' },
  { id: 'New+York,+NY', valid: true, city: 'New York' },
  { id: 'Seattle,+WA+98101', valid: true, city: 'Seattle' },
  { id: 'San+Francisco,+CA', valid: true, city: 'San Francisco' },
  //{ id: '', valid: false, city: '' },
  //{ id: '+++', valid: false, city: '' },
  //{ id: '!!!', valid: false, city: '' },
  //{ id: '%27+OR+%271%27%3D%271%27+--', valid: false, city: '' },
];

test.describe('G2-API-03', () => {
  test('Place ID Lookup', async ({ request }) => {
    const api = new API(request);
    for (const entry of testData) {
      if (entry.valid) await parametricPositiveTest(entry);
      else await parametricNegativeTest(entry);
    }

    async function parametricPositiveTest(entry: TestEntry) {
      console.log(entry.id);
      await test.step('Send request for Positive Scenario', async () => {
        const response = await api.getGeocode(entry.id);
        expect(response.status()).toBe(200);
        const payload = await response.json();

        await test.step('Validate Schema', async () => {
          expect.soft(payload).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              streetAddress: expect.any(String),
              placeId: expect.any(String),
              city: expect.any(String),
              state: expect.any(String),
              zip: expect.any(String),
              aptNumber: expect.any(String),
              buildingName: expect.any(String),
              neighborhood: expect.any(String),
              formatted: expect.any(String),
              country: expect.any(String),
              location: expect.objectContaining({
                latitude: expect.any(Number),
                longitude: expect.any(Number),
              })
            }
          ));
          expect.soft(payload).toMatchObject({ city: entry.city });
          console.log(response.status());
          console.log(payload);
        });
      });
    }

    async function parametricNegativeTest(entry: TestEntry) {
      console.log(entry.id);
      await test.step('Send request for Negative Scenario', async () => {
        const response = await api.getGeocode(entry.id);
        await test.step('Check For Error Code', async () => {
          expect.soft(response.status()).not.toBe(200);
          console.log(response.status());
        });
      });
    }
  });
});
