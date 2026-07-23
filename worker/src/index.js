/* ============================================================
   Inspire Generator — Cloudflare Worker (AI Proxy)
   Holds the real DashScope API key as a secret.
   The Chrome extension never sees the key.
   ============================================================ */

export default {
  async fetch(request, env) {
    // Only accept POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // CORS — allow extension origins
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Auth check — extension sends a shared token so random people
    // can't abuse your proxy. Token is NOT the DashScope key.
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    if (token !== env.PROXY_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Rate limit: cap max_tokens to prevent abuse
    if (body.max_tokens > 500) body.max_tokens = 500;

    // Forward to DashScope (阿里云百炼)
    const upstream = await fetch(env.AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.AI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const result = await upstream.text();
    return new Response(result, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  },
};
