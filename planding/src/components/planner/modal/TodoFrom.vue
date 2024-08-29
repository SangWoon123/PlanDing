<template>
  <div>
    <div class="todo-select">
      <label>스케줄 선택</label>
      <v-select
        class="select"
        :items="groupScheduleStore.groupSchedules"
        v-model="formData.scheduleId"
        variant="outlined"
        item-value="id"
        item-text="name"
      ></v-select>
    </div>
    <div class="todo-name">
      <label>일정이름</label>
      <input
        type="text"
        class="todo-name__input"
        placeholder="이름을 지어주세요"
        v-model="formData.title"
      />
    </div>

    <div class="todo-state">
      <label>일정 상태</label>
      <div class="todo-state__group">
        <StateButton
          v-for="(button, index) in stateButtons"
          :key="index"
          :status="button.status"
          :label="button.label"
          :color="button.color"
          @select="updateStatus"
          :selectedState="formData.status"
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
          v-model="formData.scheduleDate"
        />
        <v-select
          max-width="120px"
          label="Time"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-clock-time-four-outline"
          :items="timeOptions"
          v-model="formData.deadlineTime"
        ></v-select>
      </div>
    </div>

    <div class="detail">
      <label for="">일정 상세 설명</label>
      <textarea placeholder="설명을 적어주세요" class="textarea" v-model="formData.content" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { usePlannerStore } from '@/store/planner'
import { usegroupScheduleStore } from '@/store/groupSchedule'
import StateButton from './StateButton.vue'

const plannerStore = usePlannerStore()
const groupScheduleStore = usegroupScheduleStore()
const formData = reactive(plannerStore.formData)

const stateButtons = [
  { status: 'IN_PROGRESS', label: '진행중', color: '#f3ee6e' },
  { status: 'DONE', label: '완료', color: '#87df79' },
  { status: 'TODO', label: '진행대기', color: '#e15a5a' }
]
const timeOptions = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24'
]

function updateStatus(status) {
  plannerStore.updateFormData({ status: status })
}

watch(
  () => formData.scheduleDate,
  (newVal) => {
    plannerStore.updateFormData({ scheduleDate: newVal })
  }
)

watch(
  () => formData.deadlineTime,
  (newVal) => {
    plannerStore.updateFormData({ deadlineTime: newVal })
  }
)

watch(
  () => formData.content,
  (newVal) => {
    plannerStore.updateFormData({ content: newVal })
  }
)
</script>

<style lang="scss" scoped>
:deep(.v-field__overlay) {
  height: 40px !important;
  border-radius: 8px !important;
}
.textarea {
  width: 392px;
  height: 100px;
  border: 1px solid #a2a3b6;
  border-radius: 8px;
  padding: 10px;
  resize: none;
}
.todo-select {
  display: flex;
  flex-direction: column;
  gap: 5px;
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
    height: 40px;
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
