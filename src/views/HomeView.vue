<script setup>
import { computed, reactive, ref } from 'vue'
import FilterPanel from '../components/FilterPanel.vue'
import ResultCard from '../components/ResultCard.vue'
import FoodList from '../components/FoodList.vue'
import { FOOD_CATEGORIES, MEAL_OPTIONS, SCENE_OPTIONS, MOOD_OPTIONS, BUDGET_OPTIONS, WARMTH_OPTIONS } from '../data/foods.js'
import { useRecommend } from '../composables/useRecommend.js'
import { useUserStore } from '../stores/userStore.js'
import { navigateTo } from '../router/index.js'

const store = useUserStore()
const { recommend } = useRecommend()

const filters = reactive({
  meal: '',
  scene: '',
  budget: '',
  mood: '',
  cuisine: '',
  warmth: '',
  spicy: '',
  vegetarian: '',
})

const result = ref({ main: null, alternatives: [], isEmpty: false, reason: '' })

const filterOptions = computed(() => ({
  meals: MEAL_OPTIONS,
  scenes: SCENE_OPTIONS,
  budgets: BUDGET_OPTIONS,
  moods: MOOD_OPTIONS,
  cuisines: [...new Set(store.allFoods.value.map((food) => food.tags.cuisine))],
  warmth: WARMTH_OPTIONS,
}))

const favoriteFoods = computed(() => store.foodsByIds(store.state.favorites))
const recentEatenFoods = computed(() => store.foodsByIds(store.state.recentEaten))
const todayBlacklistFoods = computed(() => store.foodsByIds(store.state.todayBlacklist))

function getActiveFilters() {
  return {
    meal: filters.meal || undefined,
    scene: filters.scene || undefined,
    budget: filters.budget || undefined,
    mood: filters.mood || undefined,
    cuisine: filters.cuisine || undefined,
    warmth: filters.warmth || undefined,
    spicy: filters.spicy === '' ? undefined : filters.spicy === 'true',
    vegetarian: filters.vegetarian === '' ? undefined : filters.vegetarian === 'true',
  }
}

function updateFilters(nextFilters) {
  Object.assign(filters, nextFilters)
}

function recommendFood() {
  result.value = recommend({
    filters: getActiveFilters(),
    favorites: store.state.favorites,
    recentEaten: store.state.recentEaten,
    todayBlacklist: store.state.todayBlacklist,
  })
}

function addTodayBlacklist(food) {
  store.addTodayBlacklist(food)

  if (result.value.main?.id === food.id || result.value.alternatives.some((item) => item.id === food.id)) {
    recommendFood()
  }
}
</script>

<template>
  <main class="app-shell page-with-nav">
    <section class="app-header">
      <div>
        <p class="eyebrow">What to eat</p>
        <h1>今天吃什么</h1>
        <p class="subtitle">把纠结交给一点偏好和一点随机，先选一顿合适的。</p>
      </div>
    </section>

    <section class="quick-categories" aria-label="分类快捷入口">
      <button v-for="category in FOOD_CATEGORIES" :key="category.value" type="button" @click="navigateTo(`/category?tab=${category.value}`)">
        <span>{{ category.emoji }}</span>
        {{ category.label }}
      </button>
    </section>

    <div class="layout-grid">
      <FilterPanel :filters="filters" :options="filterOptions" @update:filters="updateFilters" @decide="recommendFood" />

      <ResultCard
        :result="result"
        :favorite-ids="store.state.favorites"
        @decide="recommendFood"
        @reroll="recommendFood"
        @eat="store.addRecentEaten"
        @toggle-favorite="store.toggleFavorite"
        @blacklist="addTodayBlacklist"
      />
    </div>

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
