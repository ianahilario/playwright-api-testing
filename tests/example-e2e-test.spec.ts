import test, { APIResponse, expect } from '@playwright/test';
import { APIResponseAttributes, APITest, ExpectOperator, HTTPMethods } from '../utils/api-objects';
import { assertAPIResponse, submitAPIRequest } from '../utils/api-helper';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const apiTest: APITest = {
    test_name: 'should return status 200',
    test_tags: ['@p1'],
    request_data: {
      base_url: BASE_URL,
      http_method: HTTPMethods.GET,
      endpoint: `/ping`,
    },
    assertions: [
      { 
        assert_attribute: APIResponseAttributes.STATUS,
        operator: ExpectOperator.EQUAL,
        assert_value: 201,
      }
    ]
};

test(`should be able to login after successful ping`, { tag: apiTest.test_tags }, async ({ request, page }) => {
  const response: APIResponse = await submitAPIRequest(request, apiTest.request_data);
  await assertAPIResponse(response, apiTest.assertions);

  //use Playwright browser capabilities to continue e2e test after calling API
  await page.goto("https://restful-booker.herokuapp.com/");
  await expect(page.locator('//h1')).toHaveText('Welcome to Restful-Booker');
});
