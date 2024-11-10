import test, { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { APITest, APITestCollection, HTTPMethods } from '../utils/api-objects';
import { resfulBookerCollection } from './restful-booker.collection';

const testSuites : Array<APITestCollection> = [resfulBookerCollection];

for (const testSuite of testSuites) {
  test.describe(`${testSuite.collection_name}`, () => {
    for (const apiTest of testSuite.tests) {
      test(`[${apiTest.http_method} ${apiTest.endpoint}] ${apiTest.test_name}`, { tag: apiTest.test_tags }, async ({ request }) => {

        const response: APIResponse = await submitAPIRequest(request, apiTest);

        for (const assert of apiTest.assert) {
          if (assert.assert_attribute === 'status') {
            expect(response.status(), assert.assert_message).toBe(assert.assert_value);
          }
        }
        });
      }
  });
}

async function submitAPIRequest(apiRequest: APIRequestContext, apiTest:APITest): Promise<APIResponse> {
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