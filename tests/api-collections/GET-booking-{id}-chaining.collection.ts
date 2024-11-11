import { APIResponseAttributes, APITestCollection, ExpectOperator, HTTPMethods } from '../../utils/api-objects';

const BASE_URL = 'https://restful-booker.herokuapp.com';

let bookingData : any = {
  id: 1,
  firstname:"Sally",
  lastname:"Smith",
  totalprice:741,
  depositpaid:true,
  bookingdates:
    {
      checkin:"2017-07-11",
      checkout:"2017-10-21"
    },
  additionalneeds:"Breakfast"
};

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
        //endpoint: `/booking/${bookingData.id}`,
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
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'depositpaid',
          assert_value: "prerequestResponseBody.booking.depositpaid",
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
          attribute_path: 'prerequestResponse.bookingdates.checkout',
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