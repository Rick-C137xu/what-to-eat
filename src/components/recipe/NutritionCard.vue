<script setup>
const props = defineProps({
  nutrition: {
    type: Object,
    required: true,
  },
})

const items = [
  { key: 'calories', label: '热量', unit: 'kcal', max: 800 },
  { key: 'protein', label: '蛋白质', unit: 'g', max: 45 },
  { key: 'fat', label: '脂肪', unit: 'g', max: 45 },
  { key: 'carbs', label: '碳水', unit: 'g', max: 110 },
]

function percent(item) {
  return Math.min(100, Math.round((props.nutrition[item.key] / item.max) * 100))
}
</script>

<template>
  <section class="panel detail-section">
    <h2>营养速览</h2>
    <div class="nutrition-grid">
      <div v-for="item in items" :key="item.key" class="nutrition-item">
        <div class="nutrition-top">
          <span>{{ item.label }}</span>
          <strong>{{ nutrition[item.key] }}{{ item.unit }}</strong>
        </div>
        <div class="progress-track">
          <span :style="{ width: `${percent(item)}%` }"></span>
        </div>
      </div>
    </div>
  </section>
</template>
