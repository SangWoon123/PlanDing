<template>
  <div class="planner-item-outer" @click="whenClick">
    <div class="planner-item">
      <div class="planner-item__title">
        <button class="button">
          <v-icon>{{ click ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </button>
        {{ schedule.scheduleTitle }}
      </div>
      <div class="planner-item__schedule">{{ `${schedule.planners.length} 개` }}</div>
      <div class="planner-item__start">{{ schedule.scheduleDate }}</div>
      <div class="planner-item__end">2024년 8월 18일</div>
      <!-- <AddButton text="상세보기" class="planner-item__details" icon="mdi-chevron-right" type /> -->
    </div>
  </div>
  <div v-if="click">
    <div v-for="(planner, index) in schedule.planners" :key="index">
      <PlannerItemChild :planner="planner" />
    </div>
  </div>
</template>

<script setup>
import PlannerItemChild from './PlannerItemChild.vue'
import { ref } from 'vue'
import { usePlannerStore } from '@/store/planner'
import { useRoute } from 'vue-router'
const props = defineProps({
  schedule: Object
})
const click = ref(false)

function whenClick() {
  click.value = !click.value
}
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
