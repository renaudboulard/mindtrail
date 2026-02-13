import { v as verifyPurchaseByEmail } from '../../chunks/lemon-squeezy_CG7k4wWx.mjs';
export { renderers } from '../../renderers.mjs';

const VALID_SESSIONS = [
  "session-1",
  "session-2",
  "session-3",
  "session-4",
  "session-5",
  "session-6",
  "session-7",
  "bonus"
];
async function getSignedAudioUrl(sessionSlug) {
  if (!VALID_SESSIONS.includes(sessionSlug)) {
    return null;
  }
  {
    console.error("R2 credentials not configured");
    return null;
  }
}

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();
    const sessionSlug = body.sessionSlug;
    if (!email || !sessionSlug) {
      return new Response(JSON.stringify({ error: "Email and session slug are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const verified = await verifyPurchaseByEmail(email);
    if (!verified) {
      return new Response(JSON.stringify({ error: "Purchase not found" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = await getSignedAudioUrl(sessionSlug);
    if (!url) {
      return new Response(JSON.stringify({ error: "Audio file not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
