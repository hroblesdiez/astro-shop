import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.PUBLIC_GRAPHQL_URL;

if (!endpoint) {
  throw new Error('PUBLIC_GRAPHQL_URL is not defined');
}

export const client = new GraphQLClient(endpoint);
