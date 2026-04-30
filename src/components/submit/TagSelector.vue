<script setup>
import { LABELS } from '../../data/foods.js'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

function toggle(value) {
  emit(
    'update:modelValue',
    props.modelValue.includes(value)
      ? props.modelValue.filter((item) => item !== value)
      : [...props.modelValue, value],
  )
}
</script>

<template>
  <div class="pill-group">
    <button
      v-for="label in LABELS"
      :key="label.value"
      type="button"
      class="pill-button"
      :class="{ active: modelValue.includes(label.value) }"
      @click="toggle(label.value)"
    >
      {{ label.label }}
    </button>
  </div>
</template>
