<template>
  <label for="{{ text }}">{{ text }}</label>
  <input id="{{text}}" type="text" />
</template>

<script setup>
const props = defineProps({
  text: String
})
</script>

<style lang="scss" scoped>
input {
  width: 360px;
  height: 48px;
  border: 1px solid lightgray;
  border-radius: 10px;
}
label {
  margin: 10px 0 10px 0;
}
</style>
