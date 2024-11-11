import test, { APIResponse } from '@playwright/test';
import { APITestCollection } from '../utils/api-objects';
import { assertAPIResponse, getAPITestName, submitAPIRequest } from '../utils/api-helper';
import { GET_ping } from './api-collections/GET-ping.collection';
import { POST_create } from './api-collections/POST-create-booking.collection';
import { GET_booking_id } from './api-collections/GET-booking-{id}.collection';

const testSuites : Array<APITestCollection> = [GET_ping, POST_create, GET_booking_id];

for (const testSuite of testSuites) {
  test.describe(`${testSuite.collection_name}`, () => {
    for (const apiTest of testSuite.tests) {
      test(`${getAPITestName(apiTest)}`, { tag: apiTest.test_tags }, async ({ request }) => {

        const response: APIResponse = await submitAPIRequest(request, apiTest.request_data);
        await assertAPIResponse(response, apiTest.assertions);
        });
      }
  });
}

