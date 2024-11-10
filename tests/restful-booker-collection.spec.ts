import test, { APIResponse } from '@playwright/test';
import { APITestCollection } from '../utils/api-objects';
import { assertAPIResponse, submitAPIRequest } from '../utils/api-helper';
import { GET_ping } from './GET-ping.collection';
import { POST_create } from './POST-create.collection';

const testSuites : Array<APITestCollection> = [GET_ping, POST_create];

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

