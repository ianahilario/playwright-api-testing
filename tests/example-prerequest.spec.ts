import test, { APIResponse } from '@playwright/test';
import { APITestCollection } from '../utils/api-objects';
import { assertAPIResponse, getAPITestName, submitAPIRequest } from '../utils/api-helper';
import { GET_booking_id_chaining } from './api-collections/GET-booking-{id}-prerequest.collection';

const testSuites : Array<APITestCollection> = [GET_booking_id_chaining];

for (const testSuite of testSuites) {
  test.describe(`${testSuite.collection_name}`, () => {
    for (const apiTest of testSuite.tests) {
      test(`${getAPITestName(apiTest)}`, { tag: apiTest.test_tags }, async ({ request }) => {

        const prerequestResponse: APIResponse = await submitAPIRequest(request, apiTest.prerequest!);
        const response: APIResponse = await submitAPIRequest(request, apiTest.request_data, prerequestResponse);
        await assertAPIResponse(response, apiTest.assertions, prerequestResponse);
        });
      }
  });
}

