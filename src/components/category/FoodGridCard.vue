<script setup>
import FoodImage from '../FoodImage.vue'
import { DIFFICULTY_LABELS, LABELS } from '../../data/foods.js'
import { navigateTo } from '../../router/index.js'

defineProps({
  food: {
    type: Object,
    required: true,
  },
})

function labelText(value) {
  return LABELS.find((item) => item.value === value)?.label || value
}
</script>

<template>
  <article class="grid-card" tabindex="0" @click="navigateTo(`/recipe/${food.id}`)" @keydown.enter="navigateTo(`/recipe/${food.id}`)">
    <FoodImage :food="food" />
    <div>
      <h3>{{ food.name }}</h3>
      <p>{{ DIFFICULTY_LABELS[food.recipe.difficulty] }} · {{ food.recipe.timeMinutes }} 分钟</p>
      <div class="tag-row">
        <span v-for="label in food.tags.labels.slice(0, 2)" :key="label">{{ labelText(label) }}</span>
      </div>
    </div>
  </article>
</template>
