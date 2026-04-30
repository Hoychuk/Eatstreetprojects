import { expect, test } from '@playwright/test';

const baseUrl = 'https://eatstreet.com';
const placeId = 'ChIJ7cv00DwsDogRAMDACa2m4K8';
const geocodeAddress = 'Madison,+WI';

type JsonValue = Record<string, unknown> | null;

const parseJson = async (response: { json: () => Promise<unknown> }): Promise<JsonValue> => {
  try {
    const body = await response.json();
    return body && typeof body === 'object' ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
};

const getRoute = async (request: { get: (url: string) => Promise<unknown> }, route: string) =>
  request.get(`${baseUrl}${route}`) as Promise<{ status: () => number; json: () => Promise<unknown> }>;

test.describe('Group 2 API', () => {
  test(
    'G2-API-01: GET /api/v2/warm-address-search-cache - Warm Address Search Cache',
    async ({ request }) => {
      const response = await getRoute(request, '/api/v2/warm-address-search-cache');
      expect(response.status()).toBe(200);
      const body = await parseJson(response);
      expect(body).not.toBeNull();
    }
  );

  test(
    'G2-API-02: GET /api/v2/lookup-place-id/{placeId} - Place ID Lookup',
    async ({ request }) => {
      const response = await getRoute(request, `/api/v2/lookup-place-id/${placeId}`);
      expect(response.status()).toBe(200);
      const body = await parseJson(response);
      expect(body).not.toBeNull();
    }
  );

  test(
    'G2-API-03: GET /api/v2/address/geocode - Address Geocode',
    async ({ request }) => {
      const response = await getRoute(request, `/api/v2/address/geocode?address=${geocodeAddress}`);
      expect(response.status()).toBe(200);
      const body = await parseJson(response);
      expect(body).not.toBeNull();
    }
  );
});
