const API_KEY = import.meta.env.LEMONSQUEEZY_API_KEY;
const STORE_ID = import.meta.env.LEMONSQUEEZY_STORE_ID;

interface LemonSqueezyOrder {
  id: string;
  attributes: {
    user_email: string;
    status: string;
    refunded: boolean;
  };
}

export async function verifyPurchaseByEmail(email: string): Promise<boolean> {
  if (!API_KEY) {
    // Dev mode: skip verification when no API key is configured
    console.warn('LEMONSQUEEZY_API_KEY not configured — dev mode, skipping verification');
    return true;
  }

  try {
    const url = new URL('https://api.lemonsqueezy.com/v1/orders');
    url.searchParams.set('filter[user_email]', email);
    if (STORE_ID) {
      url.searchParams.set('filter[store_id]', STORE_ID);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/vnd.api+json',
      },
    });

    if (!res.ok) {
      console.error('Lemon Squeezy API error:', res.status);
      return false;
    }

    const data = await res.json();
    const orders: LemonSqueezyOrder[] = data.data || [];

    // Check if any order is paid and not refunded
    return orders.some(
      (order) =>
        order.attributes.status === 'paid' && !order.attributes.refunded
    );
  } catch (err) {
    console.error('Error verifying purchase:', err);
    return false;
  }
}
