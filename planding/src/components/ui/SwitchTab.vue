<template>
  <button
    type="button"
    class="content"
    :style="{
      backgroundColor: active ? '#474AA1' : '#f6f6f8',
      color: active ? '#f6f6f8' : '#474AA1'
    }"
  >
    <v-icon>{{ icon }}</v-icon>
    <span>{{ text }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String
  },
  active: Boolean
})

const text = computed(() => (props.type === 'planner' ? '플래너' : '스케줄'))
const icon = computed(() => (props.type === 'planner' ? 'mdi-menu' : 'mdi-calendar-blank-outline'))
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
