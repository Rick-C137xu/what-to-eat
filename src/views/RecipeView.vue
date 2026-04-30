<script setup>
import { computed } from 'vue'
import FoodImage from '../components/FoodImage.vue'
import NutritionCard from '../components/recipe/NutritionCard.vue'
import IngredientList from '../components/recipe/IngredientList.vue'
import RecipeSteps from '../components/recipe/RecipeSteps.vue'
import { DIFFICULTY_LABELS, FOOD_CATEGORIES, LABELS } from '../data/foods.js'
import { useRouter, navigateTo } from '../router/index.js'
import { useUserStore } from '../stores/userStore.js'

const { route } = useRouter()
const store = useUserStore()

const food = computed(() => store.findFoodById(route.value.params.id))
const isFavorite = computed(() => food.value && store.state.favorites.includes(food.value.id))

function goBack() {
  if (window.history.length > 1) {
    window.history.back()
    return
  }

  navigateTo('/')
}

function categoryLabel(value) {
  return FOOD_CATEGORIES.find((item) => item.value === value)?.label || value
}

function labelText(value) {
  return LABELS.find((item) => item.value === value)?.label || value
}
</script>

<template>
  <main class="app-shell page-with-nav">
    <div v-if="!food" class="panel empty-state">
      <strong>没有找到这道菜</strong>
      <p>它可能已经被删除，或者链接不太对。</p>
      <button class="primary-button" type="button" @click="navigateTo('/')">返回首页</button>
    </div>

    <template v-else>
      <section class="recipe-hero panel">
        <FoodImage :food="food" size="hero" />
        <div>
          <p class="eyebrow">{{ categoryLabel(food.category) }} · {{ food.tags.cuisine }}</p>
          <h1>{{ food.name }}</h1>
          <p class="subtitle">{{ food.description }}</p>
          <div class="tag-row">
            <span>{{ DIFFICULTY_LABELS[food.recipe.difficulty] }}</span>
            <span>{{ food.recipe.timeMinutes }} 分钟</span>
            <span v-for="label in food.tags.labels" :key="label">{{ labelText(label) }}</span>
          </div>
        </div>
      </section>

      <div class="detail-grid">
        <NutritionCard :nutrition="food.nutrition" />
        <IngredientList :ingredients="food.recipe.ingredients" />
        <RecipeSteps :steps="food.recipe.steps" />
      </div>

      <div class="bottom-actions panel">
        <button class="soft-button" type="button" @click="store.toggleFavorite(food)">
          {{ isFavorite ? '取消收藏' : '❤ 收藏' }}
        </button>
        <button class="danger-button" type="button" @click="store.addTodayBlacklist(food)">今天不吃</button>
        <button class="ghost-button" type="button" @click="goBack">← 返回</button>
      </div>
    </template>
  </main>
</template>
