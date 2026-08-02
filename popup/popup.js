// 灵感发生器 - popup.js
// 架构：每个 tab = 一段提示词，AI 纯生成内容

// ===== 数据定义 =====
const SCENES = {
  story: {
    name: '故事', emoji: '📖',
    prompt: `你是一个深谙故事之道的叙事天才，师承许荣哲《故事课》的核心理念。每次生成一个60-100字的微型故事开头。

你的故事内核（许荣哲故事公式的压缩版）：
- “一个人想要A，但遇到了B，他拼命努力，结果却得到了C”——这个“但”字就是故事的引擎
- 每个故事必须有一个“折磨读者”的钩子：给一点，藏一点，让人心里痒得要命
- “意料之外，情理之中”——转折要让人“卧槽”，但回头一想又觉得“对，只能是这样”

具体要求：
- 第一句话就要制造冲突或悬念（不要铺垫，直接扔炸弹）
- 必须有具体到能看见画面的细节（一个动作、一个物件、一句话）
- 人物要有反差（身份×行为的错位，让人物一出场就有故事）
- 在最高潮处戴然而止——不给结局，折磨读者
- 语气：像深夜跟朋友讲“卧槽你猜怎么着”，不是写作文
- 禁止：说教、总结、升华、“这个故事告诉我们”、标题、前缀说明
- 每次必须是完全不同的故事，题材、人物、场景、冲突类型都要变化`,
  },
  writing: {
    name: '写作', emoji: '✍️',
    prompt: `你是一个文字灵感缪斯。每次生成一段50-80字的写作灵感。
要求：
- 给出一个让人"手痒想写"的开头或视角
- 必须有一个具体的、非寻常的叙事角度（比如从一个物件、一个空间、一个时间点的视角）
- 要能让人立刻感受到一种情绪（不是"悲伤"这种标签，而是"删除聊天记录只用了两秒，忘掉用了两年"这种画面）
- 语气：像一个写作高手在咖啡馆跟你随口说"你试试这样写"
- 禁止：列清单、给步骤、"首先其次最后"、前缀说明
- 每次的情绪、视角、题材都要不同`,
  },
  coding: {
    name: '编程', emoji: '💻',
    prompt: `你是一个极客灵感炸弹。每次生成一个40-70字的编程创意。
要求：
- 从一个程序员/用户真实会骂娘的痛点出发
- 给出一个野路子但有可行性的解决方案（不是正经产品需求文档那种）
- 可以带点黑色幽默和自嘲
- 要具体到能想象出这个东西长什么样、怎么用
- 语气：像黑客松上那个最疯的队友在跟你pitch
- 禁止：空泛的"提升效率"、分点罗列、前缀说明
- 每次的痛点领域和技术方向都要不同`,
  },
  product: {
    name: '产品', emoji: '🚀',
    prompt: `你是一个产品灵感生成器。每次生成一段50-80字的产品创意。
要求：
- 从一个具体的"扎心瞬间"切入（不是"用户需要效率"这种废话）
- 给出一个反直觉的产品思路（不是"做一个app"这种平庸方案）
- 暗含一个增长飞轮或传播点
- 语气：像那个最会聊产品的朋友在饭桌上跟你比划"你想想看"
- 禁止：商业计划书语气、SWOT分析、前缀说明
- 每次的目标人群和切入角度都要不同`,
  },
  life: {
    name: '生活', emoji: '🌱',
    prompt: `你是一个生活实验设计师。每次生成一个30-60字的生活小实验。
要求：
- 一个今天就能做的、具体的小行动（不是"保持正念"这种正确的废话）
- 暗示一个意想不到的收获或蝴蝶效应
- 要让人看完就想"试试也无妨"
- 语气：像一个有趣的朋友在微信上发你"诶你今天试试这个"
- 禁止：鸡汤、说教、"你应该"、前缀说明
- 每次涉及的生活领域都要不同`,
  },
  book: {
    name: '刷书', emoji: '📚',
    prompt: `你是一个一分钟书籍精华提取器。每次生成一段150-250字的书籍精华速读。
要求：
- 随机选一本真实存在的好书（中外皆可，冷门好书优先于烂大街的成功学）
- 第一行格式：《书名》+ 作者名
- 用2-3句话提炼这本书最核心的一个洞见（不是内容简介，是那个让人"原来如此"的认知升级点）
- 必须包含一个书中最有冲击力的案例、实验或金句
- 最后用一句大白话说清"这本书适合什么人读"
- 语气：像一个博览群书的朋友在电梯里用60秒给你安利一本书，兴奋但不浮夸
- 禁止：豆瓣式书评腔、"本书讲述了"开头、罗列章节、前缀说明
- 每次的书必须完全不同，领域、年代、国家都要变化`,
  },
  random: {
    name: '脑洞', emoji: '🎲',
    prompt: `你是一个脑洞制造机。每次生成一个40-70字的荒诞思想实验。
要求：
- 一个"如果…会怎样"的荒诞前提（要具体、有画面感，不是"如果世界没有重力"这种老套的）
- 推演一个让人"哈哈哈但是细想又有点道理"的结果
- 可以跟当代生活、互联网、打工人、社交媒体等元素结合
- 语气：像凌晨两点朋友突然发来的那条"你想想看如果…"
- 禁止：科学解释、教育意义、前缀说明
- 每次的脑洞方向都要完全不同`,
  },
};
const METHODS = [{"id":"scamper","name":"SCAMPER 法","emoji":"🔄","desc":"替代/合并/改造/调整/改变用途/消除/逆转","prompt":"用SCAMPER法进行创意发散："},{"id":"whatif","name":"如果？","emoji":"❓","desc":"不断追问如果会怎样","prompt":"从极端假设出发："},{"id":"reverse","name":"反向思考","emoji":"🔁","desc":"把问题完全倒过来想","prompt":"完全反过来想："},{"id":"analogy","name":"类比法","emoji":"🔗","desc":"用其他领域的事物类比","prompt":"找一个完全无关的领域做类比："},{"id":"constraint","name":"约束法","emoji":"⛓️","desc":"给自己加极端限制条件","prompt":"在极端限制下思考："},{"id":"random","name":"随机词法","emoji":"🎲","desc":"随机选一个词强行关联","prompt":"强行关联一个随机概念："},{"id":"worst","name":"最坏方案","emoji":"💀","desc":"先想最糟糕的方案再反转","prompt":"先想最烂的方案，再反转："},{"id":"triz","name":"矛盾解决","emoji":"⚖️","desc":"列出矛盾寻找双赢方案","prompt":"找到核心矛盾并突破："},{"id":"future","name":"未来视角","emoji":"🔮","desc":"站在未来回看现在","prompt":"站在10年后回看："},{"id":"empathy","name":"换位思考","emoji":"💭","desc":"站在完全不同的人的角度","prompt":"换一个完全不同的身份来想："}];
const RARITY = {common:{label:"普通",emoji:"",weight:55,color:"#6366f1"},fine:{label:"优质",emoji:"💎",weight:25,color:"#8b5cf6"},rare:{label:"稀有",emoji:"🌟",weight:12,color:"#f59e0b"},epic:{label:"史诗",emoji:"🔥",weight:6,color:"#ef4444"},legendary:{label:"传说",emoji:"👑",weight:2,color:"#ff6b9d"}};
const RARITY_KEYS = Object.keys(RARITY);
const RARITY_TOAST = {epic:"🔥 史诗级灵感！万里挑一！",legendary:"👑 传说级灵感！天选之人！"};
const ENCOURAGEMENTS = ["✨ 这个有点意思，再刷一个？","🌟 你的大脑正在热身","💪 别停，下一条可能更炸","🎯 刚那个不行？下一个说不定就是它","🚀 灵感这东西，越刷越有","🌈 你的审美正在被训练","⚡ 手指别停，大脑已经热了","🔥 这个状态对了，继续刷","🎆 你已经刷出节奏感了","🏆 今天的手气不错啊"];
const COMBO_ENCOURAGEMENTS = ["✨ 开始热身","🌟 手感来了","💪 越刷越顺","🎯 进入状态","🚀 停不下来了","🌈 大脑在放烟花","⚡ 灵感连击！","🔥 手气爆棚🔥","🎆 今天是要爆的节奏","👑 10连击！你就是灵感体质"];
const IDENTITY_OPTIONS = [{id:"developer",label:"开发者",emoji:"💻"},{id:"designer",label:"设计师",emoji:"🎨"},{id:"writer",label:"写作者",emoji:"✍️"},{id:"founder",label:"创业者",emoji:"🚀"},{id:"marketer",label:"市场运营",emoji:"📈"},{id:"student",label:"学生",emoji:"🎓"},{id:"pm",label:"产品经理",emoji:"📋"},{id:"artist",label:"艺术创作者",emoji:"🎭"},{id:"other",label:"其他",emoji:"🌈"}];
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

// ===== 动态 Tab 配置 =====
const BASE_SCENES = ['random', 'story', 'life', 'book']; // 所有人必有的 4 个
const IDENTITY_SCENES = {
  developer: ['coding'],
  student: ['coding'],
  pm: ['product'],
  founder: ['product'],
  writer: ['writing'],
  designer: ['writing'],
  marketer: ['product'],
  artist: ['writing'],
};

function computeSceneKeys(profile) {
  let keys = [...BASE_SCENES];
  if (profile && profile.identity) {
    const id = profile.identity.startsWith('other:') ? 'other' : profile.identity;
    const extra = IDENTITY_SCENES[id] || [];
    extra.forEach(k => { if (!keys.includes(k)) keys.push(k); });
  }
  // 追加自定义场景
  if (state.customScenes.length) {
    state.customScenes.forEach(s => { if (!keys.includes(s.id)) keys.push(s.id); });
  }
  return keys;
}

// ===== State =====
let state = {
  currentScene: 'random', currentMethod: null, combo: 0, lastGenTime: 0,
  currentCard: null, favorites: [], settings: {}, userProfile: null,
  feedbackHistory: [], customScenes: [], bookHistory: [],
  sceneKeys: [...BASE_SCENES],
  todayCount: 0, todayDate: new Date().toDateString(),
  isGenerating: false,
};

// ===== DOM refs =====
const $ = (id) => document.getElementById(id);
const sceneTabs = $('sceneTabs'), cardText = $('cardText'), rarityBadge = $('rarityBadge');
const encouragement = $('encouragement');
const generateBtn = $('generateBtn'), inspireCard = $('inspireCard');
const favActionBtn = $('favActionBtn'), methodBtn = $('methodBtn');
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
    state.customScenes = saved.customScenes || [];
    state.bookHistory = saved.bookHistory || [];
    state.todayCount = saved.todayCount || 0;
    state.todayDate = saved.todayDate || new Date().toDateString();
    // 注册自定义场景
    if (state.customScenes.length) {
      state.customScenes.forEach(s => {
        SCENES[s.id] = { name: s.name, emoji: s.emoji, prompt: s.prompt };
      });
    }
    // 根据用户画像动态计算 tab
    state.sceneKeys = computeSceneKeys(state.userProfile);
  }
  if (state.todayDate !== new Date().toDateString()) {
    state.todayCount = 0;
    state.todayDate = new Date().toDateString();
  }
  state.settings = data.inspire_settings || {};
  renderSceneTabs();
  if (!state.userProfile) { onboarding.classList.remove('hidden'); mainPanel.classList.add('hidden'); renderOnboarding(); }
  else { generateBtn.textContent = '✨ 刷灵感'; }
  updateFavCount();
  bindEvents();
}

// ===== Onboarding =====
function renderOnboarding() {
  const identityGrid = $('identityGrid');
  const interestGrid = $('interestGrid');
  const otherInput = $('otherIdentityInput');
  const doneBtn = $('onboardingDone');
  const skipBtn = $('onboardingSkip');
  const hint = $('onboardingHint');
  const MIN_INTERESTS = 3;

  identityGrid.innerHTML = IDENTITY_OPTIONS.map(o => `<button data-id="${o.id}">${o.emoji} ${o.label}</button>`).join('');
  interestGrid.innerHTML = INTEREST_OPTIONS.map(o => `<button data-interest="${o}">${o}</button>`).join('');

  let selectedIdentity = null, selectedInterests = [];

  identityGrid.querySelectorAll('button').forEach(b => b.onclick = () => {
    identityGrid.querySelectorAll('button').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    selectedIdentity = b.dataset.id;
    otherInput.classList.toggle('hidden', selectedIdentity !== 'other');
    if (selectedIdentity === 'other') otherInput.focus();
    refresh();
  });

  interestGrid.querySelectorAll('button').forEach(b => b.onclick = () => {
    b.classList.toggle('selected');
    const v = b.dataset.interest;
    selectedInterests = selectedInterests.includes(v) ? selectedInterests.filter(x => x !== v) : [...selectedInterests, v];
    refresh();
  });

  function refresh() {
    const identityOk = selectedIdentity && (selectedIdentity !== 'other' || otherInput.value.trim());
    const count = selectedInterests.length;
    const enough = count >= MIN_INTERESTS;
    doneBtn.disabled = !(identityOk && enough);
    const parts = [];
    if (!identityOk) parts.push('选一个身份');
    if (!enough) {
      const left = MIN_INTERESTS - count;
      parts.push(count === 0 ? `选 ${MIN_INTERESTS} 个兴趣` : `再选 ${left} 个兴趣`);
    }
    hint.textContent = parts.length ? parts.join('，') + `（${count}/${MIN_INTERESTS}）` : '👌 可以开始啦';
  }

  async function finish() {
    let identity = selectedIdentity;
    if (identity === 'other') {
      const custom = otherInput.value.trim();
      identity = custom ? `other:${custom}` : 'other';
    }
    state.userProfile = { identity, interests: selectedInterests };
    state.sceneKeys = computeSceneKeys(state.userProfile);
    state.currentScene = state.sceneKeys[0] || 'random';
    await saveState();
    onboarding.classList.add('hidden');
    mainPanel.classList.remove('hidden');
    renderSceneTabs();
    generateBtn.textContent = '✨ 刷灵感';
  }

  doneBtn.onclick = finish;
  skipBtn.onclick = async () => {
    if (!selectedIdentity && selectedInterests.length === 0) {
      state.userProfile = { identity: null, interests: [] };
    } else {
      let identity = selectedIdentity;
      if (identity === 'other') {
        const custom = otherInput.value.trim();
        identity = custom ? `other:${custom}` : 'other';
      }
      state.userProfile = { identity, interests: selectedInterests };
    }
    state.sceneKeys = computeSceneKeys(state.userProfile);
    state.currentScene = state.sceneKeys[0] || 'random';
    await saveState();
    onboarding.classList.add('hidden');
    mainPanel.classList.remove('hidden');
    renderSceneTabs();
    generateBtn.textContent = '✨ 刷灵感';
  };

  otherInput.addEventListener('input', refresh);
  refresh();
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

// ===== Typewriter effect =====
let typewriterTimer = null;
function typewriterReveal(el, text, speed = 26) {
  if (typewriterTimer) clearInterval(typewriterTimer);
  el.textContent = '';
  el.classList.add('typewriter');
  let i = 0;
  typewriterTimer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
      el.classList.remove('typewriter');
    }
  }, speed);
}

// ===== Generate Inspiration (AI 纯生成) =====
async function generateInspiration() {
  if (state.isGenerating) return;
  state.isGenerating = true;

  const now = Date.now();
  if (now - state.lastGenTime < 60000) { state.combo++; } else { state.combo = 0; }
  state.lastGenTime = now;
  state.todayCount++;

  // Roll rarity
  const rarityKey = rollRarity();
  const rarity = RARITY[rarityKey];

  // UI: loading state
  rarityBadge.textContent = `${rarity.emoji} ${rarity.label}`;
  rarityBadge.style.color = rarity.color;
  inspireCard.className = `inspire-card card-rarity-${rarityKey}`;
  cardText.textContent = '';
  cardText.classList.add('loading');
  encouragement.textContent = '🪄 灵感正在路上…';
  feedbackBar.classList.add('hidden');
  generateBtn.textContent = '⏳ 生成中…';

  // Toast for epic/legendary
  if (RARITY_TOAST[rarityKey]) showToast(RARITY_TOAST[rarityKey]);

  try {
    const text = state.currentScene === 'book'
      ? await generateBookUnique(rarityKey)
      : await aiGenerate(rarityKey);

    // Display with typewriter
    cardText.classList.remove('loading');
    inspireCard.classList.add('card-enter');
    setTimeout(() => inspireCard.classList.remove('card-enter'), 400);
    typewriterReveal(cardText, text);

    // Encouragement
    const comboIdx = Math.min(state.combo, COMBO_ENCOURAGEMENTS.length - 1);
    const enc = state.combo >= 1 ? `${state.combo}连击！${COMBO_ENCOURAGEMENTS[comboIdx]}` : ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    encouragement.textContent = enc;

    // Save current card
    state.currentCard = { text, rarity: rarityKey, scene: state.currentScene, method: state.currentMethod, time: Date.now() };
    feedbackBar.classList.remove('hidden');
  } catch (e) {
    cardText.classList.remove('loading');
    cardText.textContent = '😵 灵感迷路了…再刷一次试试';
    encouragement.textContent = '';
  } finally {
    state.isGenerating = false;
    state.currentMethod = null;
    generateBtn.textContent = state.combo >= 1 ? `✨ 刷灵感 (${state.combo})` : '✨ 刷灵感';
    saveState();
  }
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

// ===== 刷书去重 =====
function extractBookTitles(text) {
  return [...text.matchAll(/《(.+?)》/g)].map(m => m[1]);
}

function recordBookTitles(titles) {
  titles.forEach(t => { if (!state.bookHistory.includes(t)) state.bookHistory.push(t); });
  if (state.bookHistory.length > 50) state.bookHistory = state.bookHistory.slice(-50);
}

// 生成不重复的书籍内容：客户端硬去重，重复则自动重试
async function generateBookUnique(rarityKey) {
  const MAX_RETRIES = 3;
  let text = await aiGenerate(rarityKey);
  let titles = extractBookTitles(text);
  let attempt = 0;

  while (attempt < MAX_RETRIES && titles.length > 0 && titles.some(t => state.bookHistory.includes(t))) {
    // 重复了：记录并立即重试（重试时 prompt 已包含这本书，AI 会避开）
    recordBookTitles(titles);
    attempt++;
    text = await aiGenerate(rarityKey);
    titles = extractBookTitles(text);
  }

  recordBookTitles(titles);
  return text;
}

// ===== AI Generate =====
async function aiGenerate(rarityKey) {
  const scene = SCENES[state.currentScene];
  const difficulty = difficultyInput.value.trim();

  // 构建 system prompt = 场景提示词 + 用户画像 + 反馈历史
  let systemPrompt = scene.prompt;

  // 方法增强
  if (state.currentMethod) {
    const m = METHODS.find(x => x.name === state.currentMethod);
    if (m) systemPrompt += `\n\n额外创意约束——${m.prompt}在这个方向上发散。`;
  }

  // 用户画像
  if (state.userProfile) {
    const parts = [];
    if (state.userProfile.identity) {
      if (state.userProfile.identity.startsWith('other:')) {
        parts.push(`用户身份：${state.userProfile.identity.slice(6)}`);
      } else {
        const idLabel = IDENTITY_OPTIONS.find(o => o.id === state.userProfile.identity)?.label || state.userProfile.identity;
        parts.push(`用户身份：${idLabel}`);
      }
    }
    if (state.userProfile.interests?.length) parts.push(`用户兴趣：${state.userProfile.interests.join('、')}`);
    if (parts.length) systemPrompt += '\n\n' + parts.join('\n') + '\n请让内容跟用户的身份和兴趣产生关联。';
  }

  // 刷书去重：注入已推荐书单
  if (state.currentScene === 'book' && state.bookHistory.length > 0) {
    systemPrompt += `\n\n【已推荐过的书，严禁重复】${state.bookHistory.map(t => `《${t}》`).join('')}`;
  }

  // 反馈历史
  if (state.feedbackHistory.length > 0) {
    const good = state.feedbackHistory.filter(f => f.vote === 'good').slice(-3).map(f => f.text).join(' | ');
    const bad = state.feedbackHistory.filter(f => f.vote === 'bad').slice(-3).map(f => f.text).join(' | ');
    if (good) systemPrompt += `\n\n用户喜欢的风格（往这靠）：${good}`;
    if (bad) systemPrompt += `\n用户不喜欢的（避开）：${bad}`;
  }

  // 稀有度加成
  const rarityBoost = rarityKey === 'legendary' ? '\n\n【传说级】这次给我一个足以让人截图发朋友圈的炸裂内容，要前所未见。' :
    rarityKey === 'epic' ? '\n\n【史诗级】这次要让人眼前一亮，忍不住收藏。' :
    rarityKey === 'rare' ? '\n\n【稀有级】比普通灵感更有巧思一些。' : '';

  // User prompt
  let userPrompt = '给我一条灵感。';
  if (state.currentScene === 'book' && state.bookHistory.length > 0) {
    userPrompt = `给我推荐一本全新的书。注意：${state.bookHistory.slice(-10).map(t => `《${t}》`).join('、')}这些书已经推荐过了，这次必须选一本完全不同的。`;
  }
  if (difficulty) userPrompt += `\n我正在纠结的问题：${difficulty}`;
  userPrompt += rarityBoost;

  const result = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('请求超时')), 35000);
    try {
      chrome.runtime.sendMessage(
        { type: 'aiGenerate', payload: { systemPrompt, userPrompt, temperature: 1.0, maxTokens: state.currentScene === 'book' ? 500 : 300 } },
        (resp) => {
          clearTimeout(timeout);
          const err = chrome.runtime.lastError;
          if (err) return reject(new Error(err.message));
          if (resp && resp.ok) return resolve(resp.text);
          reject(new Error(resp?.error || 'AI error'));
        }
      );
    } catch (e) { clearTimeout(timeout); reject(e); }
  });

  return result;
}

// ===== Swipe Navigation =====
function initSwipe() {
  const container = $('cardContainer');
  let startX = 0, startY = 0, isSwiping = false;

  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) generateInspiration();
    }
  }, { passive: true });

  let mouseDown = false, mouseStartX = 0;
  container.addEventListener('mousedown', (e) => { mouseDown = true; mouseStartX = e.clientX; });
  container.addEventListener('mouseup', (e) => {
    if (!mouseDown) return;
    mouseDown = false;
    const dx = e.clientX - mouseStartX;
    if (dx < -50) generateInspiration();
  });
}

// ===== Favorites =====
async function toggleFavorite() {
  if (!state.currentCard) return;
  const idx = state.favorites.findIndex(f => f.text === state.currentCard.text);
  if (idx >= 0) { state.favorites.splice(idx, 1); showToast('已取消收藏'); }
  else { state.favorites.unshift({ ...state.currentCard, savedAt: Date.now() }); showToast('⭐ 已收藏！'); }
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
      customScenes: state.customScenes,
      bookHistory: state.bookHistory,
      todayCount: state.todayCount,
      todayDate: state.todayDate,
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

// ===== Favorites Panel =====
function renderFavorites() {
  const list = $('favList');
  list.innerHTML = state.favorites.map((f, i) =>
    `<div class="fav-item">
      <div class="fav-text">${f.text}</div>
      <div class="fav-actions">
        <button data-action="delete" data-idx="${i}">🗑️</button>
      </div>
    </div>`
  ).join('');
  list.querySelectorAll('[data-action="delete"]').forEach(b => b.onclick = async () => {
    state.favorites.splice(parseInt(b.dataset.idx), 1);
    await saveState(); updateFavCount(); renderFavorites();
  });
}

// ===== Bind Events =====
function bindEvents() {
  generateBtn.onclick = () => generateInspiration();
  favActionBtn.onclick = toggleFavorite;
  feedbackGood.onclick = async () => {
    if (state.currentCard) { state.feedbackHistory.push({ text: state.currentCard.text, vote: 'good', time: Date.now() }); await saveState(); }
    feedbackBar.classList.add('hidden');
    showToast('👍 记住了，往这个方向走');
  };
  feedbackBad.onclick = async () => {
    if (state.currentCard) { state.feedbackHistory.push({ text: state.currentCard.text, vote: 'bad', time: Date.now() }); await saveState(); }
    feedbackBar.classList.add('hidden');
    generateInspiration();
  };
  methodBtn.onclick = () => { renderMethods(); showPanel('methodPanel'); };
  favBtn.onclick = () => { renderFavorites(); showPanel('favPanel'); };
  difficultyToggle.onclick = () => {
    const textarea = difficultyInput;
    const arrow = difficultyToggle.querySelector('.toggle-arrow');
    textarea.classList.toggle('hidden');
    arrow.textContent = textarea.classList.contains('hidden') ? '▾' : '▴';
  };

  // 自定义场景：保存
  $('nsSave').onclick = async () => {
    const name = $('nsName').value.trim();
    const prompt = $('nsPrompt').value.trim();
    if (!name) return showToast('请输入场景名称');
    if (!prompt) return showToast('请输入提示词');
    const id = `custom_${Date.now()}`;
    const scene = { id, name, emoji: $('nsEmoji').value || '📦', prompt };
    state.customScenes.push(scene);
    SCENES[id] = { name: scene.name, emoji: scene.emoji, prompt: scene.prompt };
    state.sceneKeys = [...Object.keys(SCENES)];
    await saveState();
    renderSceneTabs();
    showToast(`✅ 场景「${name}」已创建`);
    hideAllPanels();
  };

  // Close buttons
  document.querySelectorAll('.close-btn').forEach(b => {
    b.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      hideAllPanels();
    };
  });

  initSwipe();
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
