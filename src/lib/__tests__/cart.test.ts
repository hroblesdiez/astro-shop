import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── Mock store-api BEFORE importing cart.ts ───────────────────────────────
vi.mock('../store-api', () => ({
  storeApi: {
    getCart: vi.fn(),
    addItem: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
    applyCoupon: vi.fn(),
    removeCoupon: vi.fn(),
  },
}));

import { storeApi } from '../store-api';
import {
  getCachedCart,
  saveCachedCart,
  dispatchCartEvent,
  syncCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
} from '../cart';
import type { StoreCart } from '../store-api';

// ─── Helpers ───────────────────────────────────────────────────────────────

function makeCart(overrides: Partial<StoreCart> = {}): StoreCart {
  return {
    coupons: [],
    items: [],
    items_count: 0,
    items_weight: 0,
    needs_shipping: false,
    needs_payment: false,
    has_calculated_shipping: false,
    shipping_rates: [],
    errors: [],
    totals: {
      total_items: '1000',
      total_items_tax: '0',
      total_fees: '0',
      total_fees_tax: '0',
      total_discount: '0',
      total_discount_tax: '0',
      total_shipping: '0',
      total_shipping_tax: '0',
      total_price: '1000',
      total_tax: '0',
      tax_lines: [],
      currency_code: 'EUR',
      currency_symbol: '€',
      currency_minor_unit: 2,
      currency_decimal_separator: ',',
      currency_thousand_separator: '.',
      currency_prefix: '',
      currency_suffix: '€',
    },
    ...overrides,
  };
}

function makeCouponCart(code: string, discount: string): StoreCart {
  return makeCart({
    coupons: [
      {
        code,
        label: code.toUpperCase(),
        totals: {
          total_discount: discount,
          total_discount_tax: '0',
          currency_code: 'EUR',
          currency_symbol: '€',
          currency_minor_unit: 2,
          currency_decimal_separator: ',',
          currency_thousand_separator: '.',
          currency_prefix: '',
          currency_suffix: '€',
        },
      },
    ],
    totals: {
      ...makeCart().totals,
      total_discount: discount,
      total_price: String(1000 - parseInt(discount, 10)),
    },
  });
}

// ─── localStorage mock via jsdom ───────────────────────────────────────────

const CART_CACHE_KEY = 'woo_cart_data';

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  localStorage.clear();
});

// ─── getCachedCart ─────────────────────────────────────────────────────────

describe('getCachedCart', () => {
  it('returns null when localStorage is empty', () => {
    expect(getCachedCart()).toBeNull();
  });

  it('returns parsed cart data when present', () => {
    const cart = makeCart();
    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cart));
    expect(getCachedCart()).toEqual(cart);
  });

  it('returns null when stored value is malformed JSON', () => {
    localStorage.setItem(CART_CACHE_KEY, '{broken json');
    expect(getCachedCart()).toBeNull();
  });
});

// ─── saveCachedCart ────────────────────────────────────────────────────────

describe('saveCachedCart', () => {
  it('persists cart data to localStorage', () => {
    const cart = makeCart();
    saveCachedCart(cart);
    const raw = localStorage.getItem(CART_CACHE_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!)).toEqual(cart);
  });

  it('overwrites existing cached cart', () => {
    const cartA = makeCart({ items_count: 1 });
    const cartB = makeCart({ items_count: 5 });
    saveCachedCart(cartA);
    saveCachedCart(cartB);
    const stored = JSON.parse(localStorage.getItem(CART_CACHE_KEY)!);
    expect(stored.items_count).toBe(5);
  });
});

// ─── dispatchCartEvent ─────────────────────────────────────────────────────

describe('dispatchCartEvent', () => {
  it('dispatches cart-updated event with cart as detail', () =>
    new Promise<void>((resolve) => {
      const cart = makeCart({ items_count: 3 });
      window.addEventListener(
        'cart-updated',
        ((e: CustomEvent<StoreCart>) => {
          expect(e.detail.items_count).toBe(3);
          resolve();
        }) as EventListener,
        { once: true },
      );
      dispatchCartEvent(cart);
    }));
});

// ─── syncCart ─────────────────────────────────────────────────────────────

describe('syncCart', () => {
  it('fetches cart, saves to cache and dispatches event', async () => {
    const cart = makeCart({ items_count: 2 });
    vi.mocked(storeApi.getCart).mockResolvedValueOnce(cart);

    const received: StoreCart[] = [];
    window.addEventListener(
      'cart-updated',
      ((e: CustomEvent<StoreCart>) => received.push(e.detail)) as EventListener,
    );

    const result = await syncCart();

    expect(result).toEqual(cart);
    expect(getCachedCart()).toEqual(cart);
    expect(received.length).toBeGreaterThanOrEqual(1);
    expect(received[0]).toEqual(cart);
  });

  it('propagates errors from the Store API', async () => {
    vi.mocked(storeApi.getCart).mockRejectedValueOnce(new Error('Network error'));
    await expect(syncCart()).rejects.toThrow('Network error');
  });
});

// ─── addToCart ────────────────────────────────────────────────────────────

describe('addToCart', () => {
  it('calls storeApi.addItem and updates cache', async () => {
    const cart = makeCart({ items_count: 1 });
    vi.mocked(storeApi.addItem).mockResolvedValueOnce(cart);

    const result = await addToCart(42, 1);

    expect(storeApi.addItem).toHaveBeenCalledWith(42, 1);
    expect(result).toEqual(cart);
    expect(getCachedCart()).toEqual(cart);
  });

  it('throws when Store API fails', async () => {
    vi.mocked(storeApi.addItem).mockRejectedValueOnce(new Error('Out of stock'));
    await expect(addToCart(99, 1)).rejects.toThrow('Out of stock');
  });
});

// ─── updateCartQuantity ───────────────────────────────────────────────────

describe('updateCartQuantity', () => {
  it('calls storeApi.updateItem with correct key and quantity', async () => {
    const cart = makeCart({ items_count: 2 });
    vi.mocked(storeApi.updateItem).mockResolvedValueOnce(cart);

    const result = await updateCartQuantity('abc123', 3);

    expect(storeApi.updateItem).toHaveBeenCalledWith('abc123', 3);
    expect(result).toEqual(cart);
  });

  it('throws when update fails', async () => {
    vi.mocked(storeApi.updateItem).mockRejectedValueOnce(new Error('Item not found'));
    await expect(updateCartQuantity('bad-key', 2)).rejects.toThrow('Item not found');
  });
});

// ─── removeFromCart ───────────────────────────────────────────────────────

describe('removeFromCart', () => {
  it('calls storeApi.removeItem and updates cache', async () => {
    const cart = makeCart({ items_count: 0 });
    vi.mocked(storeApi.removeItem).mockResolvedValueOnce(cart);

    const result = await removeFromCart('key-xyz');

    expect(storeApi.removeItem).toHaveBeenCalledWith('key-xyz');
    expect(result).toEqual(cart);
    expect(getCachedCart()).toEqual(cart);
  });
});

// ─── applyCoupon ──────────────────────────────────────────────────────────

describe('applyCoupon', () => {
  it('applies a valid coupon code and updates cart state', async () => {
    const cartWithCoupon = makeCouponCart('SUMMER10', '100');
    vi.mocked(storeApi.applyCoupon).mockResolvedValueOnce(cartWithCoupon);

    const result = await applyCoupon('SUMMER10');

    expect(storeApi.applyCoupon).toHaveBeenCalledWith('SUMMER10');
    expect(result.coupons).toHaveLength(1);
    expect(result.coupons[0].code).toBe('SUMMER10');
    expect(result.totals.total_discount).toBe('100');
  });

  it('saves the updated cart to localStorage after applying', async () => {
    const cartWithCoupon = makeCouponCart('FLASH20', '200');
    vi.mocked(storeApi.applyCoupon).mockResolvedValueOnce(cartWithCoupon);

    await applyCoupon('FLASH20');

    const cached = getCachedCart();
    expect(cached).not.toBeNull();
    expect(cached!.coupons[0].code).toBe('FLASH20');
  });

  it('dispatches cart-updated event after applying coupon', async () => {
    const cartWithCoupon = makeCouponCart('VIP50', '500');
    vi.mocked(storeApi.applyCoupon).mockResolvedValueOnce(cartWithCoupon);

    const received: StoreCart[] = [];
    window.addEventListener(
      'cart-updated',
      ((e: CustomEvent<StoreCart>) => received.push(e.detail)) as EventListener,
      { once: true },
    );

    await applyCoupon('VIP50');

    expect(received).toHaveLength(1);
    expect(received[0].coupons[0].code).toBe('VIP50');
  });

  it('throws and does not update cache when coupon is invalid', async () => {
    vi.mocked(storeApi.applyCoupon).mockRejectedValueOnce(
      new Error('Coupon "INVALID" does not exist!'),
    );

    await expect(applyCoupon('INVALID')).rejects.toThrow('Coupon "INVALID" does not exist!');
    expect(getCachedCart()).toBeNull();
  });

  it('throws when coupon has already been applied', async () => {
    vi.mocked(storeApi.applyCoupon).mockRejectedValueOnce(
      new Error('Coupon code already applied!'),
    );

    await expect(applyCoupon('DUPE')).rejects.toThrow('Coupon code already applied!');
  });

  it('handles lowercase coupon codes', async () => {
    const cart = makeCouponCart('sale10', '100');
    vi.mocked(storeApi.applyCoupon).mockResolvedValueOnce(cart);

    const result = await applyCoupon('sale10');

    expect(storeApi.applyCoupon).toHaveBeenCalledWith('sale10');
    expect(result.coupons[0].code).toBe('sale10');
  });
});

// ─── removeCoupon ────────────────────────────────────────────────────────

describe('removeCoupon', () => {
  it('removes an applied coupon and returns updated cart', async () => {
    const clearedCart = makeCart({ coupons: [], totals: { ...makeCart().totals, total_discount: '0' } });
    vi.mocked(storeApi.removeCoupon).mockResolvedValueOnce(clearedCart);

    const result = await removeCoupon('SUMMER10');

    expect(storeApi.removeCoupon).toHaveBeenCalledWith('SUMMER10');
    expect(result.coupons).toHaveLength(0);
    expect(result.totals.total_discount).toBe('0');
  });

  it('saves the cleared cart to localStorage after removal', async () => {
    const clearedCart = makeCart({ coupons: [] });
    vi.mocked(storeApi.removeCoupon).mockResolvedValueOnce(clearedCart);

    await removeCoupon('FLASH20');

    const cached = getCachedCart();
    expect(cached).not.toBeNull();
    expect(cached!.coupons).toHaveLength(0);
  });

  it('dispatches cart-updated event after removing coupon', async () => {
    const clearedCart = makeCart({ coupons: [] });
    vi.mocked(storeApi.removeCoupon).mockResolvedValueOnce(clearedCart);

    const received: StoreCart[] = [];
    window.addEventListener(
      'cart-updated',
      ((e: CustomEvent<StoreCart>) => received.push(e.detail)) as EventListener,
      { once: true },
    );

    await removeCoupon('VIP50');

    expect(received).toHaveLength(1);
    expect(received[0].coupons).toHaveLength(0);
  });

  it('throws and does not update cache when removal fails', async () => {
    vi.mocked(storeApi.removeCoupon).mockRejectedValueOnce(
      new Error('Coupon does not exist in cart.'),
    );

    await expect(removeCoupon('GHOST')).rejects.toThrow('Coupon does not exist in cart.');
    expect(getCachedCart()).toBeNull();
  });
});

// ─── coupon + cart state integration ─────────────────────────────────────

describe('coupon + cart state integration', () => {
  it('reflects multiple sequential coupon operations in cache', async () => {
    const withCoupon = makeCouponCart('FIRST', '100');
    const withoutCoupon = makeCart({ coupons: [] });

    vi.mocked(storeApi.applyCoupon).mockResolvedValueOnce(withCoupon);
    vi.mocked(storeApi.removeCoupon).mockResolvedValueOnce(withoutCoupon);

    await applyCoupon('FIRST');
    expect(getCachedCart()!.coupons).toHaveLength(1);

    await removeCoupon('FIRST');
    expect(getCachedCart()!.coupons).toHaveLength(0);
  });

  it('total_discount is authoritative from WooCommerce — never computed on frontend', async () => {
    const cart = makeCouponCart('NOMATH', '300');
    vi.mocked(storeApi.applyCoupon).mockResolvedValueOnce(cart);

    const result = await applyCoupon('NOMATH');

    // Confirm discount is taken directly from the API payload, not computed
    expect(result.totals.total_discount).toBe('300');
    expect(result.totals.total_price).toBe('700');
  });
});
