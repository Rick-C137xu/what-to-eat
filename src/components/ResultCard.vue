<script setup>
defineProps({
  result: {
    type: Object,
    required: true,
  },
  favoriteIds: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['decide', 'reroll', 'eat', 'toggle-favorite', 'blacklist'])
</script>

<template>
  <section class="panel result-panel">
    <div class="panel-title-row">
      <div>
        <h2>今日推荐</h2>
        <p>不想纠结时，先从这一口开始。</p>
      </div>
      <button class="ghost-button" type="button" @click="$emit('reroll')">再换一个</button>
    </div>

    <div v-if="result.isEmpty" class="empty-state">
      <strong>没有找到合适的选择</strong>
      <p>可以放宽筛选条件，或者把“今天不吃”里的食物移回来。</p>
    </div>

    <div v-else-if="result.main" class="recommend-stack">
      <article class="food-card main-food">
        <div class="food-emoji">{{ result.main.emoji }}</div>
        <div class="food-content">
          <p class="card-label">主推荐</p>
          <h3>{{ result.main.name }}</h3>
          <p>{{ result.main.description }}</p>
          <div class="tag-row">
            <span>{{ result.main.cuisine }}</span>
            <span>{{ result.main.budget }}</span>
            <span>{{ result.main.warmth }}</span>
          </div>
        </div>
      </article>

      <div class="action-row">
        <button class="primary-button" type="button" @click="$emit('eat', result.main)">就吃这个</button>
        <button class="soft-button" type="button" @click="$emit('toggle-favorite', result.main)">
          {{ favoriteIds.includes(result.main.id) ? '取消收藏' : '收藏' }}
        </button>
        <button class="danger-button" type="button" @click="$emit('blacklist', result.main)">今天不吃</button>
      </div>

      <div v-if="result.alternatives.length" class="alternatives">
        <h3>备选</h3>
        <article v-for="food in result.alternatives" :key="food.id" class="mini-food">
          <div>
            <strong>{{ food.emoji }} {{ food.name }}</strong>
            <p>{{ food.description }}</p>
          </div>
          <div class="mini-actions">
            <button class="text-button" type="button" @click="$emit('eat', food)">就吃</button>
            <button class="text-button" type="button" @click="$emit('toggle-favorite', food)">
              {{ favoriteIds.includes(food.id) ? '取消收藏' : '收藏' }}
            </button>
            <button class="text-button muted-danger" type="button" @click="$emit('blacklist', food)">
              今天不吃
            </button>
          </div>
        </article>
      </div>
    </div>

    <div v-else class="empty-state start-state">
      <strong>还没决定</strong>
      <p>点一下“帮我决定”，今天吃什么就有眉目了。</p>
      <button class="primary-button" type="button" @click="$emit('decide')">帮我决定</button>
    </div>
  </section>
</template>
