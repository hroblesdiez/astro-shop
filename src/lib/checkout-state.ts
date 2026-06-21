const CHECKOUT_CACHE_KEY = "woo_checkout_state";
const ORDER_ID_SESSION_KEY = "woo_order_id";
const ORDER_KEY_SESSION_KEY = "woo_order_key";
const ORDER_BILLING_EMAIL_SESSION_KEY = "woo_order_billing_email";

export interface CheckoutState {
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    address1: string;
    address2: string;
    city: string;
    postcode: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    country: string;
    state: string;
    address1: string;
    address2: string;
    city: string;
    postcode: string;
  };
  orderNotes: string;
}

const DEFAULT_STATE: CheckoutState = {
  billing: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "PL",
    state: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
  },
  shipping: {
    firstName: "",
    lastName: "",
    country: "PL",
    state: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
  },
  orderNotes: "",
};

export const getCachedCheckoutState = (): CheckoutState => {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const cached = localStorage.getItem(CHECKOUT_CACHE_KEY);
    return cached ? JSON.parse(cached) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
};

export const saveCheckoutState = (state: CheckoutState): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHECKOUT_CACHE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to cache checkout state:", error);
  }
};

export const clearCheckoutState = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CHECKOUT_CACHE_KEY);
  } catch (error) {
    console.error("Failed to clear checkout state:", error);
  }
};

export const saveOrderConfirmation = (
  orderId: number,
  orderKey: string,
  billingEmail: string, // nuevo
): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ORDER_ID_SESSION_KEY, orderId.toString());
    sessionStorage.setItem(ORDER_KEY_SESSION_KEY, orderKey);
    sessionStorage.setItem(ORDER_BILLING_EMAIL_SESSION_KEY, billingEmail); // nuevo
  } catch (error) {
    console.error("Failed to save order confirmation:", error);
  }
};

export const getOrderConfirmation = (): {
  orderId: number;
  orderKey: string;
  billingEmail: string;
} | null => {
  if (typeof window === "undefined") return null;
  try {
    const id = sessionStorage.getItem(ORDER_ID_SESSION_KEY);
    const key = sessionStorage.getItem(ORDER_KEY_SESSION_KEY);
    const billingEmail = sessionStorage.getItem(
      ORDER_BILLING_EMAIL_SESSION_KEY,
    );
    if (!id || !key || !billingEmail) return null; // nuevo: billingEmail también obligatorio
    return { orderId: parseInt(id, 10), orderKey: key, billingEmail };
  } catch {
    return null;
  }
};

export const clearOrderConfirmation = (): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ORDER_ID_SESSION_KEY);
    sessionStorage.removeItem(ORDER_KEY_SESSION_KEY);
    sessionStorage.removeItem(ORDER_BILLING_EMAIL_SESSION_KEY);
  } catch (error) {
    console.error("Failed to clear order confirmation:", error);
  }
};

// Kept for backward compatibility with existing [orderId].astro
export const saveOrderId = (orderId: number): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ORDER_ID_SESSION_KEY, orderId.toString());
  } catch (error) {
    console.error("Failed to save order ID:", error);
  }
};

export const getOrderId = (): number | null => {
  if (typeof window === "undefined") return null;
  try {
    const id = sessionStorage.getItem(ORDER_ID_SESSION_KEY);
    return id ? parseInt(id, 10) : null;
  } catch {
    return null;
  }
};

export const clearOrderId = (): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ORDER_ID_SESSION_KEY);
  } catch (error) {
    console.error("Failed to clear order ID:", error);
  }
};
