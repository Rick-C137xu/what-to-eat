<script setup>
import { computed } from 'vue'
import BottomNav from './components/BottomNav.vue'
import HomeView from './views/HomeView.vue'
import RecipeView from './views/RecipeView.vue'
import CategoryView from './views/CategoryView.vue'
import TagFilterView from './views/TagFilterView.vue'
import SubmitView from './views/SubmitView.vue'
import FavoritesView from './views/FavoritesView.vue'
import { useRouter } from './router/index.js'

const { route } = useRouter()

const activeView = computed(() => {
  if (route.value.name === 'recipe') return RecipeView
  if (route.value.name === 'category') return CategoryView
  if (route.value.name === 'tags') return TagFilterView
  if (route.value.name === 'submit') return SubmitView
  if (route.value.name === 'favorites') return FavoritesView
  return HomeView
})
</script>

<template>
  <component :is="activeView" />
  <BottomNav />
</template>
