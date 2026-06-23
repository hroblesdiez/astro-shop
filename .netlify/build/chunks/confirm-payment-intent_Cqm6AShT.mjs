import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import Stripe from "stripe";
//#region src/pages/api/stripe/confirm-payment-intent.ts
var confirm_payment_intent_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var stripe = new Stripe("sk_test_51Tl3c8BAxuipU9deUiF3WiTe6leg1sHZEdSb3xnF87lvqlf6Eoxt9y218pJR26uQQ4KQlyy0Fk6HL43YU8maq6Z500ZuEu4AtE", { apiVersion: "2024-04-10" });
var POST = async ({ request }) => {
	try {
		const { paymentIntentId } = await request.json();
		if (!paymentIntentId) return new Response(JSON.stringify({ message: "Missing paymentIntentId" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		console.log("[ConfirmPayment] Checking status for:", paymentIntentId);
		const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
		console.log("[ConfirmPayment] Status:", paymentIntent.status);
		return new Response(JSON.stringify({
			status: paymentIntent.status,
			paymentIntentId: paymentIntent.id,
			amount: paymentIntent.amount,
			currency: paymentIntent.currency,
			orderId: paymentIntent.metadata?.orderId
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("[ConfirmPayment] Error:", error);
		return new Response(JSON.stringify({ message: error.message || "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/stripe/confirm-payment-intent@_@ts
var page = () => confirm_payment_intent_exports;
//#endregion
export { page };
