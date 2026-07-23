/* ============================================================
   Inspire Generator — Background Service Worker (Manifest V3)
   - Proxies AI chat requests through Cloudflare Worker
   - Relays toolbar-icon clicks to the content script
   ============================================================ */

// AI 请求走 Cloudflare Worker 代理（key 在 Worker 服务端，插件里没有）
const AI_CONFIG = {
  proxyUrl: 'https://inspire-ai-proxy.REPLACE_SUBDOMAIN.workers.dev',
  proxyToken: '0HK4cTmFYZkaGtgZq7B4w5hn0tLXEX63',
  model: 'qwen-flash',
};

/* ---------- Toolbar icon click → toggle the in-page panel ---------- */
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'togglePanel' });
  } catch (e) {
    console.log('Content script not ready', e);
  }
});

/* ---------- Message router (popup iframe → background) ---------- */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && request.type === 'aiGenerate') {
    handleAiGenerate(request.payload)
      .then(sendResponse)
      .catch((err) => sendResponse({ ok: false, error: String(err) }));
    return true;
  }
});

/* ---------- AI call (via Cloudflare Worker proxy) ---------- */
async function handleAiGenerate({ systemPrompt, userPrompt, temperature = 1.0, maxTokens = 300 }) {
  const resp = await fetch(AI_CONFIG.proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.proxyToken}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: Math.min(maxTokens, 500),
    }),
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    throw new Error(`AI HTTP ${resp.status}: ${body.slice(0, 200)}`);
  }

  const data = await resp.json();
  let text = data.choices?.[0]?.message?.content?.trim();
  if (text) {
    text = text.replace(/```[\s\S]*?```/g, '').replace(/<\/?think>/gi, '').trim();
  }
  if (!text) throw new Error('AI returned empty content');
  return { ok: true, text };
}
