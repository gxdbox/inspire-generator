// 灵感发生器 - 数据定义
// 场景、素材池、模板、稀有度

const SCENES = {
  story: {
    name: '故事',
    emoji: '📖',
    dimensions: [
      { name: '故事风格', pool: [
        { emoji: '💡', label: '发明故事', seed: '一个意外的发现改变了...' },
        { emoji: '📉', label: '失败逆袭', seed: '在最绝望的时刻...' },
        { emoji: '🤪', label: '荒诞真事', seed: '这听起来像假的但真的发生了...' },
        { emoji: '🦋', label: '微小改变', seed: '一个微不足道的决定引发了...' },
        { emoji: '🔗', label: '跨界碰撞', seed: '当___遇上___，奇迹发生了...' },
        { emoji: '👶', label: '小孩思维', seed: '如果用一个孩子的眼光看...' },
        { emoji: '🌿', label: '自然启发', seed: '从大自然的一个现象中...' },
        { emoji: '✨', label: '美丽意外', seed: '本来想造A，却意外发现了B...' },
        { emoji: '🏴‍☠️', label: '叛逆者', seed: '所有人都说不行，但...' },
        { emoji: '🔀', label: '意外关联', seed: '两件毫不相干的事竟指向了...' },
      ]},
      { name: '主要角色', pool: [
        '一个孤独的程序员', '一个退休的老师', '一个失眠的CEO', '一个送外卖的诗人',
        '一个开出租车的哲学家', '一个在图书馆睡觉的流浪汉', '一个偷偷画画的白领',
        '一个养猫的科学家', '一个不相信爱情的红娘', '一个不会说话的歌手',
        '一个强迫症艺术家', '一个总是迟到的天才'
      ]},
      { name: '故事场景', pool: [
        '凌晨三点的便利店', '暴雨中的火车站', '一个即将拆迁的书店',
        '海底捞的角落座位', '午夜过后的办公室', '一个无人问津的博客',
        '最后一班地铁', '一个即将倒闭的唱片店', '凌晨四点的医院走廊',
        '一个被遗忘的QQ群', '沙漠中的加油站', '天台的黄昏'
      ]},
    ],
    templates: [
      '{style}：{character}在{scene}，{seed}',
      '想象一下，{character}某天在{scene}，{seed}。这就是一个{style}的故事。',
      '{seed}。而这一切，始于{character}在{scene}的那个普通下午。',
    ],
  },
  writing: {
    name: '写作',
    emoji: '✍️',
    dimensions: [
      { name: '文体', pool: ['微小说', '诗歌', '散文', '对话体', '书信', '日记体', '寓言', '讽刺短文'] },
      { name: '主题', pool: ['告别', '重逢', '秘密', '选择', '等待', '陌生人', '遗憾', '勇气', '时间', '孤独'] },
      { name: '氛围', pool: ['温暖治愈', '悬疑紧张', '冷峻疏离', '浪漫轻盈', '黑色幽默', '诡异迷离', '平静如水'] },
    ],
    templates: [
      '写一篇{style}，主题是{theme}，氛围{atmosphere}。',
      '以{theme}为主题，用{style}的形式，营造{atmosphere}的氛围。',
      '{atmosphere}的{style}，讲述一个关于{theme}的故事。',
    ],
  },
  coding: {
    name: '编程',
    emoji: '💻',
    dimensions: [
      { name: '项目类型', pool: ['Chrome扩展', 'CLI工具', 'Web应用', 'VS Code插件', 'API服务', '自动化脚本', '数据可视化', '小游戏'] },
      { name: '技术栈', pool: ['React+TypeScript', 'Vanilla JS', 'Python+FastAPI', 'Node.js', 'Rust+WASM', 'Svelte', 'Tailwind+Alpine', 'Deno'] },
      { name: '创新角度', pool: ['解决一个没人注意的小痛点', '把一个复杂功能做到极致简单', '用AI增强现有工具', '离线优先的PWA', '隐私优先的设计', '为特殊人群设计', '极致性能优化', '跨平台同步'] },
    ],
    templates: [
      '做一个{project}，用{tech}实现，{angle}。',
      '用{tech}开发一个{project}，{angle}。',
      '{angle}的{project}，基于{tech}构建。',
    ],
  },
  product: {
    name: '产品',
    emoji: '🚀',
    dimensions: [
      { name: '目标用户', pool: ['程序员', '自由职业者', '大学生', '宝妈', '退休老人', '小店主', '打工人', '创作者'] },
      { name: '需求场景', pool: ['节省时间', '减少焦虑', '记录生活', '学习技能', '社交连接', '健康管理', '省钱', '找灵感'] },
      { name: '商业模式', pool: ['免费+增值', '订阅制', '一次性付费', '广告+隐私', '开源+托管', '课程+社群', '工具+服务', '硬件+软件'] },
    ],
    templates: [
      '为{user}打造一个{need}的产品，采用{business}模式。',
      '帮助{user}{need}，通过{business}变现。',
      '面向{user}的{need}方案，{business}模式。',
    ],
  },
  life: {
    name: '生活',
    emoji: '🌱',
    dimensions: [
      { name: '生活领域', pool: ['工作方式', '人际关系', '消费习惯', '时间管理', '健康习惯', '学习成长', '居家环境', '社交活动'] },
      { name: '改变方向', pool: ['做减法', '做加法', '重新定义', '回归本质', '跨界融合', '游戏化', '自动化', '仪式感'] },
      { name: '最小行动', pool: ['每天5分钟', '每周一次', '替换一个旧习惯', '扔掉一件东西', '记录一件事', '跟一个人聊聊', '尝试新东西', '写下来'] },
    ],
    templates: [
      '在{area}上{direction}，从{action}开始。',
      '尝试在{area}中{direction}，第一步是{action}。',
      '{direction}你的{area}，只需要{action}。',
    ],
  },
  random: {
    name: '随机',
    emoji: '🎲',
    dimensions: [
      { name: '第一维度', pool: ['时间', '空间', '声音', '颜色', '数字', '味道', '温度', '速度'] },
      { name: '第二维度', pool: ['倒过来看', '放大100倍', '压缩到1秒', '跟相反的对调', '让它唱歌', '跟10年前对话', '如果它有感情', '改成圆的'] },
      { name: '第三维度', pool: ['然后记录发生了什么', '问一个5岁小孩的看法', '写给100年后的人看', '用emoji讲这个故事', '设计成一场游戏', '变成一个仪式', '做成一个产品', '画成一幅画'] },
    ],
    templates: [
      '把{first}作为起点，{second}，{third}。',
      '关于{first}的思考：{second}，{third}。',
      '想象{first}如果{second}，{third}。',
    ],
  },
};

// 方法卡
const METHODS = [
  { id: 'scamper', name: 'SCAMPER 法', emoji: '🔄', desc: '替代/合并/改造/调整/改变用途/消除/逆转', prompt: '用SCAMPER法对以下内容进行创意发散' },
  { id: 'whatif', name: '如果？', emoji: '❓', desc: '不断追问"如果…会怎样"，突破思维边界', prompt: '从"如果"的角度进行极端假设' },
  { id: 'reverse', name: '反向思考', emoji: '🔁', desc: '把问题完全倒过来想', prompt: '用逆向思维重新审视' },
  { id: 'analogy', name: '类比法', emoji: '🔗', desc: '用其他领域的事物类比本问题', prompt: '找一个看似无关的领域做类比' },
  { id: 'constraint', name: '约束法', emoji: '⛓️', desc: '给自己加极端限制条件', prompt: '在极端限制条件下寻找解决方案' },
  { id: 'random', name: '随机词法', emoji: '🎲', desc: '随机选一个词强行关联', prompt: '将随机概念强行关联到问题上' },
  { id: 'worst', name: '最坏方案', emoji: '💀', desc: '先想最糟糕的方案，再反转', prompt: '先设计最糟糕的方案，然后找它的价值' },
  { id: 'triz', name: '矛盾解决', emoji: '⚖️', desc: '列出矛盾，寻找双赢方案', prompt: '识别核心矛盾并寻找突破性解决方案' },
  { id: 'future', name: '未来视角', emoji: '🔮', desc: '站在未来回看现在', prompt: '站在10年后的视角回看今天的问题' },
  { id: 'empathy', name: '换位思考', emoji: '💭', desc: '站在完全不同的人的角度', prompt: '换一个完全不同的身份来思考' },
];

// 稀有度定义
const RARITY = {
  common:    { label: '普通',  emoji: '',       weight: 55, color: '#6366f1', glow: '0 0 8px rgba(99,102,241,0.3)',      bg: '' },
  fine:      { label: '优质',  emoji: '💎',      weight: 25, color: '#8b5cf6', glow: '0 0 12px rgba(139,92,246,0.4)',    bg: '' },
  rare:      { label: '稀有',  emoji: '🌟',      weight: 12, color: '#f59e0b', glow: '0 0 18px rgba(245,158,11,0.5)',   bg: '' },
  epic:      { label: '史诗',  emoji: '🔥',      weight:  6, color: '#ef4444', glow: '0 0 24px rgba(239,68,68,0.6)',    bg: 'linear-gradient(135deg,rgba(239,68,68,0.1),transparent)' },
  legendary: { label: '传说',  emoji: '👑',      weight:  2, color: '#ff6b9d', glow: '0 0 32px rgba(255,107,157,0.7)',  bg: 'linear-gradient(135deg,rgba(255,107,157,0.15),rgba(124,92,252,0.1))' },
};

const RARITY_KEYS = Object.keys(RARITY);

const RARITY_TOAST = {
  epic: '🔥 史诗级灵感！万里挑一！',
  legendary: '👑 传说级灵感！天选之人！',
};

// 鼓励语数组（由浅入深）
const ENCOURAGEMENTS = [
  '✨ 不完美的开始胜过完美的等待',
  '🌟 每一个灵感都值得被记录',
  '💪 你离突破只差一个灵感的距离',
  '🎯 创意的秘诀就是不断碰撞',
  '🚀 这个灵感有潜力的味道',
  '🌈 保持这个状态，你会收获更多',
  '⚡ 思维正在活跃中',
  '🔥 你已经超越了昨天的自己',
  '🎆 灵感爆发期！继续！',
  '🏆 你就是创意之王！',
];

// combo 递进鼓励语
const COMBO_ENCOURAGEMENTS = [
  '✨ 不完美的开始',
  '🌟 再来一个！',
  '💪 手感来了',
  '🎯 渐入佳境',
  '🚀 灵感涌现',
  '🌈 思维打开中',
  '⚡ 创意源源不断',
  '🔥 进入状态了！',
  '🎆 灵感爆发🔥',
  '👑 10连击破纪录！',
];

// 用户画像选项
const IDENTITY_OPTIONS = [
  { id: 'developer',  label: '开发者',      emoji: '💻' },
  { id: 'designer',   label: '设计师',      emoji: '🎨' },
  { id: 'writer',     label: '写作者',      emoji: '✍️' },
  { id: 'founder',    label: '创业者',      emoji: '🚀' },
  { id: 'marketer',   label: '市场运营',    emoji: '📈' },
  { id: 'student',    label: '学生',        emoji: '🎓' },
  { id: 'pm',         label: '产品经理',    emoji: '📋' },
  { id: 'artist',     label: '艺术创作者',  emoji: '🎭' },
];

const INTEREST_OPTIONS = [
  '人工智能', 'Web开发', '移动应用', '开源项目',
  '写作创作', '阅读', '电影', '音乐',
  '设计', '摄影', '游戏', '运动健身',
  '心理学', '商业', '投资', '教育',
  '烹饪', '旅行', '语言学习', '手工制作',
];

// 画布身份
const CANVAS_KEY = 'inspire_generator_data';
