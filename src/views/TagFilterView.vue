<script setup>
import { computed, ref } from 'vue'
import FoodGridCard from '../components/category/FoodGridCard.vue'
import { LABELS } from '../data/foods.js'
import { useUserStore } from '../stores/userStore.js'

const store = useUserStore()
const selectedLabels = ref([])

const filteredFoods = computed(() => {
  if (selectedLabels.value.length === 0) return store.allFoods.value
  return store.allFoods.value.filter((food) => selectedLabels.value.every((label) => food.tags.labels.includes(label)))
})

function toggleLabel(value) {
  selectedLabels.value = selectedLabels.value.includes(value)
    ? selectedLabels.value.filter((item) => item !== value)
    : [...selectedLabels.value, value]
}
</script>

<template>
  <main class="app-shell page-with-nav">
    <section class="page-title">
      <p class="eyebrow">Tags</p>
      <h1>按标签筛选</h1>
      <p class="subtitle">多选时会同时满足所有标签，适合精准一点地找灵感。</p>
    </section>

    <section class="panel tag-filter-panel">
      <div class="pill-group">
        <button
          v-for="label in LABELS"
          :key="label.value"
          type="button"
          class="pill-button"
          :class="{ active: selectedLabels.includes(label.value) }"
          @click="toggleLabel(label.value)"
        >
          {{ label.label }}
        </button>
      </div>
    </section>

    <section v-if="filteredFoods.length" class="food-grid">
      <FoodGridCard v-for="food in filteredFoods" :key="food.id" :food="food" />
    </section>

    <section v-else class="panel empty-state">
      <strong>暂时没有符合条件的菜品</strong>
      <p>少选一个标签，可能就会有新选择冒出来。</p>
    </section>
  </main>
</template>
