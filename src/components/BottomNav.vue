<script setup>
import { useRouter } from '../router/index.js'

const { route, navigateTo } = useRouter()

const tabs = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/category', label: '分类', icon: '🍱' },
  { path: '/tags', label: '标签', icon: '🏷️' },
  { path: '/submit', label: '提交', icon: '➕' },
  { path: '/favorites', label: '收藏', icon: '❤' },
]
</script>

<template>
  <nav class="bottom-nav" aria-label="主导航">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      type="button"
      :class="{ active: route.path === tab.path }"
      @click="navigateTo(tab.path)"
    >
      <span>{{ tab.icon }}</span>
      {{ tab.label }}
    </button>
  </nav>
</template>
