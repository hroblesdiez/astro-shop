import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
//#region src/pages/api/cart/[...path].ts
var ____path__exports = /* @__PURE__ */ __exportAll({ ALL: () => ALL });
var ALL = async ({ params, request }) => {
	const pathSuffix = params.path ? `/${params.path}` : "";
	const targetUrl = `${"http://138.2.172.187/graphql".replace(/\/graphql$/, "")}/wp-json/wc/store/v1/cart${pathSuffix}`;
	console.log(`[Proxy] ${request.method} -> ${targetUrl}`);
	const cartToken = request.headers.get("Cart-Token");
	const contentType = request.headers.get("Content-Type");
	const nonce = request.headers.get("Nonce") || request.headers.get("X-WC-Store-API-Nonce");
	const headers = { "Accept": "application/json" };
	if (cartToken) headers["Cart-Token"] = cartToken;
	if (contentType) headers["Content-Type"] = contentType;
	if (nonce) {
		headers["X-WC-Store-API-Nonce"] = nonce;
		headers["Nonce"] = nonce;
	}
	const options = {
		method: request.method,
		headers
	};
	if (request.method !== "GET" && request.method !== "HEAD") {
		const textBody = await request.text();
		if (textBody) options.body = textBody;
	}
	try {
		const remoteResponse = await fetch(targetUrl, options);
		const data = await remoteResponse.json().catch(() => ({}));
		const remoteNonce = remoteResponse.headers.get("Nonce") || remoteResponse.headers.get("X-WC-Store-API-Nonce");
		const remoteCartToken = remoteResponse.headers.get("Cart-Token");
		if (remoteNonce) console.log(`[Proxy] Captured Nonce from WP: ${remoteNonce}`);
		else console.log(`[Proxy] No Nonce found in WP response headers. Status: ${remoteResponse.status}`);
		const responseHeaders = {
			"Content-Type": "application/json",
			"Access-Control-Expose-Headers": "X-WC-Store-API-Nonce, Nonce, Cart-Token"
		};
		if (remoteNonce) {
			responseHeaders["X-WC-Store-API-Nonce"] = remoteNonce;
			responseHeaders["Nonce"] = remoteNonce;
		}
		if (remoteCartToken) responseHeaders["Cart-Token"] = remoteCartToken;
		return new Response(JSON.stringify(data), {
			status: remoteResponse.status,
			headers: responseHeaders
		});
	} catch (error) {
		console.error("[Proxy Error]", error);
		return new Response(JSON.stringify({
			message: "Internal Proxy Error",
			error: error?.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/cart/[...path]@_@ts
var page = () => ____path__exports;
//#endregion
export { page };
