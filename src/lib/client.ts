import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.PUBLIC_GRAPHQL_URL;

if (!endpoint) {
  throw new Error('PUBLIC_GRAPHQL_URL is not defined');
}

export const client = new GraphQLClient(endpoint, {
  timeout: 7000,
});

const cache = new Map<string, { data: unknown; timestamp: number }>();
const TTL = 10 * 60 * 1000;

export async function cachedRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const key = JSON.stringify({ query, variables });
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < TTL) {
    return cached.data as T;
  }

  const data = await client.request<T>(query, variables);
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
