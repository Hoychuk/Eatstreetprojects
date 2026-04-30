import { APIRequestContext, APIResponse } from "@playwright/test";

export class API{
  readonly baseUrl = 'https://eatstreet.com';
  readonly warmAdressSearchCacheUrl = '/api/v2/warm-address-search-cache';
  readonly lookupPlaceIdUrl = '/api/v2/lookup-place-id'
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) { 
    this.request = request;
  }

  async getWarmAdressSearchCache(): Promise<APIResponse> {
    const response = this.request.get(`${this.baseUrl}/${this.warmAdressSearchCacheUrl}`);
    return response;
  }
  async getlookupPlaceById(id: string): Promise<APIResponse> {
    const response = this.request.get(`${this.baseUrl}/${this.lookupPlaceIdUrl}/${id}`);
    return response;
  }
}