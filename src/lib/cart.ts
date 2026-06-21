import { storeApi, type StoreCart, type VariationAttribute } from "./store-api";

const CART_CACHE_KEY = "woo_cart_data";

// Synchronously retrieve cached cart data from localStorage for fast initial render
export const getCachedCart = (): StoreCart | null => {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(CART_CACHE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Update the local storage UI cache
export const saveCachedCart = (cartData: StoreCart): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error("Failed to cache cart data:", error);
  }
};

// Dispatch a custom event to notify all UI islands/components of a cart state update
export const dispatchCartEvent = (cartData: StoreCart): void => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: cartData }));
  }
};

// Asynchronously fetch and synchronize current cart state from WooCommerce Store API
export const syncCart = async (): Promise<StoreCart> => {
  try {
    const cartData = await storeApi.getCart();
    saveCachedCart(cartData);

    const token = localStorage.getItem("woo_cart_token");
    if (token) {
      document.cookie = [
        `woo_cart_token=${token}`,
        "Path=/",
        "Max-Age=31536000",
        "SameSite=Lax",
      ].join("; ");
    }

    dispatchCartEvent(cartData);
    return cartData;
  } catch (error) {
    console.error("Failed to synchronize cart with server:", error);
    throw error;
  }
};

// Add product/variation to live WooCommerce cart
// For variable products, pass variation attributes to specify the exact variant
export const addToCart = async (
  id: number,
  quantity: number = 1,
  variation?: VariationAttribute[],
): Promise<StoreCart> => {
  try {
    const cartData = await storeApi.addItem(id, quantity, variation);
    saveCachedCart(cartData);
    dispatchCartEvent(cartData);
    return cartData;
  } catch (error) {
    console.error(`Failed to add item ${id} to cart:`, error);
    throw error;
  }
};

// Update existing line item quantity using its unique Store API line key
export const updateCartQuantity = async (
  key: string,
  quantity: number,
): Promise<StoreCart> => {
  try {
    const cartData = await storeApi.updateItem(key, quantity);
    saveCachedCart(cartData);
    dispatchCartEvent(cartData);
    return cartData;
  } catch (error) {
    console.error(`Failed to update item quantity for key ${key}:`, error);
    throw error;
  }
};

// Remove line item using its unique line key
export const removeFromCart = async (key: string): Promise<StoreCart> => {
  try {
    const cartData = await storeApi.removeItem(key);
    saveCachedCart(cartData);
    dispatchCartEvent(cartData);
    return cartData;
  } catch (error) {
    console.error(`Failed to remove item with key ${key} from cart:`, error);
    throw error;
  }
};

// Apply promotional coupon code
export const applyCoupon = async (code: string): Promise<StoreCart> => {
  try {
    const cartData = await storeApi.applyCoupon(code);
    saveCachedCart(cartData);
    dispatchCartEvent(cartData);
    return cartData;
  } catch (error) {
    console.error(`Failed to apply coupon ${code}:`, error);
    throw error;
  }
};

// Remove applied coupon code
export const removeCoupon = async (code: string): Promise<StoreCart> => {
  try {
    const cartData = await storeApi.removeCoupon(code);
    saveCachedCart(cartData);
    dispatchCartEvent(cartData);
    return cartData;
  } catch (error) {
    console.error(`Failed to remove coupon ${code}:`, error);
    throw error;
  }
};

export const clearCartCache = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_CACHE_KEY);
  } catch (error) {
    console.error("Failed to clear cart cache:", error);
  }
};
