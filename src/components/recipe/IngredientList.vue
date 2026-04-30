<script setup>
defineProps({
  ingredients: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="panel detail-section">
    <h2>配料清单</h2>
    <ul class="ingredient-list">
      <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
  </section>
</template>
