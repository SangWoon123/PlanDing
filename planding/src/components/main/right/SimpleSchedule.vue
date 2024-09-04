<template>
  <div :class="isPast ? 'past-box' : 'box'">
    <div class="header">
      <span class="time">
        {{ `${formatTime(schedule.scheduleCommonResponse.startTime)} - ${formatTime(schedule.scheduleCommonResponse.endTime)}` }}
      </span>
      <span class="group" v-if="schedule.scheduleCommonResponse.groupName"></span>
    </div>
    <span class="title">{{ schedule.scheduleCommonResponse.title }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  schedule: Object
})
function formatTime(time) {
  const formatedTime = time >= 12 ? `${time} PM` : `${time} AM`
  return formatedTime
}

const isPast = computed(() => {
  const endTime = props.schedule.scheduleCommonResponse.endTime
  return endTime < new Date().getHours()
})
</script>

<style lang="scss" scoped>
.past-box {
  width: 240px;
  height: 68px;
  border: 1px solid #a2a3b6;
  border-radius: 4px;
  background-color: #e7e7fe;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
.box {
  width: 240px;
  height: 68px;
  border: 1px solid #a2a3b6;
  border-radius: 4px;
  color: #8e8fa5;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    span {
      color: black;
    }
  }
  .group {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background-color: #c565e6;
  }
}
.time {
  color: #4f4f4f;
}
.title {
  font-size: 16px;
  font-weight: 900;
}
</style>
