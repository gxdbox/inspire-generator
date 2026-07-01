// 灵感发生器 - popup.js
// ===== 数据定义 =====
const SCENES = {"story":{"name":"故事","emoji":"📖","dimensions":[{"name":"故事风格","pool":[{"emoji":"💡","label":"发明故事","seed":"一个意外的发现改变了..."},{"emoji":"📉","label":"失败逆袭","seed":"在最绝望的时刻..."},{"emoji":"🤪","label":"荒诞真事","seed":"这听起来像假的但真的发生了..."},{"emoji":"🦋","label":"微小改变","seed":"一个微不足道的决定引发了..."},{"emoji":"🔗","label":"跨界碰撞","seed":"当___遇上___，奇迹发生了..."},{"emoji":"👶","label":"小孩思维","seed":"如果用一个孩子的眼光看..."},{"emoji":"🌿","label":"自然启发","seed":"从大自然的一个现象中..."},{"emoji":"✨","label":"美丽意外","seed":"本来想造A，却意外发现了B..."},{"emoji":"🏴‍☠️","label":"叛逆者","seed":"所有人都说不行，但..."},{"emoji":"🔀","label":"意外关联","seed":"两件毫不相干的事竟指向了..."}]},{"name":"主要角色","pool":["一个孤独的程序员","一个退休的老师","一个失眠的CEO","一个送外卖的诗人","一个开出租车的哲学家","一个在图书馆睡觉的流浪汉","一个偷偷画画的白领","一个养猫的科学家","一个不相信爱情的红娘","一个不会说话的歌手","一个强迫症艺术家","一个总是迟到的天才"]},{"name":"故事场景","pool":["凌晨三点的便利店","暴雨中的火车站","一个即将拆迁的书店","海底捞的角落座位","午夜过后的办公室","一个无人问津的博客","最后一班地铁","一个即将倒闭的唱片店","凌晨四点的医院走廊","一个被遗忘的QQ群","沙漠中的加油站","天台的黄昏"]}],"templates":["{style}：{character}在{scene}，{seed}","想象一下，{character}某天在{scene}，{seed}。这就是一个{style}的故事。","{seed}。而这一切，始于{character}在{scene}的那个普通下午。"]},"writing":{"name":"写作","emoji":"✍️","dimensions":[{"name":"文体","pool":["微小说","诗歌","散文","对话体","书信","日记体","寓言","讽刺短文"]},{"name":"主题","pool":["告别","重逢","秘密","选择","等待","陌生人","遗憾","勇气","时间","孤独"]},{"name":"氛围","pool":["温暖治愈","悬疑紧张","冷峻疏离","浪漫轻盈","黑色幽默","诡异迷离","平静如水"]}],"templates":["写一篇{style}，主题是{theme}，氛围{atmosphere}。","以{theme}为主题，用{style}的形式，营造{atmosphere}的氛围。","{atmosphere}的{style}，讲述一个关于{theme}的故事。"]},"coding":{"name":"编程","emoji":"💻","dimensions":[{"name":"项目类型","pool":["Chrome扩展","CLI工具","Web应用","VS Code插件","API服务","自动化脚本","数据可视化","小游戏"]},{"name":"技术栈","pool":["React+TypeScript","Vanilla JS","Python+FastAPI","Node.js","Rust+WASM","Svelte","Tailwind+Alpine","Deno"]},{"name":"创新角度","pool":["解决一个没人注意的小痛点","把一个复杂功能做到极致简单","用AI增强现有工具","离线优先的PWA","隐私优先的设计","为特殊人群设计","极致性能优化","跨平台同步"]}],"templates":["做一个{project}，用{tech}实现，{angle}。","用{tech}开发一个{project}，{angle}。","{angle}的{project}，基于{tech}构建。"]},"product":{"name":"产品","emoji":"🚀","dimensions":[{"name":"目标用户","pool":["程序员","自由职业者","大学生","宝妈","退休老人","小店主","打工人","创作者"]},{"name":"需求场景","pool":["节省时间","减少焦虑","记录生活","学习技能","社交连接","健康管理","省钱","找灵感"]},{"name":"商业模式","pool":["免费+增值","订阅制","一次性付费","广告+隐私","开源+托管","课程+社群","工具+服务","硬件+软件"]}],"templates":["为{user}打造一个{need}的产品，采用{business}模式。","帮助{user}{need}，通过{business}变现。","面向{user}的{need}方案，{business}模式。"]},"life":{"name":"生活","emoji":"🌱","dimensions":[{"name":"生活领域","pool":["工作方式","人际关系","消费习惯","时间管理","健康习惯","学习成长","居家环境","社交活动"]},{"name":"改变方向","pool":["做减法","做加法","重新定义","回归本质","跨界融合","游戏化","自动化","仪式感"]},{"name":"最小行动","pool":["每天5分钟","每周一次","替换一个旧习惯","扔掉一件东西","记录一件事","跟一个人聊聊","尝试新东西","写下来"]}],"templates":["在{area}上{direction}，从{action}开始。","尝试在{area}中{direction}，第一步是{action}。","{direction}你的{area}，只需要{action}。"]},"random":{"name":"随机","emoji":"🎲","dimensions":[{"name":"第一维度","pool":["时间","空间","声音","颜色","数字","味道","温度","速度"]},{"name":"第二维度","pool":["倒过来看","放大100倍","压缩到1秒","跟相反的对调","让它唱歌","跟10年前对话","如果它有感情","改成圆的"]},{"name":"第三维度","pool":["然后记录发生了什么","问一个5岁小孩的看法","写给100年后的人看","用emoji讲这个故事","设计成一场游戏","变成一个仪式","做成一个产品","画成一幅画"]}],"templates":["把{first}作为起点，{second}，{third}。","关于{first}的思考：{second}，{third}。","想象{first}如果{second}，{third}。"]}};
const METHODS = [{"id":"scamper","name":"SCAMPER 法","emoji":"🔄","desc":"替代/合并/改造/调整/改变用途/消除/逆转"},{"id":"whatif","name":"如果？","emoji":"❓","desc":"不断追问如果会怎样"},{"id":"reverse","name":"反向思考","emoji":"🔁","desc":"把问题完全倒过来想"},{"id":"analogy","name":"类比法","emoji":"🔗","desc":"用其他领域的事物类比"},{"id":"constraint","name":"约束法","emoji":"⛓️","desc":"给自己加极端限制条件"},{"id":"random","name":"随机词法","emoji":"🎲","desc":"随机选一个词强行关联"},{"id":"worst","name":"最坏方案","emoji":"💀","desc":"先想最糟糕的方案再反转"},{"id":"triz","name":"矛盾解决","emoji":"⚖️","desc":"列出矛盾寻找双赢方案"},{"id":"future","name":"未来视角","emoji":"🔮","desc":"站在未来回看现在"},{"id":"empathy","name":"换位思考","emoji":"💭","desc":"站在完全不同的人的角度"}];
const RARITY = {common:{label:"普通",emoji:"",weight:55,color:"#6366f1"},fine:{label:"优质",emoji:"💎",weight:25,color:"#8b5cf6"},rare:{label:"稀有",emoji:"🌟",weight:12,color:"#f59e0b"},epic:{label:"史诗",emoji:"🔥",weight:6,color:"#ef4444"},legendary:{label:"传说",emoji:"👑",weight:2,color:"#ff6b9d"}};
const RARITY_KEYS = Object.keys(RARITY);
const RARITY_TOAST = {epic:"🔥 史诗级灵感！万里挑一！",legendary:"👑 传说级灵感！天选之人！"};
const ENCOURAGEMENTS = ["✨ 不完美的开始胜过完美的等待","🌟 每一个灵感都值得被记录","💪 你离突破只差一个灵感的距离","🎯 创意的秘诀就是不断碰撞","🚀 这个灵感有潜力的味道","🌈 保持这个状态，你会收获更多","⚡ 思维正在活跃中","🔥 你已经超越了昨天的自己","🎆 灵感爆发期！继续！","🏆 你就是创意之王！"];
const COMBO_ENCOURAGEMENTS = ["✨ 不完美的开始","🌟 再来一个！","💪 手感来了","🎯 渐入佳境","🚀 灵感涌现","🌈 思维打开中","⚡ 创意源源不断","🔥 进入状态了！","🎆 灵感爆发🔥","👑 10连击破纪录！"];
const IDENTITY_OPTIONS = [{id:"developer",label:"开发者",emoji:"💻"},{id:"designer",label:"设计师",emoji:"🎨"},{id:"writer",label:"写作者",emoji:"✍️"},{id:"founder",label:"创业者",emoji:"🚀"},{id:"marketer",label:"市场运营",emoji:"📈"},{id:"student",label:"学生",emoji:"🎓"},{id:"pm",label:"产品经理",emoji:"📋"},{id:"artist",label:"艺术创作者",emoji:"🎭"}];
const INTEREST_OPTIONS = ["人工智能","Web开发","移动应用","开源项目","写作创作","阅读","电影","音乐","设计","摄影","游戏","运动健身","心理学","商业","投资","教育","烹饪","旅行","语言学习","手工制作"];
const CANVAS_KEY = 'inspire_generator_data';

// ===== Storage =====
const storage = {
  get(keys) {
    return new Promise((resolve) => {
      try { chrome.storage.local.get(keys, resolve); }
      catch {
        const result = {};
        if (typeof keys === 'string') result[keys] = JSON.parse(localStorage.getItem(keys) || 'null');
        else if (Array.isArray(keys)) keys.forEach(k => { result[k] = JSON.parse(localStorage.getItem(k) || 'null'); });
        else if (typeof keys === 'object') Object.keys(keys).forEach(k => { result[k] = JSON.parse(localStorage.getItem(k) || JSON.stringify(keys[k])); });
        resolve(result);
      }
    });
  },
  set(data) {
    return new Promise((resolve) => {
      try { chrome.storage.local.set(data, resolve); }
      catch { Object.keys(data).forEach(k => localStorage.setItem(k, JSON.stringify(data[k]))); resolve(); }
    });
  },
};

// ===== State =====
let state = {
  currentScene: 'story', currentMethod: null, combo: 0, lastGenTime: 0,
  currentCard: null, favorites: [], settings: {}, userProfile: null,
  feedbackHistory: [], difficulties: [], customScenes: [], customMethods: [],
  sceneKeys: Object.keys(SCENES),
};

// ===== DOM refs =====
const $ = (id) => document.getElementById(id);
const sceneTabs = $('sceneTabs'), cardText = $('cardText'), rarityBadge = $('rarityBadge');
const dimensionTags = $('dimensionTags'), encouragement = $('encouragement');
const generateBtn = $('generateBtn'), cardInner = $('cardInner'), inspireCard = $('inspireCard');
const favActionBtn = $('favActionBtn'), methodBtn = $('methodBtn'), settingsBtn = $('settingsBtn');
const toastContainer = $('toastContainer'), favBtn = $('favBtn'), favCount = $('favCount');
const difficultyInput = $('difficultyInput'), difficultyToggle = $('difficultyToggle');
const feedbackBar = $('feedbackBar'), feedbackGood = $('feedbackGood'), feedbackBad = $('feedbackBad');
const mainPanel = $('mainPanel'), onboarding = $('onboarding');

// ===== Init =====
async function init() {
  const data = await storage.get([CANVAS_KEY, 'inspire_settings']);
  if (data[CANVAS_KEY]) {
    const saved = data[CANVAS_KEY];
    state.favorites = saved.favorites || [];
    state.userProfile = saved.userProfile || null;
    state.feedbackHistory = saved.feedbackHistory || [];
    state.difficulties = saved.difficulties || [];
    state.customScenes = saved.customScenes || [];
    state.customMethods = saved.customMethods || [];
    if (saved.customScenes?.length) {
      state.sceneKeys = [...Object.keys(SCENES), ...saved.customScenes.map(s => s.id)];
      Object.assign(SCENES, Object.fromEntries(saved.customScenes.map(s => [s.id, {name:s.name,emoji:s.emoji,dimensions:[{name:s.dim1,pool:s.dim1Pool.split(',')},{name:s.dim2,pool:s.dim2Pool.split(',')}],templates:['{dim1} + {dim2}']}])));
    }
  }
  state.settings = data.inspire_settings || {};
  if (state.settings?.apiUrl) state.settings.apiUrl = state.settings.apiUrl;
  renderSceneTabs();
  if (!state.userProfile) { onboarding.classList.remove('hidden'); mainPanel.classList.add('hidden'); renderOnboarding(); }
  else { generateBtn.textContent = '✨ 刷灵感'; }
  updateFavCount();
  bindEvents();
}

// ===== Onboarding =====
function renderOnboarding() {
  const identityGrid = $('identityGrid');
  identityGrid.innerHTML = IDENTITY_OPTIONS.map(o => `<button data-id="${o.id}">${o.emoji} ${o.label}</button>`).join('');
  const interestGrid = $('interestGrid');
  interestGrid.innerHTML = INTEREST_OPTIONS.map(o => `<button data-interest="${o}">${o}</button>`).join('');
  let selectedIdentity = null, selectedInterests = [];
  document.querySelectorAll('#identityGrid button').forEach(b => b.onclick = () => {
    document.querySelectorAll('#identityGrid button').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected'); selectedIdentity = b.dataset.id; checkDone();
  });
  document.querySelectorAll('#interestGrid button').forEach(b => b.onclick = () => {
    b.classList.toggle('selected');
    const v = b.dataset.interest;
    selectedInterests = selectedInterests.includes(v) ? selectedInterests.filter(x => x !== v) : [...selectedInterests, v];
    checkDone();
  });
  function checkDone() {
    $('onboardingDone').style.display = (selectedIdentity && selectedInterests.length >= 3) ? 'block' : 'none';
  }
  $('onboardingDone').onclick = async () => {
    state.userProfile = { identity: selectedIdentity, interests: selectedInterests };
    await saveState();
    onboarding.classList.add('hidden'); mainPanel.classList.remove('hidden');
    generateBtn.textContent = '✨ 刷灵感';
  };
}

// ===== Render Scene Tabs =====
function renderSceneTabs() {
  sceneTabs.innerHTML = state.sceneKeys.map(k => {
    const s = SCENES[k];
    return `<button class="scene-tab ${k === state.currentScene ? 'active' : ''}" data-scene="${k}">${s.emoji} ${s.name}</button>`;
  }).join('') + '<button class="scene-tab add-tab">＋</button>';
  sceneTabs.querySelectorAll('.scene-tab[data-scene]').forEach(b => b.onclick = () => {
    state.currentScene = b.dataset.scene; state.currentMethod = null;
    renderSceneTabs();
  });
  sceneTabs.querySelector('.add-tab').onclick = () => showPanel('newScenePanel');
}

// ===== Generate Inspiration =====
async function generateInspiration(methodOverride) {
  const scene = SCENES[state.currentScene];
  const now = Date.now();
  if (now - state.lastGenTime < 60000) { state.combo++; } else { state.combo = 0; }
  state.lastGenTime = now;

  // Roll rarity
  const rarityKey = rollRarity();
  const rarity = RARITY[rarityKey];

  // Pick random values from each dimension
  const picks = scene.dimensions.map(d => {
    const pool = d.pool;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return { dimName: d.name, pick: typeof pick === 'object' ? pick : { label: pick, seed: '' } };
  });

  // Pick template
  const template = scene.templates[Math.floor(Math.random() * scene.templates.length)];

  // Build card text
  let cardHtml = '';
  const sKey = state.currentScene;
  if (sKey === 'story') {
    const style = picks[0].pick;
    const character = picks[1].pick;
    const scene_place = picks[2].pick;
    const seed = style.seed || '';
    cardHtml = template
      .replace('{style}', `${style.emoji} ${style.label}`)
      .replace('{character}', typeof character === 'string' ? character : character.label)
      .replace('{scene}', typeof scene_place === 'string' ? scene_place : scene_place.label)
      .replace('{seed}', seed);
  } else if (sKey === 'writing') {
    cardHtml = template
      .replace('{style}', picks[0].pick.label || picks[0].pick)
      .replace('{theme}', picks[1].pick.label || picks[1].pick)
      .replace('{atmosphere}', picks[2].pick.label || picks[2].pick);
  } else if (sKey === 'coding') {
    cardHtml = template
      .replace('{project}', picks[0].pick.label || picks[0].pick)
      .replace('{tech}', picks[1].pick.label || picks[1].pick)
      .replace('{angle}', picks[2].pick.label || picks[2].pick);
  } else if (sKey === 'product') {
    cardHtml = template
      .replace('{user}', picks[0].pick.label || picks[0].pick)
      .replace('{need}', picks[1].pick.label || picks[1].pick)
      .replace('{business}', picks[2].pick.label || picks[2].pick);
  } else if (sKey === 'life') {
    cardHtml = template
      .replace('{area}', picks[0].pick.label || picks[0].pick)
      .replace('{direction}', picks[1].pick.label || picks[1].pick)
      .replace('{action}', picks[2].pick.label || picks[2].pick);
  } else { // random
    cardHtml = template
      .replace('{first}', picks[0].pick.label || picks[0].pick)
      .replace('{second}', picks[1].pick.label || picks[1].pick)
      .replace('{third}', picks[2].pick.label || picks[2].pick);
  }

  // Add method prefix
  if (state.currentMethod) cardHtml = `[${state.currentMethod}] ${cardHtml}`;

  // If AI configured, enhance
  if (state.settings.apiKey) {
    try { cardHtml = await aiGenerate(cardHtml, rarityKey); } catch {}
  }

  // Build dimension tags
  const tags = picks.map(p => typeof p.pick === 'object' && p.pick.label ? p.pick.label : p.pick).slice(0, 3);

  // Encouragement
  const comboIdx = Math.min(state.combo, COMBO_ENCOURAGEMENTS.length - 1);
  const enc = state.combo >= 1 ? `${state.combo}连击！${COMBO_ENCOURAGEMENTS[comboIdx]}` : ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];

  // Display
  rarityBadge.textContent = `${rarity.emoji} ${rarity.label}`;
  rarityBadge.style.color = rarity.color;
  cardText.textContent = cardHtml;
  dimensionTags.innerHTML = tags.map(t => `<span class="dimension-tag">${t}</span>`).join('');
  encouragement.textContent = enc;
  inspireCard.className = `inspire-card card-rarity-${rarityKey}`;

  state.currentCard = { text: cardHtml, rarity: rarityKey, scene: state.currentScene, tags, method: state.currentMethod };

  // Toast for epic/legendary
  if (RARITY_TOAST[rarityKey]) showToast(RARITY_TOAST[rarityKey]);

  // Show feedback
  feedbackBar.classList.remove('hidden');

  // Reset method after use
  state.currentMethod = null;
  generateBtn.textContent = state.combo >= 1 ? `✨ 刷灵感 (${state.combo})` : '✨ 刷灵感';
}

// ===== Rarity Roll =====
function rollRarity() {
  const total = RARITY_KEYS.reduce((s, k) => s + RARITY[k].weight, 0);
  let r = Math.random() * total;
  for (const k of RARITY_KEYS) {
    r -= RARITY[k].weight;
    if (r <= 0) return k;
  }
  return 'common';
}

// ===== AI Generate =====
async function aiGenerate(basicCard, rarityKey) {
  const scene = SCENES[state.currentScene];
  const isStory = state.currentScene === 'story';
  const difficulty = difficultyInput.value.trim() ? `\n用户遇到的困难：${difficultyInput.value.trim()}` : '';

  let profileContext = '';
  if (state.userProfile) {
    const idLabel = IDENTITY_OPTIONS.find(o => o.id === state.userProfile.identity)?.label || state.userProfile.identity;
    profileContext = `\n用户身份：${idLabel}\n用户兴趣：${state.userProfile.interests.join('、')}`;
  }

  let feedbackContext = '';
  if (state.feedbackHistory.length > 0) {
    const good = state.feedbackHistory.filter(f => f.vote === 'good').slice(-3).map(f => f.text).join(' | ');
    const bad = state.feedbackHistory.filter(f => f.vote === 'bad').slice(-3).map(f => f.text).join(' | ');
    if (good) feedbackContext += `\n用户喜欢的风格：${good}`;
    if (bad) feedbackContext += `\n用户不喜欢的风格：${bad}`;
  }

  const systemPrompt = isStory
    ? '你是一个天才故事讲述者。根据提供的素材创作一个100-150字的微型故事。必须有转折，有画面感，禁止说教或总结。'
    : '你是一个创意灵感生成器。根据提供的素材生成60-100字的创意灵感。要有情绪反应，让人眼前一亮。';

  const rarityBoost = rarityKey === 'legendary' ? '要求：这必须是一个令人震惊、前所未见的创意！' :
    rarityKey === 'epic' ? '要求：这是一个非常出色的创意，要让人印象深刻。' :
    rarityKey === 'rare' ? '要求：这是一个不错的创意，比普通的好一些。' : '';

  const userPrompt = `基于以下素材：${basicCard}${difficulty}${profileContext}${feedbackContext}\n${rarityBoost}`;

  try {
    const resp = await fetch(state.settings.apiUrl || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.settings.apiKey}` },
      body: JSON.stringify({
        model: state.settings.apiModel || 'qwen-plus',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        temperature: 1.0, max_tokens: 250,
      }),
    });
    const data = await resp.json();
    return data.choices?.[0]?.message?.content?.trim() || basicCard;
  } catch { return basicCard; }
}

// ===== Favorites =====
async function toggleFavorite() {
  if (!state.currentCard) return;
  const idx = state.favorites.findIndex(f => f.text === state.currentCard.text);
  if (idx >= 0) { state.favorites.splice(idx, 1); } else { state.favorites.unshift({ ...state.currentCard, savedAt: Date.now() }); }
  await saveState(); updateFavCount();
}
function updateFavCount() { favCount.textContent = state.favorites.length; }

// ===== Toast =====
function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  toastContainer.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ===== Save State =====
async function saveState() {
  await storage.set({
    [CANVAS_KEY]: {
      favorites: state.favorites,
      userProfile: state.userProfile,
      feedbackHistory: state.feedbackHistory,
      difficulties: state.difficulties,
      customScenes: state.customScenes,
      customMethods: state.customMethods,
    }
  });
}

// ===== Floating Panels =====
function showPanel(id) {
  document.querySelectorAll('.float-panel').forEach(p => p.classList.add('hidden'));
  $(id).classList.remove('hidden');
}
function hideAllPanels() {
  document.querySelectorAll('.float-panel').forEach(p => p.classList.add('hidden'));
}

// ===== Methods =====
function renderMethods() {
  const list = $('methodList');
  list.innerHTML = METHODS.map(m =>
    `<div class="method-item" data-method="${m.id}">
      <div class="method-name">${m.emoji} ${m.name}</div>
      <div class="method-desc">${m.desc}</div>
    </div>`
  ).join('');
  list.querySelectorAll('.method-item').forEach(el => el.onclick = () => {
    const id = el.dataset.method;
    const m = METHODS.find(x => x.id === id);
    state.currentMethod = m.name;
    hideAllPanels();
    generateInspiration();
  });
}

// ===== Settings =====
function loadSettings() {
  if (state.settings.apiKey) $('aiKey').value = state.settings.apiKey;
  if (state.settings.apiUrl) $('aiUrl').value = state.settings.apiUrl;
  if (state.settings.apiModel) $('aiModel').value = state.settings.apiModel;
}

// ===== Favorites Panel =====
function renderFavorites() {
  const list = $('favList');
  list.innerHTML = state.favorites.map((f, i) =>
    `<div class="fav-item">
      <div class="fav-text">${f.text}</div>
      <div class="fav-actions">
        <button data-action="edit" data-idx="${i}">✏️</button>
        <button data-action="product" data-idx="${i}">🚀</button>
        <button data-action="delete" data-idx="${i}">🗑️</button>
      </div>
    </div>`
  ).join('');
  list.querySelectorAll('[data-action="delete"]').forEach(b => b.onclick = async () => {
    state.favorites.splice(parseInt(b.dataset.idx), 1);
    await saveState(); updateFavCount(); renderFavorites();
  });
  list.querySelectorAll('[data-action="product"]').forEach(b => b.onclick = () => {
    const idx = parseInt(b.dataset.idx);
    $('productContent').textContent = `基于灵感：「${state.favorites[idx].text}」\n\n---\n\n产品方案生成中...\n（需要配置 AI Key）`;
    hideAllPanels(); showPanel('productPanel');
  });
}

// ===== Bind Events =====
function bindEvents() {
  generateBtn.onclick = () => generateInspiration();
  favActionBtn.onclick = toggleFavorite;
  feedbackGood.onclick = async () => {
    if (state.currentCard) { state.feedbackHistory.push({ text: state.currentCard.text, vote: 'good', time: Date.now() }); await saveState(); }
    feedbackBar.classList.add('hidden');
  };
  feedbackBad.onclick = async () => {
    if (state.currentCard) { state.feedbackHistory.push({ text: state.currentCard.text, vote: 'bad', time: Date.now() }); await saveState(); }
    feedbackBar.classList.add('hidden');
  };
  methodBtn.onclick = () => { renderMethods(); showPanel('methodPanel'); };
  settingsBtn.onclick = () => { loadSettings(); showPanel('settingsPanel'); };
  favBtn.onclick = () => { renderFavorites(); showPanel('favPanel'); };
  difficultyToggle.onclick = () => {
    const textarea = difficultyInput;
    const arrow = difficultyToggle.querySelector('.toggle-arrow');
    textarea.classList.toggle('hidden');
    arrow.textContent = textarea.classList.contains('hidden') ? '▾' : '▴';
  };
  $('saveSettings').onclick = async () => {
    state.settings = {
      apiKey: $('aiKey').value,
      apiUrl: $('aiUrl').value || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
      apiModel: $('aiModel').value || 'qwen-plus',
    };
    await storage.set({ inspire_settings: state.settings });
    showToast('✅ 设置已保存');
    hideAllPanels();
  };
  $('nsSave').onclick = async () => {
    const name = $('nsName').value.trim();
    if (!name) return showToast('请输入场景名称');
    const id = `custom_${Date.now()}`;
    const scene = {
      id, name, emoji: $('nsEmoji').value || '📦',
      dim1: $('nsDim1').value || '维度1', dim1Pool: $('nsDim1Pool').value || '素材1',
      dim2: $('nsDim2').value || '维度2', dim2Pool: $('nsDim2Pool').value || '素材2',
    };
    state.customScenes.push(scene);
    state.sceneKeys.push(id);
    Object.assign(SCENES, { [id]: { name: scene.name, emoji: scene.emoji, dimensions: [{ name: scene.dim1, pool: scene.dim1Pool.split(',') }, { name: scene.dim2, pool: scene.dim2Pool.split(',') }], templates: ['{dim1} + {dim2}'] } });
    await saveState();
    renderSceneTabs();
    showToast(`✅ 场景「${name}」已创建`);
    hideAllPanels();
  };

  // Close buttons
  document.querySelectorAll('.close-btn').forEach(b => b.onclick = () => hideAllPanels());
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
