import test, { expect } from '@playwright/test';
import { APITest, HTTPMethods } from '../utils/api-helper';

const testCollection: Array<APITest> = [{
  test_name: 'should return status 200',
  test_tags: ['@p1'],
  base_url: 'https://restful-booker.herokuapp.com',
  http_method: HTTPMethods.GET,
  endpoint: '/ping',
  expect: [
    {
      expect_message: 'pong',
      status_code: 201
    }
  ]
}];

for (const apiTest of testCollection) {
test(`[${apiTest.http_method} ${apiTest.endpoint}] ${apiTest.test_name}`, { tag: apiTest.test_tags }, async ({ request }) => {
  const response = await request.get(`${apiTest.base_url}${apiTest.endpoint}`);

  expect(response.ok()).toBeTruthy();
  expect(response.status(), apiTest.expect[0].expect_message).toBe(apiTest.expect[0].status_code);
});
}

