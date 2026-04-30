<script setup>
const MAX_SIZE = 500 * 1024

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'error'])

function handleFile(event) {
  const file = event.target.files?.[0]
  if (!file) return

  if (file.size > MAX_SIZE) {
    emit('error', '图片超过 500KB，请压缩后重试。')
    event.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => emit('update:modelValue', reader.result)
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="field">
    <span>图片上传</span>
    <label class="upload-box">
      <input type="file" accept="image/*" @change="handleFile" />
      <img v-if="modelValue" :src="modelValue" alt="上传预览" />
      <span v-else>选择图片</span>
    </label>
  </div>
</template>
