import { computed, reactive } from 'vue'
import { foods as builtInFoods } from '../data/foods.js'

const STORAGE_KEYS = {
  userFoods: 'what-to-eat:userFoods',
  favorites: 'what-to-eat:favorites',
  recentEaten: 'what-to-eat:recentEaten',
  todayBlacklist: 'what-to-eat:todayBlacklist',
  blacklistDate: 'what-to-eat:blacklistDate',
}

const MAX_RECENT_EATEN = 30

const state = reactive({
  userFoods: readJson(STORAGE_KEYS.userFoods, []),
  favorites: readJson(STORAGE_KEYS.favorites, []),
  recentEaten: readJson(STORAGE_KEYS.recentEaten, []),
  todayBlacklist: readJson(STORAGE_KEYS.todayBlacklist, []),
  blacklistDate: readText(STORAGE_KEYS.blacklistDate, ''),
})

function hasLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readJson(key, fallback) {
  if (!hasLocalStorage()) return fallback

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || 'null')
    return Array.isArray(parsed) ? parsed : fallback
  } catch (error) {
    console.warn(`Failed to read ${key}.`, error)
    return fallback
  }
}

function readText(key, fallback) {
  return hasLocalStorage() ? window.localStorage.getItem(key) || fallback : fallback
}

function writeJson(key, value) {
  if (hasLocalStorage()) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

function writeText(key, value) {
  if (hasLocalStorage()) {
    window.localStorage.setItem(key, value)
  }
}

function todayKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function normalizeId(item) {
  return typeof item === 'object' ? item?.id : item
}

function removeId(list, item) {
  const id = normalizeId(item)
  return list.filter((value) => value !== id)
}

function persistIds(key, ids) {
  writeJson(key, ids)
  return ids
}

function ensureTodayBlacklist() {
  const today = todayKey()
  if (state.blacklistDate !== today) {
    state.todayBlacklist = []
    state.blacklistDate = today
    writeJson(STORAGE_KEYS.todayBlacklist, [])
    writeText(STORAGE_KEYS.blacklistDate, today)
  }
}

export function useUserStore() {
  ensureTodayBlacklist()

  const allFoods = computed(() => [...builtInFoods, ...state.userFoods])

  function addUserFood(food) {
    state.userFoods = [food, ...state.userFoods]
    writeJson(STORAGE_KEYS.userFoods, state.userFoods)
  }

  function toggleFavorite(food) {
    const id = normalizeId(food)
    if (!id) return state.favorites

    state.favorites = state.favorites.includes(id)
      ? removeId(state.favorites, id)
      : [id, ...state.favorites]

    return persistIds(STORAGE_KEYS.favorites, state.favorites)
  }

  function addRecentEaten(food) {
    const id = normalizeId(food)
    if (!id) return state.recentEaten

    state.recentEaten = [id, ...removeId(state.recentEaten, id)].slice(0, MAX_RECENT_EATEN)
    return persistIds(STORAGE_KEYS.recentEaten, state.recentEaten)
  }

  function removeRecentEaten(food) {
    state.recentEaten = removeId(state.recentEaten, food)
    return persistIds(STORAGE_KEYS.recentEaten, state.recentEaten)
  }

  function addTodayBlacklist(food) {
    ensureTodayBlacklist()
    const id = normalizeId(food)
    if (!id) return state.todayBlacklist

    if (!state.todayBlacklist.includes(id)) {
      state.todayBlacklist = [...state.todayBlacklist, id]
      persistIds(STORAGE_KEYS.todayBlacklist, state.todayBlacklist)
      writeText(STORAGE_KEYS.blacklistDate, state.blacklistDate)
    }

    return state.todayBlacklist
  }

  function removeTodayBlacklist(food) {
    ensureTodayBlacklist()
    state.todayBlacklist = removeId(state.todayBlacklist, food)
    return persistIds(STORAGE_KEYS.todayBlacklist, state.todayBlacklist)
  }

  function findFoodById(id) {
    return allFoods.value.find((food) => food.id === Number(id))
  }

  function foodsByIds(ids) {
    return ids.map((id) => findFoodById(id)).filter(Boolean)
  }

  return {
    state,
    allFoods,
    addUserFood,
    toggleFavorite,
    addRecentEaten,
    removeRecentEaten,
    addTodayBlacklist,
    removeTodayBlacklist,
    findFoodById,
    foodsByIds,
  }
}
