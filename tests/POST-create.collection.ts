import { APIResponseAttributes, APITestCollection, ExpectOperator, HTTPMethods } from '../utils/api-objects';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export const POST_create: APITestCollection = {
  collection_name: 'Restful Booker API Tests - POST/create',
  tests: [
    {
      test_name: 'should be able to create booking',
      test_tags: ['@p1'],
      base_url: BASE_URL,
      http_method: HTTPMethods.POST,
      endpoint: '/booking',
      body: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      },
      assertions: [
        { 
          assert_attribute: APIResponseAttributes.STATUS,
          operator: ExpectOperator.EQUAL,
          assert_value: 200,
        }
      ]
    },
    {
      test_name: 'should require first name',
      test_tags: [],
      base_url: BASE_URL,
      http_method: HTTPMethods.POST,
      endpoint: '/booking',
      body: {
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      },
      assertions: [
        { 
          assert_attribute: APIResponseAttributes.STATUS,
          operator: ExpectOperator.EQUAL,
          assert_value: 500,
        }
      ]
    },
  ]
};