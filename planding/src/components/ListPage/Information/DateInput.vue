<template>
  <div class="d-flex justify-center">
    <v-date-input
      transition="picker-transition"
      elevation="20"
      color="#656ae6"
      :placeholder="show"
      density="compact"
      prepend-icon=""
      variant="outlined"
      v-model="model"
      max-width="368"
      show-adjacent-months
    ></v-date-input>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['updated:date'])
const model = ref(null)
const formattedDate = ref(null)
const today = new Date()
const show = computed(() => {
  return `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${day.value}`
})
// 2024년 6월 1일, 일요일
watch(model, (newVal) => {
  const date = new Date(newVal)
  date.setDate(date.getDate() + 1)
  const formatted = date.toISOString().split('T')[0]
  formattedDate.value = formatted
  emit('updated:date', formattedDate.value)
})

const day = computed(() => {
  const dayValue = today.getDay().toString()

  switch (dayValue) {
    case '0':
      return '일요일'
    case '1':
      return '월요일'
    case '2':
      return '화요일'
    case '3':
      return '수요일'
    case '4':
      return '목요일'
    case '5':
      return '금요일'
    case '6':
      return '토요일'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped>
:deep(input::placeholder) {
  opacity: 1;
  font-size: 16px;
  text-align: center;
}
</style>
