import test, { APIResponse } from '@playwright/test';
import { APITestCollection } from '../utils/api-objects';
import { resfulBookerCollection } from './restful-booker.collection';
import { assertAPIResponse, submitAPIRequest } from '../utils/api-helper';

const testSuites : Array<APITestCollection> = [resfulBookerCollection];

for (const testSuite of testSuites) {
  test.describe(`${testSuite.collection_name}`, () => {
    for (const apiTest of testSuite.tests) {
      test(`[${apiTest.http_method} ${apiTest.endpoint}] ${apiTest.test_name}`, { tag: apiTest.test_tags }, async ({ request }) => {

        const response: APIResponse = await submitAPIRequest(request, apiTest);
        assertAPIResponse(response, apiTest.assertions);

        });
      }
  });
}

