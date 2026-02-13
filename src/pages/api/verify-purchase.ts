import type { APIRoute } from 'astro';
import { verifyPurchaseByEmail } from '../../lib/lemon-squeezy';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();

    if (!email) {
      return new Response(JSON.stringify({ verified: false, error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const verified = await verifyPurchaseByEmail(email);

    return new Response(JSON.stringify({ verified }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ verified: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
