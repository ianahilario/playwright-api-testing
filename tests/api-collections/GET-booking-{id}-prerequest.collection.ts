import { APIResponseAttributes, APITestCollection, AttributeDataType, ExpectOperator, HTTPMethods } from '../../utils/api-objects';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export const GET_booking_id_chaining: APITestCollection = {
  collection_name: 'Restful Booker API Tests - GET/booking/{id}',
  tests: [
    {
      test_name: 'should match booking data for an newly created user',
      test_tags: ['@p1'],
      prerequest: {
        base_url: BASE_URL,
        http_method: HTTPMethods.POST,
        endpoint: `/booking`,
        body: {
          firstname: "Tommy",
          lastname: "Clover",
          totalprice: 999,
          depositpaid: false,
          bookingdates: {
            checkin: "2022-01-01",
            checkout: "2023-01-01"
          },
          additionalneeds: "With windows"
        },
      },
      request_data: {
        base_url: BASE_URL,
        http_method: HTTPMethods.GET,
        endpoint: `/booking/prerequestResponseBody.bookingid`,
      },
      assertions: [
        { 
          assert_attribute: APIResponseAttributes.STATUS,
          operator: ExpectOperator.EQUAL,
          assert_value: 200,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'firstname',
          assert_value: "prerequestResponseBody.booking.firstname",
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'lastname',
          assert_value: "prerequestResponseBody.booking.lastname",
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'totalprice',
          assert_value: "prerequestResponseBody.booking.totalprice",
          attribute_type: AttributeDataType.NUMBER,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'depositpaid',
          assert_value: "prerequestResponseBody.booking.depositpaid",
          attribute_type: AttributeDataType.BOOLEAN,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'bookingdates.checkin',
          assert_value: "prerequestResponseBody.booking.bookingdates.checkin",
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'bookingdates.checkout',
          assert_value: "prerequestResponseBody.booking.bookingdates.checkout",
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'additionalneeds',
          assert_value: "prerequestResponseBody.booking.additionalneeds",
        }
      ]
    },
  ]
};