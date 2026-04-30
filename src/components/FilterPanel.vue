<script setup>
const props = defineProps({
  filters: { type: Object, required: true },
  options: { type: Object, required: true },
})

const emit = defineEmits(['update:filters', 'decide'])

function updateFilter(key, value) {
  emit('update:filters', { ...props.filters, [key]: value })
}
</script>

<template>
  <section class="panel filter-panel">
    <div class="panel-title-row">
      <div>
        <h2>想吃点什么</h2>
        <p>选几个条件就好，留一点随机空间。</p>
      </div>
      <button class="primary-button" type="button" @click="$emit('decide')">帮我决定</button>
    </div>

    <div class="filter-grid">
      <label class="field">
        <span>餐段</span>
        <select :value="filters.meal" @change="updateFilter('meal', $event.target.value)">
          <option value="">都可以</option>
          <option v-for="meal in options.meals" :key="meal.value" :value="meal.value">{{ meal.label }}</option>
        </select>
      </label>

      <label class="field">
        <span>场景</span>
        <select :value="filters.scene" @change="updateFilter('scene', $event.target.value)">
          <option value="">都可以</option>
          <option v-for="scene in options.scenes" :key="scene.value" :value="scene.value">{{ scene.label }}</option>
        </select>
      </label>

      <label class="field">
        <span>预算</span>
        <select :value="filters.budget" @change="updateFilter('budget', $event.target.value)">
          <option value="">都可以</option>
          <option v-for="budget in options.budgets" :key="budget.value" :value="budget.value">{{ budget.label }}</option>
        </select>
      </label>

      <label class="field">
        <span>状态</span>
        <select :value="filters.mood" @change="updateFilter('mood', $event.target.value)">
          <option value="">都可以</option>
          <option v-for="mood in options.moods" :key="mood.value" :value="mood.value">{{ mood.label }}</option>
        </select>
      </label>

      <label class="field">
        <span>菜系</span>
        <select :value="filters.cuisine" @change="updateFilter('cuisine', $event.target.value)">
          <option value="">都可以</option>
          <option v-for="cuisine in options.cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
        </select>
      </label>

      <label class="field">
        <span>温度</span>
        <select :value="filters.warmth" @change="updateFilter('warmth', $event.target.value)">
          <option value="">都可以</option>
          <option v-for="warmth in options.warmth" :key="warmth.value" :value="warmth.value">{{ warmth.label }}</option>
        </select>
      </label>
    </div>

    <div class="choice-row">
      <label class="field compact-field">
        <span>辣度</span>
        <select :value="filters.spicy" @change="updateFilter('spicy', $event.target.value)">
          <option value="">都可以</option>
          <option value="true">想吃辣</option>
          <option value="false">不吃辣</option>
        </select>
      </label>

      <label class="field compact-field">
        <span>素食</span>
        <select :value="filters.vegetarian" @change="updateFilter('vegetarian', $event.target.value)">
          <option value="">都可以</option>
          <option value="true">素食也行</option>
          <option value="false">想吃肉</option>
        </select>
      </label>
    </div>
  </section>
</template>
