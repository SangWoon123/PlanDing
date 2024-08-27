<template>
  <div class="content" :style="{ fontSize: size }">
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  size: {
    type: Number
  }
})
</script>

<style lang="scss" scoped>
.content {
  color: #303494;
  font-weight: 700;
}
</style>
