<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="panel detail-section">
    <h2>做法步骤</h2>
    <ol class="step-list">
      <li v-for="step in steps" :key="step">
        <span>{{ step }}</span>
      </li>
    </ol>
  </section>
</template>
