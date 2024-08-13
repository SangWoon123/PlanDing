<template>
  <div style="height: 100%;" class="pa-2">
    <div class="header">
      <div class="text-h5 text-medium-emphasis ps-2">대화</div>
      <v-btn icon="mdi-close" variant="text"></v-btn>
    </div>
    <v-divider class="mb-4"></v-divider>
    <div class="background">
      <v-icon>mdi-chat-processing-outline</v-icon>
      대화를 시작해보세요.
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.background {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
