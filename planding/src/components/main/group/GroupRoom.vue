<template>
    <div class="group-box">
      <figure>
        <img :src="img" :class="{ 'img-false': !img }" alt="" />
      </figure>
      <div class="group-title">
        <span>{{ title }}</span>

        <span style="color: #bebebe; font-size: 13px">{{ createdAt }}</span>
      </div>
    </div>
</template>

<script setup>
defineProps({
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
  margin: 0 12px 0 0;
  box-sizing: border-box;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  figure {
    display: flex;
    background-color: #b2b7ff;
    width: 199px;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .img-false {
      width: 0;
    }
  }
  .group-title {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
  }
}
</style>
