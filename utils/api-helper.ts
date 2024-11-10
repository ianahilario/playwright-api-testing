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

    console.log(`Response: ${response.status()}`);
    if(response.status() >= 200 && response.status() < 300) {
        console.log(`Response body: ${(await response.body()).toString()}`);
    }

    return response;
}

export async function assertAPIResponse(response: APIResponse, assertions: Array<APITestAssertion>) {
    for (const assert of assertions) {
        if (assert.assert_attribute === 'status') {
            assertStatus(response, assert.assert_value, assert.operator);
        }
    }
}

async function assertStatus(response: APIResponse, expectedValue:number, assertOperator: ExpectOperator) {
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