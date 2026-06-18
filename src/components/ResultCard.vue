<script setup>
import FoodImage from './FoodImage.vue'
import { navigateTo } from '../router/index.js'

defineProps({
  result: { type: Object, required: true },
  favoriteIds: { type: Array, default: () => [] },
})

defineEmits(['decide', 'reroll', 'eat', 'toggle-favorite', 'blacklist'])
</script>

<template>
  <section class="panel result-panel">
    <!-- Empty: No candidates found -->
    <div v-if="result.isEmpty" class="empty-state">
      <span class="empty-emoji">😅</span>
      <strong>没有找到合适的选择</strong>
      <p>放宽筛选条件试试，或者把"今天不吃"里的食物移回来。</p>
      <button class="ghost-button" type="button" @click="$emit('reroll')">再换一次</button>
    </div>

    <!-- Empty: Start / initial state -->
    <div v-else-if="!result.main" class="empty-state start-state">
      <span class="empty-emoji">🍽️</span>
      <strong>还没决定今天吃什么</strong>
      <p>选好偏好，点一下按钮，让纠结到此为止。</p>
      <button class="primary-button" type="button" @click="$emit('decide')">
        🎲 帮我决定
      </button>
    </div>

    <!-- Has recommendation -->
    <template v-else>
      <!-- Main recommendation -->
      <div class="recommend-stack">
        <article
          class="food-card main-food clickable"
          @click="navigateTo(`/recipe/${result.main.id}`)"
        >
          <FoodImage :food="result.main" size="large" />
          <div class="food-content">
            <p class="card-label">★ 主推荐</p>
            <h3>{{ result.main.name }}</h3>
            <p>{{ result.main.description }}</p>
            <div class="tag-row">
              <span>{{ result.main.tags.cuisine }}</span>
              <span>{{ result.main.nutrition.calories }} kcal</span>
              <span>{{ result.main.nutrition.protein }}g 蛋白质</span>
            </div>
          </div>
        </article>

        <!-- Actions -->
        <div class="action-row">
          <button class="primary-button" type="button" @click="$emit('eat', result.main)">
            👍 就吃这个
          </button>
          <button
            class="soft-button"
            type="button"
            @click="$emit('toggle-favorite', result.main)"
          >
            {{ favoriteIds.includes(result.main.id) ? '💔 取消收藏' : '❤ 收藏' }}
          </button>
          <button class="danger-button" type="button" @click="$emit('blacklist', result.main)">
            今天不吃
          </button>
        </div>

        <!-- Alternatives -->
        <div v-if="result.alternatives.length" class="alternatives">
          <div class="alternatives-header">
            <h3>备选方案</h3>
          </div>

          <article
            v-for="food in result.alternatives" :key="food.id"
            class="mini-food clickable"
            @click="navigateTo(`/recipe/${food.id}`)"
          >
            <div>
              <strong>{{ food.emoji }} {{ food.name }}</strong>
              <p>{{ food.description }}</p>
            </div>
            <div class="mini-actions" @click.stop>
              <button class="text-button" type="button" @click="$emit('eat', food)">就吃</button>
              <button class="text-button" type="button" @click="$emit('toggle-favorite', food)">
                {{ favoriteIds.includes(food.id) ? '取消收藏' : '收藏' }}
              </button>
              <button class="text-button muted-danger" type="button" @click="$emit('blacklist', food)">不吃</button>
            </div>
          </article>
        </div>

        <!-- Reroll -->
        <button class="ghost-button" type="button" style="justify-self:center;" @click="$emit('reroll')">
          🔄 再换一个
        </button>
      </div>
    </template>
  </section>
</template>
