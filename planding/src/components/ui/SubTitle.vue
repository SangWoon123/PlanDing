<template>
  <div class="sub-title">{{ text }}</div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 22px;
  font-family: 'Pretendard-Regular';
  font-weight: 700;
  color: #303494;
  height: 66px;
  padding: 12px;
  display: flex;
  align-items: center;
}
</style>
