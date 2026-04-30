<script setup>
import { FOOD_CATEGORIES } from '../../data/foods.js'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="category-tabs" role="tablist">
    <button
      v-for="category in FOOD_CATEGORIES"
      :key="category.value"
      type="button"
      :class="{ active: modelValue === category.value }"
      @click="$emit('update:modelValue', category.value)"
    >
      <span>{{ category.emoji }}</span>
      {{ category.label }}
    </button>
  </div>
</template>
