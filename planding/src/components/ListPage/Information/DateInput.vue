<template>
  <div class="d-flex justify-center">
    <v-date-input
      transition="picker-transition"
      elevation="20"
      color="#656ae6"
      :placeholder="test"
      density="compact"
      prepend-icon=""
      variant="outlined"
      :display-value="model"
      v-model="model"
      max-width="368"
      show-adjacent-months
    ></v-date-input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['updated:date'])
const model = ref(null)
const formattedDate = ref(null)
const today = new Date()
const test = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일, `
// 2024년 6월 1일, 일요일
watch(model, (newVal) => {
  const date = new Date(newVal)
  date.setDate(date.getDate() + 1)
  const formatted = date.toISOString().split('T')[0]
  formattedDate.value = formatted
  emit('updated:date', formattedDate.value)
})
</script>

<style lang="scss" scoped></style>
