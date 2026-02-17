import type { APIRoute } from 'astro';
import { getDemoAudioUrl } from '../../lib/audio-storage';

export const GET: APIRoute = async () => {
  const url = await getDemoAudioUrl();
  if (!url) {
    return new Response(JSON.stringify({ error: 'Demo audio not available' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
