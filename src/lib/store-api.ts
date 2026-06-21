// WooCommerce Store API Client
// Handles authoritative session synchronization using the Cart-Token header

export interface StoreCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  summary: string;
  short_description: string;
  sku: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    name: string;
    alt: string;
  }>;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: {
      precision: number;
      price: string;
      regular_price: string;
      sale_price: string;
    };
  };
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  variation: Array<{
    attribute: string;
    value: string;
  }>;
}

export interface StoreCartTotals {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
  tax_lines: Array<{
    name: string;
    rate: string;
    price: string;
  }>;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface StoreCoupon {
  code: string;
  label: string;
  totals: {
    total_discount: string;
    total_discount_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
}

export interface StoreCart {
  coupons: StoreCoupon[];
  items: StoreCartItem[];
  items_count: number;
  items_weight: number;
  needs_shipping: boolean;
  needs_payment: boolean;
  has_calculated_shipping: boolean;
  shipping_rates: any[];
  totals: StoreCartTotals;
  errors: any[];
}

export interface StoreCheckoutResponse {
  order_id: number;
  order_key: string;
  status: string;
  customer_note: string;
  customer_id: number;
  billing_address: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
  };
  payment_method: string;
  payment_method_title: string;
  totals: StoreCartTotals;
}

export interface CustomerData {
  billing_address?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state?: string;
    address_1: string;
    address_2?: string;
    city: string;
    postcode: string;
  };
  shipping_address?: {
    first_name: string;
    last_name: string;
    country: string;
    state?: string;
    address_1: string;
    address_2?: string;
    city: string;
    postcode: string;
  };
}

export interface CheckoutPayload extends CustomerData {
  order_notes?: string;
  payment_method?: string;
  payment_method_title?: string;
}

export interface VariationAttribute {
  attribute: string;
  value: string;
}

const CART_TOKEN_KEY = "woo_cart_token";
const CART_NONCE_KEY = "woo_cart_nonce";

function getOrCreateCartToken(): string {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem(CART_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    persistCartToken(token);
  }
  return token;
}

function getStoreApiUrl(): string {
  if (typeof window === "undefined") {
    const graphqlUrl =
      import.meta.env.PUBLIC_GRAPHQL_URL || "http://localhost:8080/graphql";
    const baseUrl = graphqlUrl.replace(/\/graphql$/, "");
    return `${baseUrl}/wp-json/wc/store/v1/cart`;
  }
  return "/api/cart";
}

function getCheckoutApiUrl(): string {
  if (typeof window === "undefined") {
    const graphqlUrl =
      import.meta.env.PUBLIC_GRAPHQL_URL || "http://localhost:8080/graphql";
    return (
      graphqlUrl.replace(/\/graphql$/, "") + "/wp-json/wc/store/v1/checkout"
    );
  }
  return "/api/checkout";
}

async function requestStoreApi(
  method: string,
  endpointSuffix: string = "",
  body?: any,
  cartToken?: string,
  baseUrlOverride?: string,
): Promise<any> {
  const baseUrl = baseUrlOverride ?? getStoreApiUrl();
  const url = `${baseUrl}${endpointSuffix}`;

  const token = cartToken ?? getOrCreateCartToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Cart-Token": token,
  };

  if (typeof window !== "undefined") {
    const nonce = localStorage.getItem(CART_NONCE_KEY);
    if (nonce) {
      headers["X-WC-Store-API-Nonce"] = nonce;
      headers["Nonce"] = nonce;
    }
  }

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = { method, headers };
  if (body) options.body = JSON.stringify(body);

  console.log(`[StoreAPI Request] ${method} ${url}`, body ? { body } : "");

  try {
    const response = await fetch(url, options);

    const freshNonce =
      response.headers.get("Nonce") ||
      response.headers.get("X-WC-Store-API-Nonce");
    if (freshNonce && typeof window !== "undefined") {
      console.log("[StoreAPI] Captured fresh Nonce:", freshNonce);
      localStorage.setItem(CART_NONCE_KEY, freshNonce);
    }

    const freshCartToken = response.headers.get("Cart-Token");
    if (freshCartToken && typeof window !== "undefined") {
      console.log("[StoreAPI] Captured fresh Cart-Token:", freshCartToken);
      localStorage.setItem(CART_TOKEN_KEY, freshCartToken);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[StoreAPI Error Response]", response.status, errorData);
      const message =
        errorData.message ||
        `Store API request failed with status ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    console.log("[StoreAPI Success Response]", data);
    return data;
  } catch (error) {
    console.error("[StoreAPI Network/Fetch Exception]", error);
    throw error;
  }
}

export interface OrderLineItem {
  id: number;
  quantity: number;
  name: string;
  total: string;
  total_tax: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    name: string;
    alt: string;
  }>;
  price: string;
  currency: string;
  sku?: string;
  variation?: Array<{
    attribute: string;
    value: string;
  }>;
}

export interface OrderCoupon {
  code: string;
  total_discount: string;
  total_discount_tax: string;
}

export interface OrderResponse {
  id: number;
  order_number: number;
  order_key: string;
  status: string;
  date_created: string;
  date_modified: string;
  billing_address: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    country: string;
    state: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
  };
  line_items: OrderLineItem[];
  coupon_lines: OrderCoupon[];
  totals: StoreCartTotals;
  customer_note?: string;
  payment_method: string;
  payment_method_title: string;
}

async function requestOrderApi(
  orderId: number,
  orderKey: string,
  billingEmail: string,
): Promise<OrderResponse> {
  const graphqlUrl =
    import.meta.env.PUBLIC_GRAPHQL_URL || "http://localhost:8080/graphql";
  const baseUrl = graphqlUrl.replace(/\/graphql$/, "");
  const url = `${baseUrl}/wp-json/wc/store/v1/order/${orderId}?key=${orderKey}&billing_email=${encodeURIComponent(billingEmail)}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  console.log(`[OrderAPI Request] GET ${url}`);

  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[OrderAPI Error Response]", response.status, errorData);
      throw new Error(
        errorData.message ||
          `Order API request failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    console.log("[OrderAPI Success Response]", data);
    return data;
  } catch (error) {
    console.error("[OrderAPI Network/Fetch Exception]", error);
    throw error;
  }
}

export const storeApi = {
  getCart: (cartToken?: string) =>
    requestStoreApi("GET", "", undefined, cartToken),

  addItem: (id: number, quantity: number = 1, variation?: VariationAttribute[]) => {
    const body: any = { id, quantity };
    if (variation && variation.length > 0) {
      body.variation = variation;
    }
    return requestStoreApi("POST", "/add-item", body);
  },

  updateItem: (key: string, quantity: number) =>
    requestStoreApi("POST", "/update-item", { key, quantity }),

  removeItem: (key: string) => requestStoreApi("POST", "/remove-item", { key }),

  applyCoupon: (code: string) =>
    requestStoreApi("POST", "/apply-coupon", { code }),

  removeCoupon: (code: string) =>
    requestStoreApi("POST", "/remove-coupon", { code }),

  updateCustomer: (customerData: CustomerData) =>
    requestStoreApi("POST", "/update-customer", customerData),

  checkout: (payload: CheckoutPayload): Promise<StoreCheckoutResponse> =>
    requestStoreApi(
      "POST",
      "",
      payload,
      undefined,
      getCheckoutApiUrl(),
    ) as Promise<StoreCheckoutResponse>,

  getOrder: (
    orderId: number,
    orderKey: string,
    billingEmail: string,
  ): Promise<OrderResponse> => requestOrderApi(orderId, orderKey, billingEmail),
};

function persistCartToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_TOKEN_KEY, token);
  document.cookie = [
    `${CART_TOKEN_KEY}=${token}`,
    "Path=/",
    "Max-Age=31536000",
    "SameSite=Lax",
  ].join("; ");
}
