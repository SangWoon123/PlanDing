<template>
  <div class="mid">
    <div class="inner">
      <div class="title">
        <slot></slot>
        <UsersProfile />
      </div>
      <div class="calendar">
        <slot name="calendar"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import UsersProfile from '../ListPage/Information/UsersProfile.vue';
</script>

<style lang="scss" scoped>
.mid {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1012px;
  height: 848px;
  border-radius: 16px;
  margin: 0 15px 0 15px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  .calendar {
    overflow-y: auto;
    border-radius: 4px;
    scrollbar-color: #8487e2 #f6f6f8;
  }
  .inner {
    background-color: #e8e9fa;
    width: 96.04%;
    height: 808px;
    border: 1px solid #5f64d9;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    .title {
      font-family: 'Pretendard-Regular';
      font-weight: 900;
      font-size: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 80px;
      background-color: #8487e2;
      color: #ffffff;
      padding: 12px;
      border-radius: 4px 4px 0 0;
      position: relative;
    }
  }
}
</style>
