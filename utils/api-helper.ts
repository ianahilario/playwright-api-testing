
export enum HTTPMethods {
    POST = 'POST',
    GET = 'GET'
  }

export interface APITestExpect {
    expect_message: string;
    status_code?: number;
    headers?: any;
    body?: any;
}

export interface APITestCollection {
    collection_name: string;
    api_tests: Array<APITest>;
  }

export interface APITest {
    test_name: string;
    test_tags: string[];
    base_url: string;
    http_method: HTTPMethods;
    endpoint: string;
    expect: Array<APITestExpect>;
  }

