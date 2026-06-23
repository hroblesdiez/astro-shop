import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import Stripe from "stripe";
//#region src/pages/api/stripe/create-payment-intent.ts
var create_payment_intent_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var stripe = new Stripe("sk_test_51Tl3c8BAxuipU9deUiF3WiTe6leg1sHZEdSb3xnF87lvqlf6Eoxt9y218pJR26uQQ4KQlyy0Fk6HL43YU8maq6Z500ZuEu4AtE", { apiVersion: "2024-04-10" });
var POST = async ({ request }) => {
	try {
		const { amount, currency, orderId, customerEmail } = await request.json();
		if (!amount || !currency) return new Response(JSON.stringify({ message: "Missing amount or currency" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		console.log("[PaymentIntent] Creating for amount:", amount, currency);
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount),
			currency: currency.toLowerCase(),
			description: orderId ? `Order #${orderId}` : "Astro Shop Order",
			receipt_email: customerEmail,
			metadata: { orderId: orderId || "unknown" }
		});
		console.log("[PaymentIntent] Created:", paymentIntent.id);
		return new Response(JSON.stringify({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("[PaymentIntent] Error:", error);
		return new Response(JSON.stringify({ message: error.message || "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/stripe/create-payment-intent@_@ts
var page = () => create_payment_intent_exports;
//#endregion
export { page };
