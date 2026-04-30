<script setup>
import { computed } from 'vue'
import FoodList from '../components/FoodList.vue'
import { useUserStore } from '../stores/userStore.js'

const store = useUserStore()
const favoriteFoods = computed(() => store.foodsByIds(store.state.favorites))
const recentEatenFoods = computed(() => store.foodsByIds(store.state.recentEaten))
const todayBlacklistFoods = computed(() => store.foodsByIds(store.state.todayBlacklist))
</script>

<template>
  <main class="app-shell page-with-nav">
    <section class="page-title">
      <p class="eyebrow">Saved</p>
      <h1>收藏与记录</h1>
      <p class="subtitle">把偏好、历史和今天不想吃的都收在这里。</p>
    </section>

    <FoodList
      :favorites="favoriteFoods"
      :recent-eaten="recentEatenFoods"
      :today-blacklist="todayBlacklistFoods"
      @toggle-favorite="store.toggleFavorite"
      @remove-recent="store.removeRecentEaten"
      @remove-blacklist="store.removeTodayBlacklist"
    />
  </main>
</template>
