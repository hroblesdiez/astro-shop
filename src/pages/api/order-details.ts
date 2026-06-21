import type { APIRoute } from "astro";
import { getOrderDetails } from "../../lib/checkout-service";

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json();
    const { orderId, orderKey, billingEmail } = body;

    console.log("[API order-details] Received:", { orderId, orderKey });

    if (!orderId || !orderKey || !billingEmail) {
      console.log("[API order-details] Missing params");
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Order ID and key are required",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    console.log("[API order-details] Calling getOrderDetails...");
    const result = await getOrderDetails(orderId, orderKey, billingEmail);
    console.log("[API order-details] Result:", result);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API order-details] Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: "SERVER_ERROR", message: String(error) },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
