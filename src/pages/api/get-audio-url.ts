import type { APIRoute } from 'astro';
import { verifyPurchaseByEmail } from '../../lib/lemon-squeezy';
import { getSignedAudioUrl } from '../../lib/audio-storage';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();
    const sessionSlug = body.sessionSlug;

    if (!email || !sessionSlug) {
      return new Response(JSON.stringify({ error: 'Email and session slug are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify the user has purchased
    const verified = await verifyPurchaseByEmail(email);
    if (!verified) {
      return new Response(JSON.stringify({ error: 'Purchase not found' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate signed URL
    const url = await getSignedAudioUrl(sessionSlug);
    if (!url) {
      return new Response(JSON.stringify({ error: 'Audio file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
