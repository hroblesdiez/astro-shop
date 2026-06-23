import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { paymentIntentId, orderId } = body;

    if (!paymentIntentId || !orderId) {
      return new Response(
        JSON.stringify({ message: 'Missing paymentIntentId or orderId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata: { orderId: String(orderId) },
      description: `Order #${orderId}`,
    });

    return new Response(
      JSON.stringify({ status: 'updated', paymentIntentId: paymentIntent.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[UpdatePaymentIntent] Error:', error);
    return new Response(
      JSON.stringify({ message: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
