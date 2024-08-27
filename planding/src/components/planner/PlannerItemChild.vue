<template>
  <div class="container">
    <div class="title">일정 제목은 이렇다</div>
    <div class="second">
      <div class="manager">
        <div class="avatar"></div>
        <p>관리자 이름</p>
      </div>
      <div class="user">
        <div class="avatar"></div>
        <span>+3</span>
      </div>
      <div class="state">
        <StateButton
          state="pending"
          color="#e15a5a"
          width="20"
          height="20"
          label="진행중"
          style="border: none"
        />
      </div>
      <div class="end">
        <span>8월 21일</span>
        <span>까지</span>
      </div>
    </div>
    <div class="more">
      <button class="button">
        <v-icon>mdi-dots-horizontal</v-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import StateButton from './modal/StateButton.vue'
</script>

<style lang="scss" scoped>
.container {
  background-color: #f6f6f8;
  width: 904px;
  height: 41px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  border-top: 1px solid #E2E3E8;
  border-bottom: 1px solid #E2E3E8;
}
.title {
  margin-left: 32px;
  width: 472px;
  display: flex;
  justify-content: flex-start;
}
.second {
  width: 352px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  .manager {
    gap: 6px;
    width: 78px;
    display: flex;
  }
  .avatar {
    width: 16px;
    height: 16px;
    background-color: rebeccapurple;
    border-radius: 50%;
  }
  .user {
    width: 71px;
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  .state {
    width: 80px;
  }
  .end {
    width: 111px;
  }
  .more {
    .button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
    }
  }
}
</style>
