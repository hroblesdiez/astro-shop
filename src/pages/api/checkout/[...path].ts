import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ params, request }) => {
  const pathSuffix = params.path ? `/${params.path}` : '';
  
  const graphqlUrl = import.meta.env.PUBLIC_GRAPHQL_URL || 'http://localhost:8080/graphql';
  const baseUrl = graphqlUrl.replace(/\/graphql$/, '');
  const targetUrl = `${baseUrl}/wp-json/wc/store/v1/checkout${pathSuffix}`;

  console.log(`[CheckoutProxy] ${request.method} -> ${targetUrl}`);

  const cartToken = request.headers.get('Cart-Token');
  const contentType = request.headers.get('Content-Type');
  const nonce = request.headers.get('Nonce') || request.headers.get('X-WC-Store-API-Nonce');

  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };

  if (cartToken) headers['Cart-Token'] = cartToken;
  if (contentType) headers['Content-Type'] = contentType;
  if (nonce) {
    headers['X-WC-Store-API-Nonce'] = nonce;
    headers['Nonce'] = nonce;
  }

  const options: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const textBody = await request.text();
    if (textBody) options.body = textBody;
  }

  try {
    const remoteResponse = await fetch(targetUrl, options);
    const data = await remoteResponse.json().catch(() => ({}));

    const remoteNonce = remoteResponse.headers.get('Nonce') || remoteResponse.headers.get('X-WC-Store-API-Nonce');
    const remoteCartToken = remoteResponse.headers.get('Cart-Token');
    
    if (remoteNonce) {
      console.log(`[CheckoutProxy] Captured Nonce from WP: ${remoteNonce}`);
    }

    const responseHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': 'X-WC-Store-API-Nonce, Nonce, Cart-Token',
    };

    if (remoteNonce) {
      responseHeaders['X-WC-Store-API-Nonce'] = remoteNonce;
      responseHeaders['Nonce'] = remoteNonce;
    }

    if (remoteCartToken) {
      responseHeaders['Cart-Token'] = remoteCartToken;
    }

    return new Response(JSON.stringify(data), {
      status: remoteResponse.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error('[CheckoutProxy Error]', error);
    return new Response(JSON.stringify({ message: 'Internal Proxy Error', error: error?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
