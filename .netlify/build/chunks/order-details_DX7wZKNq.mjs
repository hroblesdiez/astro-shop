import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
//#region src/lib/store-api.ts
var CART_TOKEN_KEY = "woo_cart_token";
var CART_NONCE_KEY = "woo_cart_nonce";
function getOrCreateCartToken() {
	if (typeof window === "undefined") return "";
	let token = localStorage.getItem(CART_TOKEN_KEY);
	if (!token) {
		token = crypto.randomUUID();
		persistCartToken(token);
	}
	return token;
}
function getStoreApiUrl() {
	if (typeof window === "undefined") return `${"http://138.2.172.187/graphql".replace(/\/graphql$/, "")}/wp-json/wc/store/v1/cart`;
	return "/api/cart";
}
function getCheckoutApiUrl() {
	if (typeof window === "undefined") return "http://138.2.172.187/graphql".replace(/\/graphql$/, "") + "/wp-json/wc/store/v1/checkout";
	return "/api/checkout";
}
async function requestStoreApi(method, endpointSuffix = "", body, cartToken, baseUrlOverride) {
	const url = `${baseUrlOverride ?? getStoreApiUrl()}${endpointSuffix}`;
	const headers = {
		Accept: "application/json",
		"Cart-Token": cartToken ?? getOrCreateCartToken()
	};
	if (typeof window !== "undefined") {
		const nonce = localStorage.getItem(CART_NONCE_KEY);
		if (nonce) {
			headers["X-WC-Store-API-Nonce"] = nonce;
			headers["Nonce"] = nonce;
		}
	}
	if (body) headers["Content-Type"] = "application/json";
	const options = {
		method,
		headers
	};
	if (body) options.body = JSON.stringify(body);
	console.log(`[StoreAPI Request] ${method} ${url}`, body ? { body } : "");
	try {
		const response = await fetch(url, options);
		const freshNonce = response.headers.get("Nonce") || response.headers.get("X-WC-Store-API-Nonce");
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
			const message = errorData.message || `Store API request failed with status ${response.status}`;
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
async function requestOrderApi(orderId, orderKey, billingEmail) {
	const url = `${"http://138.2.172.187/graphql".replace(/\/graphql$/, "")}/wp-json/wc/store/v1/order/${orderId}?key=${orderKey}&billing_email=${encodeURIComponent(billingEmail)}`;
	const headers = { Accept: "application/json" };
	console.log(`[OrderAPI Request] GET ${url}`);
	try {
		const response = await fetch(url, {
			method: "GET",
			headers
		});
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error("[OrderAPI Error Response]", response.status, errorData);
			throw new Error(errorData.message || `Order API request failed with status ${response.status}`);
		}
		const data = await response.json();
		console.log("[OrderAPI Success Response]", data);
		return data;
	} catch (error) {
		console.error("[OrderAPI Network/Fetch Exception]", error);
		throw error;
	}
}
var storeApi = {
	getCart: (cartToken) => requestStoreApi("GET", "", void 0, cartToken),
	addItem: (id, quantity = 1, variation) => {
		const body = {
			id,
			quantity
		};
		if (variation && variation.length > 0) body.variation = variation;
		return requestStoreApi("POST", "/add-item", body);
	},
	updateItem: (key, quantity) => requestStoreApi("POST", "/update-item", {
		key,
		quantity
	}),
	removeItem: (key) => requestStoreApi("POST", "/remove-item", { key }),
	applyCoupon: (code) => requestStoreApi("POST", "/apply-coupon", { code }),
	removeCoupon: (code) => requestStoreApi("POST", "/remove-coupon", { code }),
	updateCustomer: (customerData) => requestStoreApi("POST", "/update-customer", customerData),
	checkout: (payload) => requestStoreApi("POST", "", payload, void 0, getCheckoutApiUrl()),
	getOrder: (orderId, orderKey, billingEmail) => requestOrderApi(orderId, orderKey, billingEmail)
};
function persistCartToken(token) {
	if (typeof window === "undefined") return;
	localStorage.setItem(CART_TOKEN_KEY, token);
	document.cookie = [
		`${CART_TOKEN_KEY}=${token}`,
		"Path=/",
		"Max-Age=31536000",
		"SameSite=Lax"
	].join("; ");
}
//#endregion
//#region src/lib/checkout-service.ts
var parseStoreApiError = (error) => {
	if (error?.message && typeof error.message === "string") {
		const match = error.message.match(/\[([^\]]+)\]\s*(.*)/);
		if (match) return {
			code: match[1],
			message: match[2]
		};
		return {
			code: "STORE_API_ERROR",
			message: error.message
		};
	}
	return {
		code: "UNKNOWN_ERROR",
		message: "An unexpected error occurred"
	};
};
var getOrderDetails = async (orderId, orderKey, billingEmail) => {
	try {
		console.log("[Order Details] Fetching order...");
		const order = await storeApi.getOrder(orderId, orderKey, billingEmail);
		console.log("[Order Details] Order fetched successfully");
		return {
			success: true,
			order
		};
	} catch (error) {
		console.error("[Order Details] Error:", error);
		return {
			success: false,
			error: parseStoreApiError(error)
		};
	}
};
//#endregion
//#region src/pages/api/order-details.ts
var order_details_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async (context) => {
	try {
		const { orderId, orderKey, billingEmail } = await context.request.json();
		console.log("[API order-details] Received:", {
			orderId,
			orderKey
		});
		if (!orderId || !orderKey || !billingEmail) {
			console.log("[API order-details] Missing params");
			return new Response(JSON.stringify({
				success: false,
				error: {
					code: "INVALID_INPUT",
					message: "Order ID and key are required"
				}
			}), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		console.log("[API order-details] Calling getOrderDetails...");
		const result = await getOrderDetails(orderId, orderKey, billingEmail);
		console.log("[API order-details] Result:", result);
		return new Response(JSON.stringify(result), {
			status: result.success ? 200 : 400,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("[API order-details] Error:", error);
		return new Response(JSON.stringify({
			success: false,
			error: {
				code: "SERVER_ERROR",
				message: String(error)
			}
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/order-details@_@ts
var page = () => order_details_exports;
//#endregion
export { page };
