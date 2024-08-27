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
const props = defineProps({
  state: {
    type: String,
    required: true
  },
  selectedState: {
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
const isActive = computed(() => props.selectedState === props.state)
function handleClick() {
  emit('select', props.state)
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
