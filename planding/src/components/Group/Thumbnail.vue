<template>
  <div class="thumbnail">
    <SubTitle text="썸네일 선택" style="padding: 0px; font-size: 18px" />
    <div class="body">
      <figure>
        <img src="../../assets/load.png" alt="" />
      </figure>
      <div style="font-size: 12px; align-self: end">썸네일로 지정할 이미지를 선택해주세요</div>
    </div>
  </div>
</template>

<script setup>
import SubTitle from '../ListPage/MainContent/atom/SubTitle.vue'
</script>

<style lang="scss" scoped>
.thumbnail {
  .body {
    display: flex;
    color: #6065d3;
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      width: 194px;
      height: 124px;
      background-color: #e7e7fe;
      cursor: pointer;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      img {
        width: 24px;
        height: 24px;
      }
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
