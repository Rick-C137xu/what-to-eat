import { computed, reactive } from 'vue'

export const routes = [
  { path: '/', name: 'home' },
  { path: '/category', name: 'category' },
  { path: '/tags', name: 'tags' },
  { path: '/submit', name: 'submit' },
  { path: '/favorites', name: 'favorites' },
  { path: '/recipe/:id', name: 'recipe' },
]

const current = reactive({ path: getPath() })

function getPath() {
  return typeof window === 'undefined' ? '/' : window.location.pathname
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    current.path = getPath()
  })
}

export function navigateTo(path) {
  if (typeof window === 'undefined') return
  window.history.pushState({}, '', path)
  current.path = window.location.pathname
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function useRouter() {
  const route = computed(() => {
    const recipeMatch = current.path.match(/^\/recipe\/(\d+)/)
    return {
      path: current.path,
      name: recipeMatch ? 'recipe' : routes.find((item) => item.path === current.path)?.name || 'home',
      params: recipeMatch ? { id: recipeMatch[1] } : {},
    }
  })

  return { route, navigateTo }
}
