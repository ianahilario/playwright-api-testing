import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { APITest, APITestAssertion, ExpectOperator } from "./api-objects";

export async function submitAPIRequest(apiRequest: APIRequestContext, apiTest:APITest): Promise<APIResponse> {
let response: APIResponse;
switch (apiTest.http_method) {
    case 'GET':
        response = await apiRequest.get(`${apiTest.base_url}${apiTest.endpoint}`, {
            data: apiTest.body === undefined? {} : apiTest.body,
        });
    break;
    case 'POST':
        response = await apiRequest.post(`${apiTest.base_url}${apiTest.endpoint}`, {
            data: apiTest.body === undefined? {} : apiTest.body,
        });
    break;
    default:
        throw new Error(`Unsupported HTTP method: ${apiTest.http_method}`);
}
    return response;
}

export async function assertAPIResponse(response: APIResponse, assertions: Array<APITestAssertion>) {
    for (const assert of assertions) {
        if (assert.assert_attribute === 'status') {
            await assertStatus(response, assert.assert_value, assert.operator);
        }

        if (assert.assert_attribute === 'response_body') {
            await assertResponseBody(await response, assert.attribute_path, assert.assert_value, assert.operator);
        }
    }
}

async function assertStatus(response: APIResponse, expectedValue:number, assertOperator: ExpectOperator) {
    console.log(`Response status: ${response.status()}`);

    if(assertOperator === ExpectOperator.EQUAL) {
        expect(response.status(), `assert status is ${expectedValue}`).toBe(expectedValue);
    }
    else if(assertOperator === ExpectOperator.NOT_EQUAL) {
        expect(response.status(), `assert status is NOT ${expectedValue}`).not.toBe(expectedValue);
    }
    else {
        throw new Error(`Unsupported expect operator: ${assertOperator}`);
    }
}

async function assertResponseBody(response: any, attribute:any, expectedValue:number, assertOperator: ExpectOperator) {
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody)}`);

    if(assertOperator === ExpectOperator.EQUAL) {
        expect.soft(responseBody, `assert attribute '${attribute}' is ${expectedValue}`).toHaveProperty(attribute, expectedValue);
    }
    else if(assertOperator === ExpectOperator.NOT_EQUAL) {
        expect.soft(responseBody, `assert attribute '${attribute}' is NOT ${expectedValue}`).not.toHaveProperty(attribute, expectedValue);
    }
    else {
        throw new Error(`Unsupported expect operator: ${assertOperator}`);
    }
}