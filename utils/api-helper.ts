import { APIRequestContext, APIResponse } from "@playwright/test";
import { APITest } from "./api-objects";

export async function submitAPIRequest(apiRequest: APIRequestContext, apiTest:APITest): Promise<APIResponse> {
    let response: APIResponse;
    switch (apiTest.http_method) {
      case 'GET':
        response = await apiRequest.get(`${apiTest.base_url}${apiTest.endpoint}`);
        break;
      case 'POST':
        response = await apiRequest.post(`${apiTest.base_url}${apiTest.endpoint}`, {
          data: apiTest.body,
        });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${apiTest.http_method}`);
    }
  
    console.log(`Response: ${response.status()}`);
    if((await response.body()).toJSON()){
      console.log(`Response body: ${(await response.body()).toString()}`);
    }
  
    return response;
  }