
export enum HTTPMethods {
    POST = 'POST',
    GET = 'GET'
}

export enum ExpectOperator {
    EQUAL = 'equal',
    NOT_EQUAL = 'not_equal'
}

export enum APIResponseAttributes {
    STATUS = 'status',
    HEADER = 'header',
    RESPONSE_BODY = 'response_body'
}


export interface APITestAssertion {
    assert_message: string;
    assert_attribute: APIResponseAttributes;
    operator: ExpectOperator;
    assert_value: any;
    is_soft_assert: boolean;
}

export interface APITestCollection {
    collection_name: string;
    tests: Array<APITest>;
  }

export interface APITest {
    test_name: string;
    test_tags: string[];
    base_url: string;
    http_method: HTTPMethods;
    endpoint: string;
    headers?: any;
    body?: any;
    assert: Array<APITestAssertion>;
  }

