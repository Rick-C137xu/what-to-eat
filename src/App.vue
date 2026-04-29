<script setup>
import { computed, reactive, ref } from 'vue'
import FilterPanel from './components/FilterPanel.vue'
import ResultCard from './components/ResultCard.vue'
import FoodList from './components/FoodList.vue'
import { foods } from './data/foods.js'
import { useRecommend } from './composables/useRecommend.js'
import { useStorage } from './composables/useStorage.js'

const { recommend } = useRecommend()
const storage = useStorage()

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

const result = ref({
  main: null,
  alternatives: [],
  isEmpty: false,
  reason: '',
})

const favorites = ref(storage.getFavorites())
const recentEaten = ref(storage.getRecentEaten())
const todayBlacklist = ref(storage.getTodayBlacklist())

function uniqueValues(key) {
  return [...new Set(foods.flatMap((food) => food[key]))]
}

const filterOptions = {
  meals: [
    { value: 'breakfast', label: '早餐' },
    { value: 'lunch', label: '午餐' },
    { value: 'dinner', label: '晚餐' },
    { value: 'lateNight', label: '夜宵' },
  ],
  scenes: uniqueValues('scenes'),
  budgets: uniqueValues('budget'),
  moods: uniqueValues('moods'),
  cuisines: uniqueValues('cuisine'),
  warmth: uniqueValues('warmth'),
}

function getFoodsByIds(ids) {
  return ids
    .map((id) => foods.find((food) => food.id === id))
    .filter(Boolean)
}

const favoriteFoods = computed(() => getFoodsByIds(favorites.value))
const recentEatenFoods = computed(() => getFoodsByIds(recentEaten.value))
const todayBlacklistFoods = computed(() => getFoodsByIds(todayBlacklist.value))

function refreshStorageState() {
  favorites.value = storage.getFavorites()
  recentEaten.value = storage.getRecentEaten()
  todayBlacklist.value = storage.getTodayBlacklist()
}

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
    favorites: favorites.value,
    recentEaten: recentEaten.value,
    todayBlacklist: todayBlacklist.value,
  })
}

function eatFood(food) {
  if (!food) {
    return
  }

  storage.addRecentEaten(food)
  refreshStorageState()
}

function toggleFavorite(food) {
  storage.toggleFavorite(food)
  refreshStorageState()
}

function addTodayBlacklist(food) {
  if (!food) {
    return
  }

  storage.addTodayBlacklist(food)
  refreshStorageState()

  if (result.value.main?.id === food.id || result.value.alternatives.some((item) => item.id === food.id)) {
    recommendFood()
  }
}

function removeRecentEaten(food) {
  storage.removeRecentEaten(food)
  refreshStorageState()
}

function removeTodayBlacklist(food) {
  storage.removeTodayBlacklist(food)
  refreshStorageState()
}
</script>

<template>
  <main class="app-shell">
    <section class="app-header">
      <div>
        <p class="eyebrow">What to eat</p>
        <h1>今天吃什么</h1>
        <p class="subtitle">把纠结交给一点点偏好和一点点随机，先选一顿合适的。</p>
      </div>
    </section>

    <div class="layout-grid">
      <FilterPanel
        :filters="filters"
        :options="filterOptions"
        @update:filters="updateFilters"
        @decide="recommendFood"
      />

      <ResultCard
        :result="result"
        :favorite-ids="favorites"
        @decide="recommendFood"
        @reroll="recommendFood"
        @eat="eatFood"
        @toggle-favorite="toggleFavorite"
        @blacklist="addTodayBlacklist"
      />
    </div>

    <FoodList
      :favorites="favoriteFoods"
      :recent-eaten="recentEatenFoods"
      :today-blacklist="todayBlacklistFoods"
      @toggle-favorite="toggleFavorite"
      @remove-recent="removeRecentEaten"
      @remove-blacklist="removeTodayBlacklist"
    />
  </main>
</template>
