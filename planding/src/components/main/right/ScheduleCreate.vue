<template>
  <!-- type 스케줄일시 true 아닐시 false -->
  <div v-if="!type" class="container">
    <form class="box" @submit.prevent="create(postInfo)">
      <input v-model.trim="title" type="text" placeholder="제목을 입력해주세요." />
      <textarea
        v-model.trim="content"
        style="height: 90px"
        type="text"
        placeholder="일정 내용을 입력해주세요."
      />

      <div class="time-picker">
        <TimePicker @update:time="startTime = $event" :label="'부터'" style="margin-right: 5px" />
        <TimePicker @update:time="endTime = $event" :label="'까지'" style="margin-left: 5px" />
      </div>
      <DateInput @updated:date="scheduleDate = $event" />
      <div class="btn">
        <v-btn flat class="new" type="submit">생성하기</v-btn>
        <v-btn flat class="cancle">취소하기</v-btn>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DateInput from '../../ui/date/DateInput.vue'
import TimePicker from '../../ui/date/TimePicker.vue'
defineProps({
  create: Function,
  type: Boolean
})
const title = ref(null)
const content = ref(null)
const startTime = ref(null)
const endTime = ref(null)
const scheduleDate = ref(null)

const postInfo = computed(() => ({
  title: title.value,
  content: content.value,
  startTime: startTime.value,
  endTime: endTime.value,
  scheduleDate: scheduleDate.value
}))
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 350px;
  border: 2px solid #c0c2f5;
  border-radius: 8px;
  position: relative;
  .box {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .time-picker {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
}
input,
textarea {
  width: 240px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e2e3e8;
  font-size: 14px;
  color: #8487e2;
  padding: 10px;
  margin-bottom: 16px;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .new {
    font-size: 16px;
    background-color: #656ae6;
    color: white;
    width: 114px;
    height: 36px;
    border-radius: 4px;
  }
  .cancle {
    font-size: 16px;
    border: 1px solid #656ae6;
    color: #656ae6;
    width: 114px;
    height: 36px;
    border-radius: 4px;
  }
}
</style>
