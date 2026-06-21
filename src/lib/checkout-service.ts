import {
  storeApi,
  type CustomerData,
  type CheckoutPayload,
  type OrderResponse,
} from "./store-api";
import { syncCart } from "./cart";
import {
  validateBillingAddress,
  validateShippingAddress,
} from "../lib/checkout-validators";
import { countryRequiresState } from "../lib/country-states";
import type { CheckoutState } from "../lib/checkout-state";

export interface CheckoutError {
  code: string;
  message: string;
  field?: string;
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: number;
  orderKey?: string;
  errors?: CheckoutError[];
}

const mapCheckoutStateToCustomerData = (state: CheckoutState): CustomerData => {
  return {
    billing_address: {
      first_name: state.billing.firstName,
      last_name: state.billing.lastName,
      email: state.billing.email,
      phone: state.billing.phone,
      country: state.billing.country,
      state: countryRequiresState(state.billing.country)
        ? state.billing.state
        : undefined,
      address_1: state.billing.address1,
      address_2: state.billing.address2 || undefined,
      city: state.billing.city,
      postcode: state.billing.postcode,
    },
    shipping_address: {
      first_name: state.shipping.firstName,
      last_name: state.shipping.lastName,
      country: state.shipping.country,
      state: countryRequiresState(state.shipping.country)
        ? state.shipping.state
        : undefined,
      address_1: state.shipping.address1,
      address_2: state.shipping.address2 || undefined,
      city: state.shipping.city,
      postcode: state.shipping.postcode,
    },
  };
};

const mapCheckoutStateToPayload = (state: CheckoutState): CheckoutPayload => {
  return {
    ...mapCheckoutStateToCustomerData(state),
    payment_method: "bacs",
    payment_method_title: "Direct bank transfer",
    order_notes: state.orderNotes || undefined,
  };
};

const parseStoreApiError = (error: any): CheckoutError => {
  if (error?.message && typeof error.message === "string") {
    const match = error.message.match(/\[([^\]]+)\]\s*(.*)/);
    if (match) {
      return { code: match[1], message: match[2] };
    }
    return { code: "STORE_API_ERROR", message: error.message };
  }
  return { code: "UNKNOWN_ERROR", message: "An unexpected error occurred" };
};

export const validateCheckoutData = (state: CheckoutState): CheckoutError[] => {
  const errors: CheckoutError[] = [];

  const billingValidation = validateBillingAddress(state.billing);
  if (!billingValidation.isValid) {
    errors.push(
      ...billingValidation.errors.map((e) => ({
        code: "VALIDATION_ERROR",
        message: e.message,
        field: e.field,
      })),
    );
  }

  const shippingValidation = validateShippingAddress(state.shipping);
  if (!shippingValidation.isValid) {
    errors.push(
      ...shippingValidation.errors.map((e) => ({
        code: "VALIDATION_ERROR",
        message: e.message,
        field: e.field,
      })),
    );
  }

  return errors;
};

export const revalidateCart = async (): Promise<{
  isValid: boolean;
  errors: CheckoutError[];
}> => {
  try {
    const cart = await syncCart();

    if (!cart.items || cart.items.length === 0) {
      return {
        isValid: false,
        errors: [{ code: "EMPTY_CART", message: "Your cart is empty" }],
      };
    }

    if (cart.errors && cart.errors.length > 0) {
      return {
        isValid: false,
        errors: cart.errors.map((err) => ({
          code: "CART_ERROR",
          message: err.message || "Cart validation failed",
        })),
      };
    }

    return { isValid: true, errors: [] };
  } catch {
    return {
      isValid: false,
      errors: [
        { code: "CART_SYNC_ERROR", message: "Failed to synchronize cart" },
      ],
    };
  }
};

export const submitCheckout = async (
  state: CheckoutState,
): Promise<CheckoutResponse> => {
  try {
    console.log("[Checkout] Validating data...");
    const validationErrors = validateCheckoutData(state);
    if (validationErrors.length > 0) {
      return { success: false, errors: validationErrors };
    }

    console.log("[Checkout] Revalidating cart...");
    const cartValidation = await revalidateCart();
    if (!cartValidation.isValid) {
      return { success: false, errors: cartValidation.errors };
    }

    console.log("[Checkout] Submitting to WooCommerce Store API...");
    const payload = mapCheckoutStateToPayload(state);
    const response = await storeApi.checkout(payload);

    if (!response?.order_id) {
      throw new Error("Order ID not returned from checkout");
    }

    console.log(
      "[Checkout] Order created:",
      response.order_id,
      response.order_key,
    );
    return {
      success: true,
      orderId: response.order_id,
      orderKey: response.order_key,
    };
  } catch (error) {
    console.error("[Checkout] Error:", error);
    return {
      success: false,
      errors: [parseStoreApiError(error)],
    };
  }
};

export const getOrderDetails = async (
  orderId: number,
  orderKey: string,
  billingEmail: string,
): Promise<{
  success: boolean;
  order?: OrderResponse;
  error?: CheckoutError;
}> => {
  try {
    console.log("[Order Details] Fetching order...");
    const order = await storeApi.getOrder(orderId, orderKey, billingEmail);
    console.log("[Order Details] Order fetched successfully");
    return { success: true, order };
  } catch (error) {
    console.error("[Order Details] Error:", error);
    return {
      success: false,
      error: parseStoreApiError(error),
    };
  }
};
