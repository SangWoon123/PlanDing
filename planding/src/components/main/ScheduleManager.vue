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
import UsersProfile from '../ui/user/UsersProfile.vue'
</script>

<style lang="scss" scoped>
.mid {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1012px;
  height: 861px;
  border-radius: 16px;
  margin: 0 15px 0 15px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  .calendar {
    overflow-y: auto;
    border-radius: 0 0 8px 8px;
    scrollbar-color: #8487e2 #f6f6f8;
  }
  .inner {
    background-color: #e8e9fa;
    width: 96.04%;
    // height: 841px;
    height: 97%;
    border: 2px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    .title {
      font-weight: 900;
      font-size: 30px;
      display: flex;
      align-items: flex-end;
      width: 100%;
      height: 80px;
      background-color: #ffffff;
      color: #ffffff;
      border-radius: 8px 8px 0 0;
      position: relative;
      border-bottom: 1px solid #a2a3b6;
    }
  }
}
</style>
