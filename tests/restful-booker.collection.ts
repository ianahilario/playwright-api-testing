import { APIResponseAttributes, APITestCollection, ExpectOperator, HTTPMethods } from '../utils/api-objects';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export const resfulBookerCollection: APITestCollection = {
  collection_name: 'Restful Booker API Tests',
  tests: [
    {
      test_name: 'should return status 200',
      test_tags: ['@p1'],
      base_url: BASE_URL,
      http_method: HTTPMethods.GET,
      endpoint: '/ping',
      assert: [
        { 
          assert_message: 'verify that request is successful',
          assert_attribute: APIResponseAttributes.STATUS,
          operator: ExpectOperator.EQUAL,
          assert_value: 201,
          is_soft_assert: false
        }
      ]
    },
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
      assert: [
        { 
          assert_message: 'verify that request is successful',
          assert_attribute: APIResponseAttributes.STATUS,
          operator: ExpectOperator.EQUAL,
          assert_value: 200,
          is_soft_assert: false
        }
      ]
    },
  ]
};