
export enum HTTPMethods {
    POST = 'POST',
    GET = 'GET'
}

export enum ExpectOperator {
    EQUAL = 'equal',
    NOT_EQUAL = 'not_equal'
}

export interface APIRequestData {
    http_method: HTTPMethods;
    base_url: string;
    endpoint: string;
    headers?: any;
    body?: any;
}

export enum APIResponseAttributes {
    STATUS = 'status',
    HEADER = 'header',
    RESPONSE_BODY = 'response_body'
}

export interface APITestAssertion {
    assert_attribute: APIResponseAttributes;
    operator: ExpectOperator;
    attribute_path?: any;
    assert_value: any;
}

export interface APITestCollection {
    collection_name: string;
    tests: Array<APITest>;
  }

export interface APITest {
    test_name: string;
    test_tags: string[];
    request_data: APIRequestData;
    assertions: Array<APITestAssertion>;
  }

