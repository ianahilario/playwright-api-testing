import { APITest, APITestCollection, HTTPMethods } from '../utils/api-helper';

export const resfulBookerCollection: APITestCollection = {
  collection_name: 'Restful Booker API Tests',
  api_tests: [{
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
}]
};