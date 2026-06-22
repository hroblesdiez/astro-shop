export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  orderId?: string;
  customerEmail?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export const createPaymentIntent = async (
  data: CreatePaymentIntentRequest,
): Promise<CreatePaymentIntentResponse> => {
  const response = await fetch('/api/stripe/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create payment intent');
  }

  const result = await response.json();
  console.log('[StripeService] Payment intent created:', result.paymentIntentId);

  return result;
};

export const confirmPaymentIntent = async (paymentIntentId: string) => {
  const response = await fetch('/api/stripe/confirm-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentIntentId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to confirm payment');
  }

  return await response.json();
};
