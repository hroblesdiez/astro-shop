import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { amount, currency, orderId, customerEmail } = body;

    if (!amount || !currency) {
      return new Response(
        JSON.stringify({ message: 'Missing amount or currency' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[PaymentIntent] Creating for amount:', amount, currency);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      description: orderId ? `Order #${orderId}` : 'Astro Shop Order',
      receipt_email: customerEmail,
      metadata: {
        orderId: orderId || 'unknown',
      },
    });

    console.log('[PaymentIntent] Created:', paymentIntent.id);

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[PaymentIntent] Error:', error);
    return new Response(
      JSON.stringify({ message: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
