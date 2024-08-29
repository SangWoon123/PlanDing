<template>
  <div id="container">
    <div class="avatar"></div>
    <div class="text">
      <p>그룹</p>
      <p>사용자</p>
    </div>
    <button class="button"></button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#container {
  display: flex;
  background-color: #f0f0fd;
  width: 160px;
  height: 52px;
  padding: 8px;
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: white;
  }
  .text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    flex: 2;
    :nth-child(1) {
      font-size: 14px;
    }
    :nth-child(2) {
      font-size: 12px;
    }
  }
  .button {
    width: 8px;
    height: 8px;
    background-color: #c565e6;
    border-radius: 50%;
  }
}
</style>
