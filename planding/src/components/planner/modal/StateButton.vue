<template>
  <v-btn
    :class="['state-button', { active: isActive }]"
    @click="handleClick"
    :width="width"
    :height="height"
    variant="outlined"
    class="state-button"
  >
    <div class="state-type" :style="{ backgroundColor: color }"></div>
    {{ label }}
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { usePlannerStore } from '@/store/planner'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '80px'
  },
  height: {
    type: String,
    default: '33px'
  }
})
const emit = defineEmits(['select'])
const plannerStore = usePlannerStore()

const isActive = computed(() => plannerStore.formData.status === props.status)

function handleClick() {
  emit('select', props.status)
}
</script>

<style lang="scss" scoped>
.state-type {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.state-button {
  border-radius: 8px;
  border: 1px solid #a2a3b6;
  font-size: 12px;
}

.state-button.active {
  background-color: #007bff;
  color: white;
}
</style>
