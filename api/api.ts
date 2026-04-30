import { APIRequestContext, APIResponse } from "@playwright/test";

export class API{
  readonly baseUrl = 'https://eatstreet.com';
  readonly warmAdressSearchCacheUrl = '/api/v2/warm-address-search-cache';
  readonly lookupPlaceIdUrl = '/api/v2/lookup-place-id'
  readonly geocodeUrl = '/api/v2/address/geocode'
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) { 
    this.request = request;
  }

  async getWarmAdressSearchCache(): Promise<APIResponse> {
    const formedUrl = `${this.baseUrl}/${this.warmAdressSearchCacheUrl}`;
    const response = this.request.get(formedUrl);
    return response;
  }
  
  async getlookupPlaceById(id: string): Promise<APIResponse> {
    const formedUrl = `${this.baseUrl}/${this.lookupPlaceIdUrl}/${id}`;
    const response = this.request.get(formedUrl);
    return response;
  }

  async getGeocode(adress: string) {
    const formedUrl = `${this.baseUrl}/${this.geocodeUrl}?address=${adress}`;
    const response = this.request.get(formedUrl);
    return response;
  }
}
