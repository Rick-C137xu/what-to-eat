import { useUserStore } from '../stores/userStore.js'

const EMPTY_RESULT = {
  main: null,
  alternatives: [],
  isEmpty: true,
  reason: 'NO_CANDIDATES',
}

function toArray(value) {
  if (value === undefined || value === null || value === '') return []
  return Array.isArray(value) ? value : [value]
}

function toIdSet(items) {
  return new Set(toArray(items).map((item) => (typeof item === 'object' ? item.id : item)).filter(Boolean))
}

function matchesAny(foodValues, selectedValues) {
  const selected = toArray(selectedValues)
  if (selected.length === 0) return true

  const values = toArray(foodValues)
  return selected.some((value) => values.includes(value))
}

function matchesFilter(food, filters = {}) {
  const tags = food.tags || {}
  return (
    matchesAny(tags.meal, filters.meal || filters.meals) &&
    matchesAny(tags.scene, filters.scene || filters.scenes) &&
    matchesAny(tags.mood, filters.mood || filters.moods) &&
    matchesAny(tags.cuisine, filters.cuisine) &&
    matchesAny(tags.budget, filters.budget === undefined ? undefined : Number(filters.budget)) &&
    matchesAny(tags.warmth, filters.warmth) &&
    (filters.spicy === undefined || tags.spicy === filters.spicy) &&
    (filters.vegetarian === undefined || tags.vegetarian === filters.vegetarian)
  )
}

function getWeightedFoods(candidates, favorites, recentEaten) {
  const favoriteIds = toIdSet(favorites)
  const recentEatenIds = toIdSet(recentEaten)

  return candidates.map((food) => {
    let weight = food.baseWeight || 1

    if (favoriteIds.has(food.id)) weight += 5
    if (recentEatenIds.has(food.id)) weight *= 0.35

    return { food, weight: Math.max(weight, 0.1) }
  })
}

function pickWeightedFood(weightedFoods) {
  const totalWeight = weightedFoods.reduce((sum, item) => sum + item.weight, 0)
  let randomWeight = Math.random() * totalWeight

  for (const item of weightedFoods) {
    randomWeight -= item.weight
    if (randomWeight <= 0) return item.food
  }

  return weightedFoods[weightedFoods.length - 1]?.food || null
}

function pickUniqueFoods(weightedFoods, count) {
  const picked = []
  let pool = [...weightedFoods]

  while (picked.length < count && pool.length > 0) {
    const food = pickWeightedFood(pool)
    if (!food) break

    picked.push(food)
    pool = pool.filter((item) => item.food.id !== food.id)
  }

  return picked
}

export function useRecommend() {
  const userStore = useUserStore()

  function getRandomFood() {
    const pool = userStore.allFoods.value
    return pool[Math.floor(Math.random() * pool.length)]
  }

  function recommend(options = {}) {
    const { filters = {}, todayBlacklist = [], favorites = [], recentEaten = [] } = options
    const blacklistIds = toIdSet(todayBlacklist)
    const candidates = userStore.allFoods.value.filter((food) => matchesFilter(food, filters) && !blacklistIds.has(food.id))

    if (candidates.length === 0) return EMPTY_RESULT

    const pickedFoods = pickUniqueFoods(getWeightedFoods(candidates, favorites, recentEaten), 3)

    return {
      main: pickedFoods[0] || null,
      alternatives: pickedFoods.slice(1, 3),
      isEmpty: false,
      reason: '',
    }
  }

  return { getRandomFood, recommend }
}
