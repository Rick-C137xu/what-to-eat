const STORAGE_KEYS = {
  favorites: 'what-to-eat:favorites',
  recentEaten: 'what-to-eat:recentEaten',
  todayBlacklist: 'what-to-eat:todayBlacklist',
  blacklistDate: 'what-to-eat:blacklistDate',
}

const MAX_RECENT_EATEN = 30

function hasLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function getTodayDateKey() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function normalizeId(item) {
  return typeof item === 'object' ? item?.id : item
}

function normalizeIdList(items) {
  return items
    .map(normalizeId)
    .filter((id) => id !== undefined && id !== null && id !== '')
}

function readList(key) {
  if (!hasLocalStorage()) {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(key)
    const parsedValue = rawValue ? JSON.parse(rawValue) : []

    return Array.isArray(parsedValue) ? normalizeIdList(parsedValue) : []
  } catch (error) {
    console.warn(`Failed to read ${key} from localStorage.`, error)
    return []
  }
}

function writeList(key, value) {
  if (!hasLocalStorage()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(normalizeIdList(value)))
}

function readText(key) {
  if (!hasLocalStorage()) {
    return ''
  }

  return window.localStorage.getItem(key) || ''
}

function writeText(key, value) {
  if (!hasLocalStorage()) {
    return
  }

  window.localStorage.setItem(key, value)
}

function removeValue(list, item) {
  const id = normalizeId(item)
  return list.filter((value) => value !== id)
}

export function useStorage() {
  function getFavorites() {
    return readList(STORAGE_KEYS.favorites)
  }

  function toggleFavorite(food) {
    const id = normalizeId(food)

    if (id === undefined || id === null) {
      return getFavorites()
    }

    const favorites = getFavorites()
    const nextFavorites = favorites.includes(id)
      ? removeValue(favorites, id)
      : [...favorites, id]

    // 收藏只保存食物 id，避免 foods 数据变更后本地缓存变旧。
    writeList(STORAGE_KEYS.favorites, nextFavorites)
    return nextFavorites
  }

  function getRecentEaten() {
    return readList(STORAGE_KEYS.recentEaten)
  }

  function addRecentEaten(food) {
    const id = normalizeId(food)

    if (id === undefined || id === null) {
      return getRecentEaten()
    }

    const recentEaten = removeValue(getRecentEaten(), id)
    const nextRecentEaten = [id, ...recentEaten].slice(0, MAX_RECENT_EATEN)

    // 最新吃过的放在最前面，并限制最多 30 条，防止 localStorage 无限增长。
    writeList(STORAGE_KEYS.recentEaten, nextRecentEaten)
    return nextRecentEaten
  }

  function removeRecentEaten(food) {
    const nextRecentEaten = removeValue(getRecentEaten(), food)

    writeList(STORAGE_KEYS.recentEaten, nextRecentEaten)
    return nextRecentEaten
  }

  function clearExpiredTodayBlacklist() {
    const savedDate = readText(STORAGE_KEYS.blacklistDate)
    const today = getTodayDateKey()

    if (savedDate === today) {
      return false
    }

    // 今日黑名单只在当天有效；跨自然日后自动清空。
    writeList(STORAGE_KEYS.todayBlacklist, [])
    writeText(STORAGE_KEYS.blacklistDate, today)
    return true
  }

  function getTodayBlacklist() {
    clearExpiredTodayBlacklist()
    return readList(STORAGE_KEYS.todayBlacklist)
  }

  function addTodayBlacklist(food) {
    const id = normalizeId(food)

    if (id === undefined || id === null) {
      return getTodayBlacklist()
    }

    const todayBlacklist = getTodayBlacklist()
    const nextTodayBlacklist = todayBlacklist.includes(id)
      ? todayBlacklist
      : [...todayBlacklist, id]

    // 添加时同步写入今天的日期，保证后续可以按自然日判断是否过期。
    writeList(STORAGE_KEYS.todayBlacklist, nextTodayBlacklist)
    writeText(STORAGE_KEYS.blacklistDate, getTodayDateKey())
    return nextTodayBlacklist
  }

  function removeTodayBlacklist(food) {
    const nextTodayBlacklist = removeValue(getTodayBlacklist(), food)

    writeList(STORAGE_KEYS.todayBlacklist, nextTodayBlacklist)
    writeText(STORAGE_KEYS.blacklistDate, getTodayDateKey())
    return nextTodayBlacklist
  }

  return {
    getFavorites,
    toggleFavorite,
    getRecentEaten,
    addRecentEaten,
    removeRecentEaten,
    getTodayBlacklist,
    addTodayBlacklist,
    removeTodayBlacklist,
    clearExpiredTodayBlacklist,
  }
}
