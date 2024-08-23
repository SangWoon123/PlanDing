<template>
  <button class="button" :class="{ 'button-style': type }">
    <div class="content">
      <v-icon :icon="icon" :color="color" />
      <span>{{ text }}</span>
    </div>
  </button>
</template>

<script setup>
defineProps({
  type: Boolean,
  icon: String,
  text: String,
  color: String
})
</script>

<style lang="scss" scoped>
.button {
  width: 113px;
  height: 40px;
  background-color: #474aa1;
  border-radius: 8px;
  .content {
    display: flex;
    justify-content: center;
    font-size: 16px;
    gap: 6px;
  }
}
.button-style {
  width: 113px;
  height: 40px;
  background-color: #f0f0fd;
  border-radius: 8px;
  color: #474aa1;
  font-weight: 900;
}
</style>
