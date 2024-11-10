# playwright-api-testing
This framework is inspired by `bruno`.

If your project is purely API testing only, then Playwright might be an overkill.
But if you need to interact with a browser before/after calling an API request, or if you simply prefer to use Playwright then this approach can work for you.

## How it works
Create your API tests in a form of a single test or a collection of tests.

**Sample collection file**
```typescript
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
```

**Test file to run the collection**
```typescript
const testSuites : Array<APITestCollection> = [GET_ping, POST_create, GET_booking_id];

for (const testSuite of testSuites) {
  test.describe(`${testSuite.collection_name}`, () => {
    for (const apiTest of testSuite.tests) {
      test(`[${apiTest.http_method} ${apiTest.endpoint}] ${apiTest.test_name}`, { tag: apiTest.test_tags }, async ({ request }) => {

        const response: APIResponse = await submitAPIRequest(request, apiTest);
        await assertAPIResponse(response, apiTest.assertions);
        });
      }
  });
}
```

View the `tests` folder for other examples.

## Running the tests
Can run with the usual Playwright commands.
<img width="1087" alt="image" src="https://github.com/user-attachments/assets/279bb93e-8aa3-4762-9da9-41bba5ee508d">
