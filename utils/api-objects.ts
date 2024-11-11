
export enum HTTPMethods {
    POST = 'POST',
    GET = 'GET'
}

export enum ExpectOperator {
    EQUAL = 'equal',
    NOT_EQUAL = 'not_equal'
}

export enum AttributeDataType {
    STRING = 'string',
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    DATE = 'date',
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
    attribute_type?: AttributeDataType;
    assert_value: any;
}

export interface APITestCollection {
    collection_name: string;
    tests: Array<APITest>;
  }

export interface APITest {
    test_name: string;
    test_tags: string[];
    variables?: any;
    prerequest?: APIRequestData;
    request_data: APIRequestData;
    assertions: Array<APITestAssertion>;
  }

