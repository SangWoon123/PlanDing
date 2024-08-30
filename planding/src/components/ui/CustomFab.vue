<template>
  <div class="container">
    <img :src="imgUrl" />
  </div>
</template>

<script setup>
defineProps({
  imgUrl: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.container {
  cursor: pointer;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #474aa1;
  position: relative;
  img {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
