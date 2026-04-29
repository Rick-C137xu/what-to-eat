<script setup>
defineProps({
  favorites: {
    type: Array,
    default: () => [],
  },
  recentEaten: {
    type: Array,
    default: () => [],
  },
  todayBlacklist: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['toggle-favorite', 'remove-recent', 'remove-blacklist'])
</script>

<template>
  <section class="panel list-panel">
    <div class="panel-title-row">
      <div>
        <h2>我的小记录</h2>
        <p>收藏、最近吃过和今天暂时不想吃的，都在这里。</p>
      </div>
    </div>

    <div class="list-grid">
      <div class="list-column">
        <h3>收藏</h3>
        <p v-if="favorites.length === 0" class="muted-text">还没有收藏的食物。</p>
        <article v-for="food in favorites" :key="food.id" class="list-item">
          <span>{{ food.emoji }} {{ food.name }}</span>
          <button class="text-button" type="button" @click="$emit('toggle-favorite', food)">取消收藏</button>
        </article>
      </div>

      <div class="list-column">
        <h3>最近吃过</h3>
        <p v-if="recentEaten.length === 0" class="muted-text">吃过后会显示在这里。</p>
        <article v-for="food in recentEaten" :key="food.id" class="list-item">
          <span>{{ food.emoji }} {{ food.name }}</span>
          <button class="text-button" type="button" @click="$emit('remove-recent', food)">移除</button>
        </article>
      </div>

      <div class="list-column">
        <h3>今天不吃</h3>
        <p v-if="todayBlacklist.length === 0" class="muted-text">今天还没有排除任何食物。</p>
        <article v-for="food in todayBlacklist" :key="food.id" class="list-item">
          <span>{{ food.emoji }} {{ food.name }}</span>
          <button class="text-button" type="button" @click="$emit('remove-blacklist', food)">移回</button>
        </article>
      </div>
    </div>
  </section>
</template>
