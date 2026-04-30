<script setup>
defineProps({
  food: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
  },
})
</script>

<template>
  <div class="food-visual" :class="`food-visual-${size}`">
    <img v-if="food.imageUrl" :src="food.imageUrl" :alt="food.name" />
    <span v-else>{{ food.emoji }}</span>
  </div>
</template>
