import test, { expect } from '@playwright/test';
import { APITest, APITestCollection } from '../utils/api-helper';
import { resfulBookerCollection } from './restful-booker.collection';

const testSuites : Array<APITestCollection> = [resfulBookerCollection];

for (const testSuite of testSuites) {
  test.describe(`${testSuite.collection_name}`, () => {
    for (const apiTest of testSuite.api_tests) {
      test(`[${apiTest.http_method} ${apiTest.endpoint}] ${apiTest.test_name}`, { tag: apiTest.test_tags }, async ({ request }) => {
        const response = await request.get(`${apiTest.base_url}${apiTest.endpoint}`);
    
        expect(response.ok()).toBeTruthy();
        expect(response.status(), apiTest.expect[0].expect_message).toBe(apiTest.expect[0].status_code);
        });
      }
  });
}