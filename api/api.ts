import { APIRequestContext, APIResponse } from "@playwright/test";

export class API{
  readonly baseUrl = 'https://eatstreet.com'
  readonly warmAdressSearchCacheUrl = '/api/v2/warm-address-search-cache'
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) { 
    this.request = request;
  }

  async getWarmAdressSearchCache(): Promise<APIResponse> {
    const response = this.request.get(this.formURL(this.warmAdressSearchCacheUrl));
    return response;
  }

  private formURL(localUrl: string) {
    return `${this.baseUrl}/api/v2/warm-address-search-cache`;
  }
}