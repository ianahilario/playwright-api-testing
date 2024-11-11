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

export const GET_booking_id: APITestCollection = {
  collection_name: 'Restful Booker API Tests - GET/booking/{id}',
  tests: [
    {
      test_name: 'should match booking data',
      test_tags: ['@p1'],
      request_data: {
        base_url: BASE_URL,
        http_method: HTTPMethods.GET,
        endpoint: `/booking/${bookingData.id}`,
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
          assert_value: bookingData.firstname,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'lastname',
          assert_value: bookingData.lastname,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'totalprice',
          assert_value: bookingData.totalprice,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'depositpaid',
          assert_value: bookingData.depositpaid,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'bookingdates.checkin',
          assert_value: bookingData.bookingdates.checkin,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'bookingdates.checkout',
          assert_value: bookingData.bookingdates.checkout,
        },
        { 
          assert_attribute: APIResponseAttributes.RESPONSE_BODY,
          operator: ExpectOperator.EQUAL,
          attribute_path: 'additionalneeds',
          assert_value: bookingData.additionalneeds,
        }
      ]
    },
  ]
};