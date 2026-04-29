import { foods } from '../data/foods.js'

const EMPTY_RESULT = {
  main: null,
  alternatives: [],
  isEmpty: true,
  reason: 'NO_CANDIDATES',
}

function toArray(value) {
  if (value === undefined || value === null || value === '') {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

function toIdSet(items) {
  return new Set(
    toArray(items)
      .map((item) => (typeof item === 'object' ? item.id : item))
      .filter((id) => id !== undefined && id !== null),
  )
}

function matchesAny(foodValues, selectedValues) {
  const selected = toArray(selectedValues)

  if (selected.length === 0) {
    return true
  }

  const values = toArray(foodValues)
  return selected.some((value) => values.includes(value))
}

function matchesFilter(food, filters = {}) {
  return (
    matchesAny(food.meals, filters.meal || filters.meals) &&
    matchesAny(food.scenes, filters.scene || filters.scenes) &&
    matchesAny(food.moods, filters.mood || filters.moods) &&
    matchesAny(food.cuisine, filters.cuisine) &&
    matchesAny(food.budget, filters.budget) &&
    matchesAny(food.warmth, filters.warmth) &&
    (filters.spicy === undefined || food.spicy === filters.spicy) &&
    (filters.vegetarian === undefined || food.vegetarian === filters.vegetarian)
  )
}

function getWeightedFoods(candidates, favorites, recentEaten) {
  const favoriteIds = toIdSet(favorites)
  const recentEatenIds = toIdSet(recentEaten)

  return candidates.map((food) => {
    let weight = food.baseWeight || 1

    // 喜欢的食物提高出现概率，但不直接保证选中，保留一点随机感。
    if (favoriteIds.has(food.id)) {
      weight += 5
    }

    // 最近吃过的食物降低权重，避免连续几天反复推荐同一种。
    if (recentEatenIds.has(food.id)) {
      weight *= 0.35
    }

    return {
      food,
      weight: Math.max(weight, 0.1),
    }
  })
}

function pickWeightedFood(weightedFoods) {
  const totalWeight = weightedFoods.reduce((sum, item) => sum + item.weight, 0)
  let randomWeight = Math.random() * totalWeight

  for (const item of weightedFoods) {
    randomWeight -= item.weight

    if (randomWeight <= 0) {
      return item.food
    }
  }

  return weightedFoods[weightedFoods.length - 1]?.food || null
}

function pickUniqueFoods(weightedFoods, count) {
  const picked = []
  let pool = [...weightedFoods]

  while (picked.length < count && pool.length > 0) {
    const food = pickWeightedFood(pool)

    if (!food) {
      break
    }

    picked.push(food)

    // 每次抽中后从候选池移除，保证主推荐和备选不重复。
    pool = pool.filter((item) => item.food.id !== food.id)
  }

  return picked
}

export function useRecommend() {
  function getRandomFood() {
    const index = Math.floor(Math.random() * foods.length)
    return foods[index]
  }

  function recommend(options = {}) {
    const {
      filters = {},
      todayBlacklist = [],
      favorites = [],
      recentEaten = [],
    } = options

    const blacklistIds = toIdSet(todayBlacklist)

    // 先按用户筛选条件收窄范围，再排除今天已经明确不想吃的食物。
    const candidates = foods.filter((food) => {
      return matchesFilter(food, filters) && !blacklistIds.has(food.id)
    })

    if (candidates.length === 0) {
      return EMPTY_RESULT
    }

    const weightedFoods = getWeightedFoods(candidates, favorites, recentEaten)
    const pickedFoods = pickUniqueFoods(weightedFoods, 3)

    return {
      main: pickedFoods[0] || null,
      alternatives: pickedFoods.slice(1, 3),
      isEmpty: false,
      reason: '',
    }
  }

  return {
    getRandomFood,
    recommend,
  }
}
