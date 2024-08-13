<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="box">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits()

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 700px;
  background-color: #fdfdfd;
  border-radius: 4px;
  position: relative;
}
</style>
