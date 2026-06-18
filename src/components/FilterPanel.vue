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
    <!-- Header with CTA -->
    <div class="panel-title-row">
      <div>
        <h2>想吃点什么</h2>
        <p>选几个条件就好，留一点随机空间。</p>
      </div>
    </div>

    <!-- Quick filters: meal / scene / mood — horizontal pill rows -->
    <div class="filter-group">
      <p class="filter-section-label">⚡ 快速筛选</p>

      <div class="field-label">餐段</div>
      <div class="pill-row">
        <button
          v-for="meal in options.meals" :key="meal.value"
          type="button"
          class="pill-button"
          :class="{ active: filters.meal === meal.value }"
          @click="updateFilter('meal', filters.meal === meal.value ? '' : meal.value)"
        >{{ meal.label }}</button>
      </div>

      <div class="field-label" style="margin-top: 14px;">场景</div>
      <div class="pill-row">
        <button
          v-for="scene in options.scenes" :key="scene.value"
          type="button"
          class="pill-button"
          :class="{ active: filters.scene === scene.value }"
          @click="updateFilter('scene', filters.scene === scene.value ? '' : scene.value)"
        >{{ scene.label }}</button>
      </div>

      <div class="field-label" style="margin-top: 14px;">状态</div>
      <div class="pill-row">
        <button
          v-for="mood in options.moods" :key="mood.value"
          type="button"
          class="pill-button"
          :class="{ active: filters.mood === mood.value }"
          @click="updateFilter('mood', filters.mood === mood.value ? '' : mood.value)"
        >{{ mood.label }}</button>
      </div>
    </div>

    <hr class="filter-divider">

    <!-- Detail filters: cuisine / budget / warmth — compact grid -->
    <div class="filter-group">
      <p class="filter-section-label">🔍 更多偏好</p>

      <div class="detail-filter-grid">
        <label class="field">
          <span>菜系</span>
          <select
            class="compact-select"
            :value="filters.cuisine"
            @change="updateFilter('cuisine', $event.target.value)"
          >
            <option value="">都可以</option>
            <option v-for="cuisine in options.cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
          </select>
        </label>

        <label class="field">
          <span>预算</span>
          <select
            class="compact-select"
            :value="filters.budget"
            @change="updateFilter('budget', $event.target.value)"
          >
            <option value="">都可以</option>
            <option v-for="budget in options.budgets" :key="budget.value" :value="budget.value">{{ budget.label }}</option>
          </select>
        </label>

        <label class="field">
          <span>温度</span>
          <select
            class="compact-select"
            :value="filters.warmth"
            @change="updateFilter('warmth', $event.target.value)"
          >
            <option value="">都可以</option>
            <option v-for="warmth in options.warmth" :key="warmth.value" :value="warmth.value">{{ warmth.label }}</option>
          </select>
        </label>
      </div>
    </div>

    <hr class="filter-divider">

    <!-- Toggle filters: spicy / vegetarian -->
    <div class="toggle-row">
      <div class="toggle-group">
        <span class="toggle-group-label">🌶️ 辣度</span>
        <div class="toggle-pills">
          <button
            type="button"
            class="pill-button"
            :class="{ active: filters.spicy === '' }"
            @click="updateFilter('spicy', '')"
          >都可以</button>
          <button
            type="button"
            class="pill-button"
            :class="{ active: filters.spicy === 'true' }"
            @click="updateFilter('spicy', 'true')"
          >想吃辣</button>
          <button
            type="button"
            class="pill-button"
            :class="{ active: filters.spicy === 'false' }"
            @click="updateFilter('spicy', 'false')"
          >不吃辣</button>
        </div>
      </div>

      <div class="toggle-group">
        <span class="toggle-group-label">🥬 素食</span>
        <div class="toggle-pills">
          <button
            type="button"
            class="pill-button"
            :class="{ active: filters.vegetarian === '' }"
            @click="updateFilter('vegetarian', '')"
          >都可以</button>
          <button
            type="button"
            class="pill-button"
            :class="{ active: filters.vegetarian === 'true' }"
            @click="updateFilter('vegetarian', 'true')"
          >素食也行</button>
          <button
            type="button"
            class="pill-button"
            :class="{ active: filters.vegetarian === 'false' }"
            @click="updateFilter('vegetarian', 'false')"
          >想吃肉</button>
        </div>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="filter-footer">
      <button class="primary-button" type="button" @click="$emit('decide')">
        🎲 帮我决定
      </button>
    </div>
  </section>
</template>
