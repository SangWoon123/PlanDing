<template>
  <section id="container">
    <div class="left"></div>
    <div class="mid">
      <div class="inner">
        <div class="title">PlanDing</div>

        <SubTitle text="My Plan" />
        <div class="plan-content" :style="{ height: height }">
          <GroupRoom :img="img" :title="title" :createdAt="createdAt" />
        </div>

        <SubTitle text="Team Plan" />
        <div class="plan-content" style="height: 100%; border-radius: 0 0 4px 4px">
          <GroupRoom title="그룹 생성" style="color: #363bc9; cursor: pointer" />
          <GroupRoom :img="img" :title="title" :createdAt="createdAt" />
        </div>
      </div>
    </div>
    <div class="right">
      <Top />
      <DatePicker />
      
    </div>
  </section>
</template>

<script setup>
import SubTitle from './atom/SubTitle.vue'
import GroupRoom from './GroupRoom.vue'
import Top from './right/Top.vue'
import DatePicker from './right/DateSelect.vue'

const title = '박철현님의 일정'
const createdAt = '1시간전'
const myplan = 'My Plan'
const teamplan = 'Team Plan'
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5fd;

  .left {
    background-color: #ffffff;
    width: 88px;
    height: 781px;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

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
        align-items: center;
        width: 100%;
        height: 80px;
        background-color: #8487e2;
        color: #ffffff;
        padding: 12px;
        border-radius: 4px 4px 0 0;
      }
      .plan-content {
        background-color: #ffffff;
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  .right {
    background-color: #ffffff;
    width: 320px;
    height: 860px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
