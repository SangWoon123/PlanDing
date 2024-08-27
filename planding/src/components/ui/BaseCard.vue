<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: 2px solid #a6a9f1;
  box-sizing: border-box;
  background-color: white;
  margin: 2rem auto;
}
</style>
