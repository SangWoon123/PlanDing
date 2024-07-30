<template>
  <button type="button" class="button" :style="{ backgroundColor: color, color: textColor }">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  color: String,
  text: String,
  textColor: String
})
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  width: 360px;
  height: 48px;
  border-radius: 10px;
  border: none;
}
</style>
