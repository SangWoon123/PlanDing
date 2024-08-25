<template>
  <button
    type="button"
    class="content"
    :style="{
      backgroundColor: color ? '#474AA1' : '#f6f6f8',
      color: color ? '#f6f6f8' : '#474AA1'
    }"
  >
    <v-icon>{{ color ? 'mdi-calendar-blank-outline' : 'mdi-menu' }}</v-icon>
    <span>{{ text }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String
  }
})
const color = computed(() => props.type === 'schedule')
const text = computed(() => (props.type === 'schedule' ? '스케줄' : '플래너'))
</script>

<style lang="scss" scoped>
.content {
  width: 97px;
  height: 40px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 4px;
}
</style>
