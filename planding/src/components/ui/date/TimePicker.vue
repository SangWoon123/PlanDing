<template>
  <v-select
    v-model="time"
    density="compact"
    :label="label"
    :items="item"
    variant="outlined"
    :menu-props="{ maxHeight: 'none' }"
  ></v-select>
</template>

<script setup>
import { ref, watch } from 'vue'
defineProps({
  label: String
})

const emit = defineEmits(['update:time'])
const time = ref('')
watch(time, (newValue) => {
  emit('update:time', newValue.substring(0, 2))
})

const item = [
  '06시',
  '07시',
  '08시',
  '09시',
  '10시',
  '11시',
  '12시',
  '13시',
  '14시',
  '15시',
  '16시',
  '17시',
  '18시',
  '19시',
  '20시',
  '21시',
  '22시',
  '23시'
]
</script>

<style lang="scss" scoped></style>
