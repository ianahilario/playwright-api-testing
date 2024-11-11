import { APIResponseAttributes, APITestCollection, ExpectOperator, HTTPMethods } from "../../utils/api-objects";

const BASE_URL = 'https://restful-booker.herokuapp.com';

export const GET_ping: APITestCollection = {
  collection_name: 'Restful Booker API Tests - GET/ping',
  tests: [
    {
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
          operator: ExpectOperator.NOT_EQUAL,
          assert_value: 200,
        }
      ]
    },
  ]
};