<template>
  <BaseCard id="section" style="max-width: 848px; height: 575px">
    <header class="schedule-header">
      <h2 style="color: #3e418c">일정 생성하기</h2>
      <p>생성할 일정의 정보를 입력해 주세요</p>
      <v-divider></v-divider>
    </header>

    <div class="schedule-body">
      <div class="schedule-form">
        <TodoFrom />
      </div>
      <div class="schedule-people">
        <PeopleSetting />
      </div>
    </div>
    <div class="schedule-actions">
      <v-btn rounded="lg" color="#656AE6">일정 만들기</v-btn>
      <v-btn rounded="lg" color="#656AE6" variant="outlined">취소</v-btn>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../ui/BaseCard.vue'
import TodoFrom from './TodoFrom.vue'
import PeopleSetting from './PeopleSetting.vue'
</script>

<style lang="scss" scoped>
#section {
  padding: 20px;
  .schedule-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
    p {
      font-size: 12px;
    }
  }
  .schedule-body {
    display: flex;
    gap: 20px;
    .schedule-form,
    .schedule-people {
      flex: 1;
    }
  }
}
.schedule-actions {
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
