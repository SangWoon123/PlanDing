<template>
  <div class="planner-item-outer" @click="click = !click">
    <div class="planner-item">
      <div class="planner-item__title">
        <button class="button">
          <v-icon>{{ click ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </button>
        일정 제목은 이렇다
      </div>
      <div class="planner-item__schedule">5개</div>
      <div class="planner-item__start">2024년 8월 18일</div>
      <div class="planner-item__end">2024년 8월 18일</div>
      <!-- <AddButton text="상세보기" class="planner-item__details" icon="mdi-chevron-right" type /> -->
    </div>
  </div>
  <div v-if="click">
    <PlannerItemChild />
  </div>
</template>

<script setup>
import PlannerItemChild from './PlannerItemChild.vue'
import { ref } from 'vue'
const click = ref(false)
</script>

<style lang="scss" scoped>
.planner-item-outer {
  width: 932px;
  height: 42px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 8px;

  .planner-item {
    width: 668px;
    height: 35px;
    display: flex;
    justify-content: flex-start;
  }

  &:hover {
    background-color: #f0f0fd;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    padding: 0 8px;
    .planner-item__title {
      width: 264px;
      display: flex;
      justify-content: flex-start;
      gap: 4px;
      .button {
        background-color: #f0f0fd;
        border-radius: 50%;
      }
    }
    .planner-item__schedule {
      width: 60px;
    }
    .planner-item__start {
      width: 160px;
    }
    .planner-item__end {
      width: 160px;
    }
  }

  &__details {
    flex: 0.5;
  }
}
</style>
