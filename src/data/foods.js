export const FOOD_CATEGORIES = [
  { value: 'staple', label: '主食', emoji: '🍚' },
  { value: 'side', label: '配菜', emoji: '🥢' },
  { value: 'drink', label: '饮品', emoji: '🥤' },
  { value: 'dessert', label: '甜点', emoji: '🍰' },
  { value: 'snack', label: '小吃', emoji: '🍢' },
  { value: 'soup', label: '汤品', emoji: '🍲' },
]

export const LABELS = [
  { value: 'vegetarian', label: '素食' },
  { value: 'low-cal', label: '低卡' },
  { value: 'high-protein', label: '高蛋白' },
  { value: 'quick', label: '快速制作' },
  { value: 'budget', label: '经济实惠' },
  { value: 'comfort', label: '治愈系' },
  { value: 'spicy', label: '重口味' },
  { value: 'light', label: '清淡' },
  { value: 'popular', label: '大众推荐' },
]

export const MEAL_OPTIONS = [
  { value: 'breakfast', label: '早餐' },
  { value: 'lunch', label: '午餐' },
  { value: 'dinner', label: '晚餐' },
  { value: 'latenight', label: '夜宵' },
]

export const SCENE_OPTIONS = [
  { value: 'home', label: '在家做' },
  { value: 'restaurant', label: '下馆子' },
  { value: 'delivery', label: '点外卖' },
  { value: 'canteen', label: '食堂' },
]

export const MOOD_OPTIONS = [
  { value: 'comfort', label: '想被治愈' },
  { value: 'adventure', label: '想尝新' },
  { value: 'healthy', label: '清爽健康' },
  { value: 'quick', label: '越快越好' },
  { value: 'social', label: '适合一起吃' },
]

export const BUDGET_OPTIONS = [
  { value: 1, label: '<20' },
  { value: 2, label: '20-50' },
  { value: 3, label: '50-100' },
  { value: 4, label: '>100' },
]

export const WARMTH_OPTIONS = [
  { value: 'hot', label: '热食' },
  { value: 'cold', label: '冷食' },
  { value: 'room', label: '常温' },
]

export const DIFFICULTY_LABELS = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

const defaultByCategory = {
  staple: { meal: ['lunch', 'dinner'], scene: ['home', 'delivery', 'canteen'], mood: ['comfort', 'quick'] },
  side: { meal: ['lunch', 'dinner'], scene: ['home', 'restaurant', 'canteen'], mood: ['healthy', 'comfort'] },
  drink: { meal: ['breakfast', 'lunch', 'dinner'], scene: ['home', 'delivery'], mood: ['quick'] },
  dessert: { meal: ['lunch', 'dinner', 'latenight'], scene: ['home', 'restaurant', 'delivery'], mood: ['comfort', 'social'] },
  snack: { meal: ['breakfast', 'latenight'], scene: ['restaurant', 'delivery', 'canteen'], mood: ['quick', 'social'] },
  soup: { meal: ['lunch', 'dinner'], scene: ['home', 'restaurant', 'canteen'], mood: ['comfort', 'healthy'] },
}

function makeFood(food) {
  const defaults = defaultByCategory[food.category]
  return {
    source: 'built-in',
    imageUrl: '',
    ...food,
    tags: {
      meal: defaults.meal,
      scene: defaults.scene,
      mood: defaults.mood,
      budget: 2,
      spicy: false,
      vegetarian: false,
      warmth: 'hot',
      labels: ['popular', 'comfort'],
      ...food.tags,
    },
  }
}

export const foods = [
  makeFood({ id: 1, name: '番茄鸡蛋面', emoji: '🍜', description: '酸甜热乎的一碗面，适合不知道吃什么的普通日子。', category: 'staple', tags: { cuisine: '中式', meal: ['breakfast', 'lunch', 'dinner'], scene: ['home', 'canteen'], budget: 1, labels: ['quick', 'budget', 'comfort'] }, nutrition: { calories: 520, protein: 20, fat: 15, carbs: 78 }, recipe: { difficulty: 'easy', timeMinutes: 15, ingredients: ['面条', '番茄', '鸡蛋', '葱花'], steps: ['番茄炒出汁水。', '加水煮开后下面。', '淋入蛋液并调味。'] }, baseWeight: 90 }),
  makeFood({ id: 2, name: '牛肉拉面', emoji: '🍜', description: '汤热面劲，饱腹感和稳定感都很强。', category: 'staple', tags: { cuisine: '中式', scene: ['restaurant', 'delivery', 'canteen'], budget: 2, labels: ['high-protein', 'popular', 'comfort'] }, nutrition: { calories: 680, protein: 32, fat: 18, carbs: 92 }, recipe: { difficulty: 'hard', timeMinutes: 60, ingredients: ['牛肉', '拉面', '萝卜', '香菜'], steps: ['牛肉焯水后炖汤。', '另锅煮面。', '浇汤放牛肉和配菜。'] }, baseWeight: 82 }),
  makeFood({ id: 3, name: '日式咖喱饭', emoji: '🍛', description: '浓郁温和的咖喱盖饭，适合需要一点满足感的时候。', category: 'staple', tags: { cuisine: '日式', scene: ['home', 'delivery'], budget: 2, labels: ['comfort', 'popular'] }, nutrition: { calories: 720, protein: 24, fat: 26, carbs: 96 }, recipe: { difficulty: 'medium', timeMinutes: 35, ingredients: ['米饭', '咖喱块', '土豆', '胡萝卜', '鸡腿肉'], steps: ['鸡肉和蔬菜炒香。', '加水炖软。', '放咖喱块收浓后盖饭。'] }, baseWeight: 78 }),
  makeFood({ id: 4, name: '韩式拌饭', emoji: '🥗', description: '蔬菜、米饭和酱料拌在一起，颜色和口味都很热闹。', category: 'staple', tags: { cuisine: '其他', warmth: 'room', spicy: true, labels: ['spicy', 'popular', 'high-protein'] }, nutrition: { calories: 610, protein: 25, fat: 18, carbs: 86 }, recipe: { difficulty: 'medium', timeMinutes: 25, ingredients: ['米饭', '牛肉片', '菠菜', '豆芽', '韩式辣酱'], steps: ['分别处理蔬菜和肉片。', '米饭铺底码上配菜。', '加入辣酱拌匀。'] }, baseWeight: 72 }),
  makeFood({ id: 5, name: '鸡胸肉沙拉饭', emoji: '🥙', description: '轻一点但不敷衍，适合想吃得清爽的一餐。', category: 'staple', tags: { cuisine: '西式', warmth: 'cold', scene: ['home', 'delivery'], mood: ['healthy', 'quick'], budget: 3, labels: ['low-cal', 'high-protein', 'light'] }, nutrition: { calories: 460, protein: 38, fat: 12, carbs: 48 }, recipe: { difficulty: 'easy', timeMinutes: 18, ingredients: ['鸡胸肉', '糙米饭', '生菜', '玉米粒'], steps: ['鸡胸肉煎熟切片。', '蔬菜洗净沥干。', '和米饭装盘调味。'] }, baseWeight: 58 }),
  makeFood({ id: 6, name: '虾仁炒饭', emoji: '🍤', description: '粒粒分明的炒饭，加虾仁后更像认真吃了一顿。', category: 'staple', tags: { cuisine: '中式', scene: ['home', 'canteen'], budget: 2, labels: ['quick', 'high-protein', 'popular'] }, nutrition: { calories: 640, protein: 30, fat: 20, carbs: 82 }, recipe: { difficulty: 'easy', timeMinutes: 12, ingredients: ['隔夜饭', '虾仁', '鸡蛋', '青豆'], steps: ['鸡蛋炒散盛出。', '虾仁炒熟后加米饭。', '合入鸡蛋和青豆调味。'] }, baseWeight: 80 }),
  makeFood({ id: 7, name: '越南牛肉河粉', emoji: '🍜', description: '清亮汤底配香草和河粉，舒服但不寡淡。', category: 'staple', tags: { cuisine: '东南亚', scene: ['restaurant', 'delivery'], budget: 3, labels: ['light', 'high-protein', 'popular'] }, nutrition: { calories: 590, protein: 34, fat: 14, carbs: 78 }, recipe: { difficulty: 'hard', timeMinutes: 50, ingredients: ['河粉', '牛肉片', '豆芽', '九层塔'], steps: ['熬制清汤底。', '河粉烫熟入碗。', '摆牛肉片并冲入热汤。'] }, baseWeight: 68 }),

  makeFood({ id: 8, name: '麻婆豆腐', emoji: '🌶️', description: '麻辣下饭，便宜又能把米饭吃得很香。', category: 'side', tags: { cuisine: '中式', spicy: true, vegetarian: true, budget: 1, labels: ['spicy', 'budget', 'vegetarian'] }, nutrition: { calories: 360, protein: 18, fat: 24, carbs: 16 }, recipe: { difficulty: 'medium', timeMinutes: 20, ingredients: ['豆腐', '豆瓣酱', '花椒粉', '蒜末'], steps: ['豆腐切块焯水。', '炒香豆瓣酱和蒜末。', '下豆腐烧入味并勾芡。'] }, baseWeight: 76 }),
  makeFood({ id: 9, name: '清炒时蔬', emoji: '🥬', description: '清爽简单，给一餐补一点绿色。', category: 'side', tags: { cuisine: '中式', vegetarian: true, budget: 1, labels: ['vegetarian', 'low-cal', 'light', 'quick'] }, nutrition: { calories: 160, protein: 6, fat: 8, carbs: 18 }, recipe: { difficulty: 'easy', timeMinutes: 8, ingredients: ['当季青菜', '蒜片', '盐'], steps: ['青菜洗净沥干。', '热锅炒香蒜片。', '大火快炒调味。'] }, baseWeight: 62 }),
  makeFood({ id: 10, name: '宫保鸡丁', emoji: '🥘', description: '甜咸微辣的经典下饭菜，食堂和外卖都常见。', category: 'side', tags: { cuisine: '中式', spicy: true, labels: ['spicy', 'high-protein', 'popular'] }, nutrition: { calories: 480, protein: 32, fat: 28, carbs: 24 }, recipe: { difficulty: 'medium', timeMinutes: 25, ingredients: ['鸡腿肉', '花生', '黄瓜', '干辣椒'], steps: ['鸡肉切丁腌制。', '调宫保汁。', '快炒鸡丁后合入配料。'] }, baseWeight: 78 }),
  makeFood({ id: 11, name: '蒜蓉西兰花', emoji: '🥦', description: '清淡但有蒜香，适合想吃健康一点时加一盘。', category: 'side', tags: { cuisine: '中式', vegetarian: true, budget: 2, labels: ['vegetarian', 'low-cal', 'light'] }, nutrition: { calories: 180, protein: 9, fat: 9, carbs: 18 }, recipe: { difficulty: 'easy', timeMinutes: 10, ingredients: ['西兰花', '蒜末', '蚝油'], steps: ['西兰花焯水。', '炒香蒜末。', '倒入西兰花快速翻炒。'] }, baseWeight: 60 }),
  makeFood({ id: 12, name: '照烧鸡腿', emoji: '🍗', description: '甜咸酱汁裹住鸡腿肉，配饭非常稳。', category: 'side', tags: { cuisine: '日式', budget: 3, labels: ['high-protein', 'popular', 'comfort'] }, nutrition: { calories: 520, protein: 36, fat: 30, carbs: 20 }, recipe: { difficulty: 'medium', timeMinutes: 28, ingredients: ['鸡腿', '生抽', '味淋', '蜂蜜'], steps: ['鸡腿去骨煎至金黄。', '倒入照烧汁。', '收汁切块装盘。'] }, baseWeight: 70 }),
  makeFood({ id: 13, name: '凉拌黄瓜木耳', emoji: '🥒', description: '酸爽清脆，给油腻的一天按下暂停。', category: 'side', tags: { cuisine: '中式', warmth: 'cold', vegetarian: true, budget: 1, labels: ['vegetarian', 'low-cal', 'light', 'quick'] }, nutrition: { calories: 120, protein: 4, fat: 6, carbs: 14 }, recipe: { difficulty: 'easy', timeMinutes: 10, ingredients: ['黄瓜', '木耳', '蒜末', '醋'], steps: ['木耳焯熟放凉。', '黄瓜拍碎。', '加入调料拌匀。'] }, baseWeight: 55 }),
  makeFood({ id: 14, name: '泰式打抛猪', emoji: '🍳', description: '香草和肉末一起爆香，口味明亮又下饭。', category: 'side', tags: { cuisine: '东南亚', spicy: true, budget: 3, labels: ['spicy', 'high-protein', 'popular'] }, nutrition: { calories: 430, protein: 28, fat: 29, carbs: 14 }, recipe: { difficulty: 'medium', timeMinutes: 22, ingredients: ['猪肉末', '九层塔', '小米辣', '鱼露'], steps: ['肉末炒散出油。', '加入辣椒和调味料。', '最后放九层塔翻匀。'] }, baseWeight: 58 }),

  makeFood({ id: 15, name: '豆浆', emoji: '🥛', description: '热乎的早餐搭子，朴素但很安心。', category: 'drink', tags: { cuisine: '中式', meal: ['breakfast'], scene: ['home', 'delivery', 'canteen'], vegetarian: true, budget: 1, labels: ['vegetarian', 'budget', 'light'] }, nutrition: { calories: 120, protein: 8, fat: 4, carbs: 12 }, recipe: { difficulty: 'easy', timeMinutes: 20, ingredients: ['黄豆', '清水', '少量糖'], steps: ['黄豆提前泡发。', '加入豆浆机打煮。', '过滤后按口味加糖。'] }, baseWeight: 64 }),
  makeFood({ id: 16, name: '冰美式', emoji: '☕', description: '干净利落的提神选项，适合不想喝甜的时候。', category: 'drink', tags: { cuisine: '西式', warmth: 'cold', vegetarian: true, budget: 2, labels: ['low-cal', 'quick', 'popular'] }, nutrition: { calories: 15, protein: 1, fat: 0, carbs: 2 }, recipe: { difficulty: 'easy', timeMinutes: 5, ingredients: ['浓缩咖啡', '冰块', '水'], steps: ['杯中加入冰块和水。', '萃取浓缩咖啡。', '倒入杯中即可。'] }, baseWeight: 45 }),
  makeFood({ id: 17, name: '港式奶茶', emoji: '🧋', description: '茶味浓、奶感足，下午犯困时很有存在感。', category: 'drink', tags: { cuisine: '中式', warmth: 'hot', budget: 2, labels: ['comfort', 'popular'] }, nutrition: { calories: 260, protein: 6, fat: 8, carbs: 40 }, recipe: { difficulty: 'medium', timeMinutes: 18, ingredients: ['红茶', '淡奶', '糖'], steps: ['红茶煮出浓茶汤。', '反复拉茶增加顺滑感。', '加入淡奶和糖。'] }, baseWeight: 52 }),
  makeFood({ id: 18, name: '芒果酸奶昔', emoji: '🥭', description: '果香和酸奶的组合，甜但不会太腻。', category: 'drink', tags: { cuisine: '西式', warmth: 'cold', vegetarian: true, budget: 2, labels: ['vegetarian', 'comfort', 'quick'] }, nutrition: { calories: 240, protein: 9, fat: 5, carbs: 42 }, recipe: { difficulty: 'easy', timeMinutes: 8, ingredients: ['芒果', '酸奶', '冰块'], steps: ['芒果切块。', '和酸奶冰块一起搅打。', '倒入杯中。'] }, baseWeight: 50 }),
  makeFood({ id: 19, name: '柠檬气泡水', emoji: '🍋', description: '清爽解腻，适合配重口味正餐。', category: 'drink', tags: { cuisine: '西式', warmth: 'cold', vegetarian: true, budget: 1, labels: ['low-cal', 'light', 'quick'] }, nutrition: { calories: 35, protein: 0, fat: 0, carbs: 9 }, recipe: { difficulty: 'easy', timeMinutes: 5, ingredients: ['柠檬', '气泡水', '冰块'], steps: ['柠檬切片挤汁。', '杯中加入冰块。', '倒入气泡水混合。'] }, baseWeight: 44 }),
  makeFood({ id: 20, name: '热可可', emoji: '🍫', description: '冷天里的甜暖饮，适合奖励自己。', category: 'drink', tags: { cuisine: '西式', vegetarian: true, budget: 2, labels: ['comfort', 'popular'] }, nutrition: { calories: 310, protein: 9, fat: 12, carbs: 42 }, recipe: { difficulty: 'easy', timeMinutes: 10, ingredients: ['牛奶', '可可粉', '糖', '棉花糖'], steps: ['牛奶小火加热。', '加入可可粉和糖搅匀。', '倒杯后放棉花糖。'] }, baseWeight: 40 }),
  makeFood({ id: 21, name: '泰式椰青冰饮', emoji: '🥥', description: '椰香清甜，有一点度假的轻松感。', category: 'drink', tags: { cuisine: '东南亚', warmth: 'cold', vegetarian: true, budget: 3, labels: ['light', 'comfort', 'popular'] }, nutrition: { calories: 180, protein: 2, fat: 6, carbs: 30 }, recipe: { difficulty: 'easy', timeMinutes: 6, ingredients: ['椰青水', '椰肉', '冰块'], steps: ['椰肉切条。', '杯中加冰。', '倒入椰青水和椰肉。'] }, baseWeight: 42 }),

  makeFood({ id: 22, name: '红豆双皮奶', emoji: '🍮', description: '奶香软滑加红豆，甜得很温柔。', category: 'dessert', tags: { cuisine: '中式', warmth: 'cold', vegetarian: true, budget: 2, labels: ['vegetarian', 'comfort', 'popular'] }, nutrition: { calories: 330, protein: 12, fat: 12, carbs: 44 }, recipe: { difficulty: 'hard', timeMinutes: 45, ingredients: ['牛奶', '蛋清', '红豆', '糖'], steps: ['牛奶加热结奶皮。', '蛋清和牛奶混合。', '蒸熟后加红豆。'] }, baseWeight: 48 }),
  makeFood({ id: 23, name: '提拉米苏', emoji: '🍰', description: '咖啡、奶酪和可可的层次感，适合慢慢吃。', category: 'dessert', tags: { cuisine: '西式', warmth: 'cold', vegetarian: true, budget: 3, labels: ['comfort', 'popular'] }, nutrition: { calories: 420, protein: 8, fat: 28, carbs: 36 }, recipe: { difficulty: 'hard', timeMinutes: 50, ingredients: ['手指饼干', '马斯卡彭', '咖啡液', '可可粉'], steps: ['打发奶酪糊。', '饼干蘸咖啡液铺层。', '冷藏定型撒可可粉。'] }, baseWeight: 42 }),
  makeFood({ id: 24, name: '水果酸奶杯', emoji: '🍓', description: '酸奶、水果和坚果叠起来，轻巧又好看。', category: 'dessert', tags: { cuisine: '西式', warmth: 'cold', vegetarian: true, budget: 2, labels: ['low-cal', 'vegetarian', 'quick', 'light'] }, nutrition: { calories: 260, protein: 11, fat: 8, carbs: 38 }, recipe: { difficulty: 'easy', timeMinutes: 7, ingredients: ['酸奶', '草莓', '蓝莓', '坚果'], steps: ['水果洗净切块。', '杯中铺酸奶和水果。', '撒坚果即可。'] }, baseWeight: 55 }),
  makeFood({ id: 25, name: '杨枝甘露', emoji: '🥭', description: '芒果、西柚和椰奶交织，清甜又有果粒感。', category: 'dessert', tags: { cuisine: '中式', warmth: 'cold', vegetarian: true, budget: 3, labels: ['comfort', 'popular'] }, nutrition: { calories: 360, protein: 5, fat: 14, carbs: 56 }, recipe: { difficulty: 'medium', timeMinutes: 30, ingredients: ['芒果', '西柚', '西米', '椰奶'], steps: ['西米煮熟过凉。', '芒果部分打泥。', '混合椰奶并加入果粒。'] }, baseWeight: 50 }),
  makeFood({ id: 26, name: '烤布蕾', emoji: '🍮', description: '焦糖脆壳下面是顺滑奶冻，仪式感很足。', category: 'dessert', tags: { cuisine: '西式', vegetarian: true, budget: 3, labels: ['comfort', 'popular'] }, nutrition: { calories: 390, protein: 9, fat: 25, carbs: 32 }, recipe: { difficulty: 'hard', timeMinutes: 55, ingredients: ['淡奶油', '蛋黄', '糖', '香草精'], steps: ['混合蛋黄奶油液。', '水浴烘烤至凝固。', '表面撒糖炙烤成焦糖。'] }, baseWeight: 38 }),
  makeFood({ id: 27, name: '绿豆冰糕', emoji: '🧊', description: '细腻清凉，夏天吃起来很轻松。', category: 'dessert', tags: { cuisine: '中式', warmth: 'cold', vegetarian: true, budget: 1, labels: ['vegetarian', 'light', 'budget'] }, nutrition: { calories: 240, protein: 8, fat: 5, carbs: 42 }, recipe: { difficulty: 'medium', timeMinutes: 40, ingredients: ['脱皮绿豆', '黄油', '糖'], steps: ['绿豆蒸熟压泥。', '小火炒至成团。', '压模冷藏定型。'] }, baseWeight: 36 }),
  makeFood({ id: 28, name: '香蕉燕麦松饼', emoji: '🥞', description: '自然甜味的快手甜点，也能当早餐。', category: 'dessert', tags: { cuisine: '西式', meal: ['breakfast', 'latenight'], vegetarian: true, budget: 1, labels: ['quick', 'vegetarian', 'budget'] }, nutrition: { calories: 300, protein: 10, fat: 9, carbs: 46 }, recipe: { difficulty: 'easy', timeMinutes: 15, ingredients: ['香蕉', '燕麦', '鸡蛋', '牛奶'], steps: ['香蕉压泥混合燕麦和鸡蛋。', '平底锅小火煎。', '两面金黄后装盘。'] }, baseWeight: 46 }),

  makeFood({ id: 29, name: '鸡蛋灌饼', emoji: '🥙', description: '早餐摊经典，热乎、有蛋、有酱，很快就能吃上。', category: 'snack', tags: { cuisine: '中式', meal: ['breakfast'], scene: ['delivery', 'canteen'], budget: 1, labels: ['quick', 'budget', 'popular'] }, nutrition: { calories: 430, protein: 16, fat: 18, carbs: 52 }, recipe: { difficulty: 'medium', timeMinutes: 18, ingredients: ['饼皮', '鸡蛋', '生菜', '甜面酱'], steps: ['饼皮煎至鼓起。', '灌入蛋液煎熟。', '刷酱夹生菜。'] }, baseWeight: 76 }),
  makeFood({ id: 30, name: '关东煮', emoji: '🍢', description: '热汤里捞几样喜欢的，夜里也不会太沉重。', category: 'snack', tags: { cuisine: '日式', scene: ['restaurant', 'delivery'], budget: 2, labels: ['comfort', 'light', 'popular'] }, nutrition: { calories: 260, protein: 16, fat: 10, carbs: 24 }, recipe: { difficulty: 'easy', timeMinutes: 25, ingredients: ['萝卜', '鱼丸', '海带结', '高汤'], steps: ['高汤煮开。', '放入耐煮食材。', '小火煮入味。'] }, baseWeight: 58 }),
  makeFood({ id: 31, name: '烤冷面', emoji: '🌯', description: '酸甜咸香的街边小吃，适合想吃点有味道的夜晚。', category: 'snack', tags: { cuisine: '中式', meal: ['latenight'], budget: 1, labels: ['budget', 'popular', 'quick'] }, nutrition: { calories: 380, protein: 13, fat: 14, carbs: 52 }, recipe: { difficulty: 'easy', timeMinutes: 10, ingredients: ['冷面片', '鸡蛋', '洋葱', '酱料'], steps: ['冷面片煎软。', '打入鸡蛋摊匀。', '刷酱撒配料卷起。'] }, baseWeight: 62 }),
  makeFood({ id: 32, name: '炸鸡翅', emoji: '🍗', description: '外脆里嫩，适合放松和分享。', category: 'snack', tags: { cuisine: '西式', scene: ['home', 'delivery', 'restaurant'], mood: ['social', 'comfort'], budget: 2, labels: ['popular', 'comfort'] }, nutrition: { calories: 560, protein: 30, fat: 38, carbs: 22 }, recipe: { difficulty: 'medium', timeMinutes: 35, ingredients: ['鸡翅', '面粉', '淀粉', '香料粉'], steps: ['鸡翅腌制。', '裹粉静置返潮。', '中火炸熟再复炸。'] }, baseWeight: 64 }),
  makeFood({ id: 33, name: '麻辣烫小碗', emoji: '🥘', description: '想吃什么自己搭，热辣又自由。', category: 'snack', tags: { cuisine: '中式', spicy: true, scene: ['restaurant', 'delivery'], labels: ['spicy', 'popular', 'comfort'] }, nutrition: { calories: 520, protein: 22, fat: 26, carbs: 48 }, recipe: { difficulty: 'easy', timeMinutes: 20, ingredients: ['丸子', '青菜', '豆皮', '麻辣汤底'], steps: ['汤底煮开。', '按熟成时间下食材。', '煮好后调味出锅。'] }, baseWeight: 72 }),
  makeFood({ id: 34, name: '越南春卷', emoji: '🥬', description: '薄薄米纸包住蔬菜和虾，清爽又有嚼劲。', category: 'snack', tags: { cuisine: '东南亚', warmth: 'cold', budget: 3, labels: ['low-cal', 'light', 'high-protein'] }, nutrition: { calories: 230, protein: 17, fat: 5, carbs: 28 }, recipe: { difficulty: 'medium', timeMinutes: 25, ingredients: ['米纸', '虾仁', '生菜', '薄荷叶'], steps: ['虾仁煮熟切开。', '米纸浸软。', '包入蔬菜和虾仁。'] }, baseWeight: 40 }),
  makeFood({ id: 35, name: '煎饺', emoji: '🥟', description: '底部焦香，里面有肉汁，是懒得炒菜时的好选择。', category: 'snack', tags: { cuisine: '中式', scene: ['home', 'delivery', 'canteen'], budget: 2, labels: ['popular', 'comfort', 'quick'] }, nutrition: { calories: 450, protein: 18, fat: 20, carbs: 50 }, recipe: { difficulty: 'easy', timeMinutes: 15, ingredients: ['速冻饺子', '油', '清水'], steps: ['平底锅少油码饺子。', '加水加盖焖熟。', '开盖煎至底部金黄。'] }, baseWeight: 70 }),

  makeFood({ id: 36, name: '皮蛋瘦肉粥', emoji: '🥣', description: '温和顺滑，胃口一般时也能认真吃一点。', category: 'soup', tags: { cuisine: '中式', meal: ['breakfast', 'dinner'], scene: ['home', 'canteen', 'delivery'], budget: 1, labels: ['comfort', 'budget', 'light'] }, nutrition: { calories: 330, protein: 18, fat: 9, carbs: 45 }, recipe: { difficulty: 'medium', timeMinutes: 45, ingredients: ['大米', '皮蛋', '瘦肉', '姜丝'], steps: ['大米煮成绵粥。', '瘦肉腌制后下锅。', '加入皮蛋和姜丝调味。'] }, baseWeight: 66 }),
  makeFood({ id: 37, name: '番茄牛腩汤', emoji: '🍅', description: '酸甜浓郁又有肉香，配饭配面都合适。', category: 'soup', tags: { cuisine: '中式', budget: 3, labels: ['high-protein', 'comfort', 'popular'] }, nutrition: { calories: 480, protein: 34, fat: 26, carbs: 28 }, recipe: { difficulty: 'hard', timeMinutes: 60, ingredients: ['牛腩', '番茄', '洋葱', '土豆'], steps: ['牛腩焯水。', '番茄炒出红汤。', '加牛腩小火炖软。'] }, baseWeight: 62 }),
  makeFood({ id: 38, name: '冬瓜排骨汤', emoji: '🍲', description: '清甜不腻，适合想吃肉但又想清爽一点。', category: 'soup', tags: { cuisine: '中式', budget: 2, labels: ['light', 'comfort', 'high-protein'] }, nutrition: { calories: 360, protein: 26, fat: 20, carbs: 18 }, recipe: { difficulty: 'medium', timeMinutes: 50, ingredients: ['排骨', '冬瓜', '姜片', '葱'], steps: ['排骨焯水。', '加姜片炖至半软。', '放冬瓜继续炖熟。'] }, baseWeight: 58 }),
  makeFood({ id: 39, name: '味噌汤', emoji: '🥣', description: '咸鲜轻盈，适合当一餐的小小收尾。', category: 'soup', tags: { cuisine: '日式', vegetarian: true, budget: 1, labels: ['vegetarian', 'light', 'quick'] }, nutrition: { calories: 110, protein: 8, fat: 4, carbs: 10 }, recipe: { difficulty: 'easy', timeMinutes: 8, ingredients: ['味噌', '豆腐', '海带芽', '葱花'], steps: ['水煮开后放豆腐。', '关小火化开味噌。', '加入海带芽和葱花。'] }, baseWeight: 44 }),
  makeFood({ id: 40, name: '南瓜浓汤', emoji: '🎃', description: '细腻香甜，有一点西式餐厅的舒服感。', category: 'soup', tags: { cuisine: '西式', vegetarian: true, budget: 2, labels: ['vegetarian', 'comfort', 'light'] }, nutrition: { calories: 260, protein: 6, fat: 10, carbs: 38 }, recipe: { difficulty: 'medium', timeMinutes: 30, ingredients: ['南瓜', '洋葱', '牛奶', '黑胡椒'], steps: ['南瓜蒸熟。', '洋葱炒香后加南瓜。', '搅打成汤并调味。'] }, baseWeight: 46 }),
  makeFood({ id: 41, name: '泰式冬阴功汤', emoji: '🦐', description: '酸辣鲜香，一口就很醒神。', category: 'soup', tags: { cuisine: '东南亚', spicy: true, budget: 3, labels: ['spicy', 'high-protein', 'popular'] }, nutrition: { calories: 300, protein: 24, fat: 12, carbs: 22 }, recipe: { difficulty: 'medium', timeMinutes: 35, ingredients: ['虾', '香茅', '南姜', '蘑菇', '青柠'], steps: ['香料煮出香味。', '加入蘑菇和虾。', '用青柠和鱼露调味。'] }, baseWeight: 50 }),
  makeFood({ id: 42, name: '银耳莲子羹', emoji: '🍵', description: '清甜润口，热饮冷藏都适合。', category: 'soup', tags: { cuisine: '中式', vegetarian: true, warmth: 'room', budget: 1, labels: ['vegetarian', 'light', 'budget'] }, nutrition: { calories: 210, protein: 5, fat: 1, carbs: 48 }, recipe: { difficulty: 'medium', timeMinutes: 55, ingredients: ['银耳', '莲子', '冰糖', '枸杞'], steps: ['银耳泡发撕小朵。', '和莲子小火炖出胶。', '加冰糖和枸杞。'] }, baseWeight: 40 }),
]
