<script setup>
import { navigateTo } from '../router/index.js'

defineProps({
  favorites: { type: Array, default: () => [] },
  recentEaten: { type: Array, default: () => [] },
  todayBlacklist: { type: Array, default: () => [] },
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
      <!-- Favorites column -->
      <div class="list-column">
        <div class="list-column-header favorites">
          <span class="col-dot"></span>
          <h3>❤ 收藏</h3>
          <span class="col-count">{{ favorites.length }}</span>
        </div>

        <div v-if="favorites.length === 0" class="column-empty">
          <span class="empty-emoji">⭐</span>
          <p>还没有收藏的食物</p>
        </div>

        <article v-for="food in favorites" :key="food.id" class="list-item">
          <button class="plain-link" type="button" @click="navigateTo(`/recipe/${food.id}`)">
            {{ food.emoji }} {{ food.name }}
          </button>
          <button class="text-button" type="button" @click="$emit('toggle-favorite', food)">取消</button>
        </article>
      </div>

      <!-- Recent eaten column -->
      <div class="list-column">
        <div class="list-column-header recent">
          <span class="col-dot"></span>
          <h3>🕐 最近吃过</h3>
          <span class="col-count">{{ recentEaten.length }}</span>
        </div>

        <div v-if="recentEaten.length === 0" class="column-empty">
          <span class="empty-emoji">🍴</span>
          <p>吃过后会显示在这里</p>
        </div>

        <article v-for="food in recentEaten" :key="food.id" class="list-item">
          <button class="plain-link" type="button" @click="navigateTo(`/recipe/${food.id}`)">
            {{ food.emoji }} {{ food.name }}
          </button>
          <button class="text-button" type="button" @click="$emit('remove-recent', food)">移除</button>
        </article>
      </div>

      <!-- Today blacklist column -->
      <div class="list-column">
        <div class="list-column-header blacklist">
          <span class="col-dot"></span>
          <h3>🚫 今天不吃</h3>
          <span class="col-count">{{ todayBlacklist.length }}</span>
        </div>

        <div v-if="todayBlacklist.length === 0" class="column-empty">
          <span class="empty-emoji">🙅</span>
          <p>今天还没有排除的食物</p>
        </div>

        <article v-for="food in todayBlacklist" :key="food.id" class="list-item">
          <button class="plain-link" type="button" @click="navigateTo(`/recipe/${food.id}`)">
            {{ food.emoji }} {{ food.name }}
          </button>
          <button class="text-button" type="button" @click="$emit('remove-blacklist', food)">移回</button>
        </article>
      </div>
    </div>
  </section>
</template>
