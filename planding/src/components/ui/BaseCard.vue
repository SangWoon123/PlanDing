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
  border:2px solid #A6A9F1;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
