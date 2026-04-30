<script setup>
import { computed, ref } from 'vue'
import CategoryTabs from '../components/category/CategoryTabs.vue'
import FoodGridCard from '../components/category/FoodGridCard.vue'
import { FOOD_CATEGORIES } from '../data/foods.js'
import { useUserStore } from '../stores/userStore.js'

const store = useUserStore()
const initialTab = typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('tab')
const activeCategory = ref(FOOD_CATEGORIES.some((item) => item.value === initialTab) ? initialTab : FOOD_CATEGORIES[0].value)

const foods = computed(() => store.allFoods.value.filter((food) => food.category === activeCategory.value))
</script>

<template>
  <main class="app-shell page-with-nav">
    <section class="page-title">
      <p class="eyebrow">Category</p>
      <h1>按分类浏览</h1>
      <p class="subtitle">先从大方向选起，再看哪一道刚好对胃口。</p>
    </section>

    <CategoryTabs v-model="activeCategory" />

    <section class="food-grid">
      <FoodGridCard v-for="food in foods" :key="food.id" :food="food" />
    </section>
  </main>
</template>
