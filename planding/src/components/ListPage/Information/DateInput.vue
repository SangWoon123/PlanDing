<template>
  <div class="d-flex justify-center">
    <v-date-input
      density="compact"
      prepend-icon=""
      variant="outlined"
      :display-value="model"
      v-model="model"
      max-width="368"
      :placeholder="today"
      show-adjacent-months
    ></v-date-input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['updated:date'])
const model = ref(null)
const formattedDate = ref(null)

watch(model, (newVal) => {
  const date = new Date(newVal)
  date.setDate(date.getDate() + 1)
  const formatted = date.toISOString().split('T')[0]
  formattedDate.value = formatted
  emit('updated:date', formattedDate.value)
})
</script>

<style lang="scss" scoped></style>
