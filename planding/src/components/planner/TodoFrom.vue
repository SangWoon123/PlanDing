<template>
  <div>
    <div class="todo-name">
      <label>일정이름</label>
      <input type="text" class="todo-name__input" placeholder="이름을 지어주세요" />
    </div>

    <div class="todo-state">
      <label>일정 상태</label>
      <div class="todo-state__group">
        <StateButton
          label="진행중"
          state="progress"
          color="#f3ee6e"
          :selectedState="selectedState"
          @select="selectState"
        />
        <StateButton
          state="complete"
          label="완료"
          color="#87df79"
          :selectedState="selectedState"
          @select="selectState"
        />
        <StateButton
          state="pending"
          label="진행대기"
          color="#e15a5a"
          :selectedState="selectedState"
          @select="selectState"
        />
      </div>
    </div>

    <div class="deadline">
      <label>마감 기한</label>
      <div class="deadline-content">
        <v-date-input
          label="마감"
          transition="picker-transition"
          elevation="20"
          color="#656ae6"
          density="compact"
          prepend-icon=""
          variant="outlined"
          show-adjacent-months
          append-inner-icon="mdi-calendar-check"
        />
        <v-select
          max-width="120px"
          label="Time"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-clock-time-four-outline"
          :items="['01', '02', '03', '04', '05', '06']"
        ></v-select>
      </div>
    </div>

    <div class="detail">
      <label for="">일정 상세 설명</label>
      <textarea placeholder="설명을 적어주세요" class="textarea" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StateButton from './StateButton.vue'

const selectedState = ref('')
function selectState(state) {
  selectedState.value = state
}
</script>

<style lang="scss" scoped>
.textarea {
  width: 392px;
  height: 120px;
  border: 1px solid #a2a3b6;
  border-radius: 8px;
  padding: 10px;
  resize: none;
}
.todo-name {
  display: flex;
  flex-direction: column;
  gap: 5px;
  &__input {
    border: 1px solid #a2a3b6;
    border-radius: 8px;
    padding: 10px;
    resize: none;
    margin-bottom: 20px;
  }
}

.todo-state {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
  &__group {
    display: flex;
    gap: 14px;
  }
}

.deadline {
  display: flex;
  flex-direction: column;
  gap: 5px;
  .deadline-content {
    display: flex;
    gap: 30px;
  }
}
.detail {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
:deep(.deadline-content .v-input__control) {
  overflow: visible; /* 숨겨진 부분을 보이게 */
}
</style>
