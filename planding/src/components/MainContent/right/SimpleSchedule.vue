<template>
  <div :class="isPast ? 'past-box' : 'box'">
    <div class="header">
      <span>
        {{ `${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}` }}
      </span>
      <span class="group" v-if="schedule.groupName"></span>
    </div>
    <span>{{ schedule.title }}</span>
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
  const endTime = props.schedule.endTime
  return endTime < new Date().getHours()
})
</script>

<style lang="scss" scoped>
.past-box {
  width: 240px;
  height: 68px;
  border: 1px solid orange;
  border-radius: 4px;
  color: orange;
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
  }
  .group {
    width: 15px;
    height: 15px;
    border-radius: 999px;
    background-color: #6065d4;
  }
}
</style>
