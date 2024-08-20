<template>
  <button class="button">
    <div class="content">
      <slot name="icon"></slot>
      <slot name="text"></slot>
    </div>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.button {
  width: 113px;
  height: 40px;
  background-color: #474aa1;
  border-radius: 8px;
  .content {
    display: flex;
    justify-content: center;
    font-size: 15px;
    gap:2px;
  }
}
</style>
