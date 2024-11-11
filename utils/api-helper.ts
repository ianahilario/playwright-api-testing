import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { APIRequestData, APITest, APITestAssertion, ExpectOperator } from "./api-objects";

export function getAPITestName(apiTest: APITest): string {
    return `[${apiTest.request_data.http_method} ${apiTest.request_data.endpoint}] ${apiTest.test_name}`;
};

export async function submitAPIRequest(apiRequest: APIRequestContext, apiTest:APIRequestData, prerequestResponse?: APIResponse): Promise<APIResponse> {
let response: APIResponse;
let endpoint:string = apiTest.endpoint;

if((apiTest.endpoint as string).match(/prerequestResponseBody/)) {
    const match = (apiTest.endpoint as string).match(/prerequestResponseBody\.[a-zA-Z0-9_.]+/);
    let prerequestResponseAttributePath;
    if (match) {
        prerequestResponseAttributePath = match[0];
    } else {
        throw new Error(`Endpoint doesn't contain 'prerequestResponseBody' : ${apiTest.endpoint}`);
    }
    const dynamicValue = await getPrerequestResponseAttributeValue(prerequestResponse, prerequestResponseAttributePath);
    endpoint = endpoint.replace(prerequestResponseAttributePath, dynamicValue);
}

console.log(`Sending request to endpoint: ${apiTest.base_url}${endpoint}`);

switch (apiTest.http_method) {
    case 'GET':
        response = await apiRequest.get(`${apiTest.base_url}${endpoint}`, {
            data: apiTest.body === undefined? {} : apiTest.body,
        });
    break;
    case 'POST':
        response = await apiRequest.post(`${apiTest.base_url}${endpoint}`, {
            data: apiTest.body === undefined? {} : apiTest.body,
        });
    break;
    default:
        throw new Error(`Unsupported HTTP method: ${apiTest.http_method}`);
}

    console.log(`Response body: ${JSON.stringify(await response.json())}`);
    
    return response;
}

export async function assertAPIResponse(response: APIResponse, assertions: Array<APITestAssertion>, prerequestResponse?: APIResponse) {
    for (const assertion of assertions) {
        if (assertion.assert_attribute === 'status') {
            await assertStatus(response, assertion);
        }

        if (assertion.assert_attribute === 'response_body') {
            await assertResponseBody(response, assertion, prerequestResponse);
        }
    }
}

async function assertStatus(response: APIResponse, assertion:APITestAssertion) {
    console.log(`Response status: ${response.status()}`);

    if(assertion.operator === ExpectOperator.EQUAL) {
        expect(response.status(), `assert status is ${assertion.assert_value}`).toBe(assertion.assert_value);
    }
    else if(assertion.operator === ExpectOperator.NOT_EQUAL) {
        expect(response.status(), `assert status is NOT ${assertion.assert_value}`).not.toBe(assertion.assert_value);
    }
    else {
        throw new Error(`Unsupported expect operator: ${assertion.operator}`);
    }
}

async function assertResponseBody(response: any, assertion:APITestAssertion, prerequestResponse?: any) {
    let expectedValue = assertion.assert_value;
    if((assertion.assert_value.toString()).match(/prerequestResponseBody/)) {
        expectedValue = await getPrerequestResponseAttributeValue(prerequestResponse, assertion.assert_value);
    }

    const responseBody = await response.json();

    if(assertion.operator === ExpectOperator.EQUAL) {
        expect.soft(responseBody, `assert response attribute '${assertion.attribute_path}' is ${expectedValue}`).toHaveProperty(assertion.attribute_path, expectedValue);
    }
    else if(assertion.operator === ExpectOperator.NOT_EQUAL) {
        expect.soft(responseBody, `assert response attribute '${assertion.attribute_path}' is NOT ${expectedValue}`).not.toHaveProperty(assertion.attribute_path, expectedValue);
    }
    else {
        throw new Error(`Unsupported expect operator: ${assertion.operator}`);
    }
}

async function getPrerequestResponseAttributeValue(prerequestResponse: any, prerequestAttributePath:string){
    let attributeValue;
    if(prerequestResponse !== undefined){
        const prerequestResponseBody = await prerequestResponse.json();
        const prerequestResponseBodyAttribute = prerequestAttributePath.replace('prerequestResponseBody.', '');
        attributeValue = prerequestResponseBodyAttribute.split('.').reduce((obj, key) => obj && obj[key], prerequestResponseBody);
        console.log(`Get '${prerequestResponseBodyAttribute}' value from pre-request response: ${JSON.stringify(prerequestResponseBody)}`);

    return attributeValue.toString();
    }
    else{
        throw new Error(`Prerequest response is undefined`);
    }
}