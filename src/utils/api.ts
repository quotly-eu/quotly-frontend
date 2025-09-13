import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "types/api";

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:3560",
});

/**
 * $api is a client for the Quotly API, built using openapi-react-query and openapi-fetch.
 * It provides type-safe methods for making API requests based on the OpenAPI specification.
 * @example
 * import { $api } from 'utils/api';
 * const { data, error, isLoading } = $api.useQuery('get', '/v1/quotes');
 */
export const $api = createClient(fetchClient);