import { t as __exportAll } from "./chunk_BBjsoOtd.mjs";
import Stripe from "stripe";
//#region src/pages/api/stripe/update-payment-intent.ts
var update_payment_intent_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var stripe = new Stripe("sk_test_51Tl3c8BAxuipU9deUiF3WiTe6leg1sHZEdSb3xnF87lvqlf6Eoxt9y218pJR26uQQ4KQlyy0Fk6HL43YU8maq6Z500ZuEu4AtE", { apiVersion: "2024-04-10" });
var POST = async ({ request }) => {
	try {
		const { paymentIntentId, orderId } = await request.json();
		if (!paymentIntentId || !orderId) return new Response(JSON.stringify({ message: "Missing paymentIntentId or orderId" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
			metadata: { orderId: String(orderId) },
			description: `Order #${orderId}`
		});
		return new Response(JSON.stringify({
			status: "updated",
			paymentIntentId: paymentIntent.id
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("[UpdatePaymentIntent] Error:", error);
		return new Response(JSON.stringify({ message: error.message || "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/stripe/update-payment-intent@_@ts
var page = () => update_payment_intent_exports;
//#endregion
export { page };
