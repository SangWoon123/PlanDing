<template>
  <div class="container">
    <div class="header">
      <SubTitle text="오늘의 일정" />
    </div>
    <div class="schedule-container">
      <ol v-for="i in 10" :key="i">
        <SimpleSchedule />
      </ol>
    </div>
    <v-btn class="more-btn" flat>더 보기 </v-btn>
  </div>
</template>

<script setup>
import SubTitle from '../atom/SubTitle.vue'
import SimpleSchedule from './SimpleSchedule.vue'
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
    margin: 2px 0 15px;
  }

  .schedule-container {
    width: 100%;
    height: 220px;
    overflow-y: auto;
    padding: 10px;
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
