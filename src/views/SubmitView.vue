<script setup>
import { reactive, ref } from 'vue'
import ImageUploader from '../components/submit/ImageUploader.vue'
import StepEditor from '../components/submit/StepEditor.vue'
import TagSelector from '../components/submit/TagSelector.vue'
import { FOOD_CATEGORIES } from '../data/foods.js'
import { navigateTo } from '../router/index.js'
import { useUserStore } from '../stores/userStore.js'

const store = useUserStore()
const error = ref('')

const form = reactive({
  name: '',
  category: 'staple',
  labels: [],
  description: '',
  ingredients: '',
  steps: '',
  difficulty: 'easy',
  timeMinutes: 15,
  imageUrl: '',
  submittedBy: '',
})

function lines(value) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean)
}

function submitFood() {
  error.value = ''

  if (!form.name.trim() || !form.description.trim() || !form.category || form.labels.length === 0) {
    error.value = '请填写菜名、分类、描述，并至少选择 1 个标签。'
    return
  }

  const ingredients = lines(form.ingredients)
  const steps = lines(form.steps)

  if (ingredients.length === 0 || steps.length === 0) {
    error.value = '配料和做法步骤都至少需要 1 项。'
    return
  }

  const food = {
    id: Date.now(),
    name: form.name.trim(),
    emoji: '🍽️',
    imageUrl: form.imageUrl,
    description: form.description.trim(),
    category: form.category,
    tags: {
      cuisine: '其他',
      meal: ['lunch', 'dinner'],
      scene: ['home'],
      mood: form.labels.includes('quick') ? ['quick'] : ['comfort'],
      budget: form.labels.includes('budget') ? 1 : 2,
      spicy: form.labels.includes('spicy'),
      vegetarian: form.labels.includes('vegetarian'),
      warmth: 'hot',
      labels: form.labels,
    },
    nutrition: {
      calories: 450,
      protein: form.labels.includes('high-protein') ? 30 : 15,
      fat: 16,
      carbs: 58,
    },
    recipe: {
      difficulty: form.difficulty,
      timeMinutes: Number(form.timeMinutes) || 15,
      ingredients,
      steps,
    },
    baseWeight: 60,
    source: 'user-submitted',
    submittedBy: form.submittedBy.trim() || undefined,
  }

  store.addUserFood(food)
  navigateTo(`/recipe/${food.id}`)
}
</script>

<template>
  <main class="app-shell page-with-nav">
    <section class="page-title">
      <p class="eyebrow">Submit</p>
      <h1>提交一道菜</h1>
      <p class="subtitle">写下你常吃、想吃，或者值得推荐的一道。</p>
    </section>

    <form class="panel submit-form" @submit.prevent="submitFood">
      <p v-if="error" class="form-error">{{ error }}</p>

      <div class="form-grid">
        <label class="field">
          <span>菜名</span>
          <input v-model.trim="form.name" type="text" required />
        </label>

        <label class="field">
          <span>分类</span>
          <select v-model="form.category" required>
            <option v-for="category in FOOD_CATEGORIES" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
          </select>
        </label>
      </div>

      <label class="field">
        <span>一句话描述</span>
        <input v-model.trim="form.description" type="text" required />
      </label>

      <div class="field">
        <span>标签</span>
        <TagSelector v-model="form.labels" />
      </div>

      <StepEditor v-model="form.ingredients" label="配料" placeholder="每行一项，例如：鸡蛋" />
      <StepEditor v-model="form.steps" label="做法步骤" placeholder="每步一行，例如：先把鸡蛋打散" />

      <div class="form-grid">
        <label class="field">
          <span>难度</span>
          <select v-model="form.difficulty">
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
        </label>

        <label class="field">
          <span>所需时间（分钟）</span>
          <input v-model.number="form.timeMinutes" type="number" min="1" required />
        </label>
      </div>

      <ImageUploader v-model="form.imageUrl" @error="error = $event" />

      <label class="field">
        <span>昵称</span>
        <input v-model.trim="form.submittedBy" type="text" />
      </label>

      <button class="primary-button" type="submit">提交并查看详情</button>
    </form>
  </main>
</template>
