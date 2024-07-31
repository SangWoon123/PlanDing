<template>
  <div class="group-box">
    <figure>
      <img :src="img" alt="" />
    </figure>
    <div class="group-title">
      <span>{{ title }}</span>
      <span style="color: #bebebe; font-size: 13px">{{ createdAt }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  createdAt: String,
  img: String
})
</script>

<style lang="scss" scoped>
.group-box {
  border: 1.08px solid #e8e9fa;
  border-radius: 4px;
  width: 223px;
  height: 178px;
  padding: 12px;

  figure {
    display: flex;
    background-color: #B2B7FF;
    width: 199px;
    height: 120px;
    border-radius: 4px;
  }
  .group-title {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
