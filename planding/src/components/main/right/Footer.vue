<template>
  <div class="container">
    <div class="header">
      <SubTitle text="오늘의 일정" />
    </div>
    <div v-if="!props.data" class="text">{{ notSchedule() }}</div>
    <div class="schedule-container">
      <ol v-for="(item, index) in data" :key="index">
        <SimpleSchedule :schedule="item" />
      </ol>
    </div>

    <v-btn class="more-btn" flat>더 보기 </v-btn>
  </div>
</template>

<script setup>
import SubTitle from '../../ui/SubTitle.vue'
import SimpleSchedule from './SimpleSchedule.vue'

const props = defineProps({
  data: Array
})
function notSchedule() {
  if (!props.data) {
    return '오늘 일정이 없습니다.'
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 350px;
  border: 2px solid #c0c2f5;
  border-radius: 4px;
  position: relative;
  .header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
  }
  ol {
    display: flex;
    justify-content: center;
    margin: 0px 0 10px;
  }
  .text {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 14px;
    color: lightgrey;
  }

  .schedule-container {
    width: 100%;
    height: 220px;
    overflow-y: auto;
    padding: 2px;
    box-sizing: border-box;

    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #656ae6 #f6f6f8; /* Firefox */

    /* Webkit (Chrome, Safari) */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: #656ae6;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #f6f6f8;
    }
  }

  .more-btn {
    position: absolute;
    bottom: 20px;
    width: 240px;
    background-color: #656ae6;
    color: white;
  }
}
</style>
