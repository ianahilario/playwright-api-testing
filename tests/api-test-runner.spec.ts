import test, { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { APITest, APITestCollection, HTTPMethods } from '../utils/api-objects';
import { resfulBookerCollection } from './restful-booker.collection';
import { submitAPIRequest } from '../utils/api-helper';

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

