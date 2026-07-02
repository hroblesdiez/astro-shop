import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.PUBLIC_GRAPHQL_URL;

if (!endpoint) {
  throw new Error('PUBLIC_GRAPHQL_URL is not defined');
}

export const client = new GraphQLClient(endpoint, {
  fetch: (url, init) => {
    const timeoutSignal = AbortSignal.timeout(30000);
    return fetch(url, { ...init, signal: timeoutSignal });
  },
});

const memCache = new Map<string, { data: unknown; timestamp: number }>();
const TTL = 10 * 60 * 1000;
const STORE_NAME = 'graphql-cache';

let blobStore: Awaited<ReturnType<typeof getBlobStore>> | null = null;

async function getBlobStore() {
  try {
    const { getStore } = await import('@netlify/blobs');
    return getStore(STORE_NAME);
  } catch {
    return null;
  }
}

async function ensureStore() {
  if (!blobStore) {
    blobStore = await getBlobStore();
  }
  return blobStore;
}

function cacheKey(query: string, variables?: Record<string, unknown>): string {
  return JSON.stringify({ query, variables });
}

export async function cachedRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const key = cacheKey(query, variables);
  const memEntry = memCache.get(key);

  if (memEntry && Date.now() - memEntry.timestamp < TTL) {
    return memEntry.data as T;
  }

  const store = await ensureStore();
  if (store) {
    try {
      const blobEntry = await store.get(key, { type: 'json' }) as { data: unknown; timestamp: number } | null;
      if (blobEntry && Date.now() - blobEntry.timestamp < TTL) {
        memCache.set(key, { data: blobEntry.data, timestamp: blobEntry.timestamp });
        return blobEntry.data as T;
      }
      if (blobEntry) {
        await store.delete(key);
      }
    } catch {
      // Blob read failed — fall through to GraphQL
    }
  }

  const data = await client.request<T>(query, variables);
  const entry = { data, timestamp: Date.now() };

  memCache.set(key, entry);

  if (store) {
    try {
      await store.set(key, JSON.stringify(entry));
    } catch {
      // Blob write failed — data is already in memory cache
    }
  }

  return data;
}
