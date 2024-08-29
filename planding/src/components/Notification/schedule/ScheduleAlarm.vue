<template>
  <div class="alerts-container">
    <div v-for="(item, index) in data" :key="item.scheduleId || index">
      <div class="alert-list">
        <v-expand-transition group>
          <v-alert
            rounded="xl"
            prominent
            width="450px"
            height="100px"
            color="#FFFFFF"
            elevation="2"
            closable
            @click:close="handleClose(item)"
          >
            <template v-slot:prepend>
              <img src="/planding_icon.png" alt="Icon" class="alert-icon" />
            </template>

            <div class="alert-content">
              <div class="alert-title">
                <div class="alert-title-header">
                  <span> 스케줄 알람이 도착하였습니다 ⏰ </span>
                  <span>from PlanDing</span>
                </div>
                <span>now</span>
              </div>
              <span class="alert-text">{{ alertText(item) }}</span>
            </div>
          </v-alert>
        </v-expand-transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['remove'])
defineProps({
  data: Array
})
function alertText(item) {
  const type = item.notificationType
  const time = item.time
  const message = item.message
  const groupName = item.groupName ? `그룹: ${item.groupName}` : ''
  console.log(type)
  if (type === 'GROUP_SCHEDULE') {
    return `${time}시에 ${groupName}에서 스케줄 알림: ${message}`
  } else if (type === 'PERSONAL_SCHEDULE') {
    return `${time}시에 개인 스케줄 알림: ${message}`
  } else {
    return `알 수 없는 스케줄 알림: ${message}`
  }
}
function handleClose(item) {
  emit('remove', item)
}
</script>

<style lang="scss" scoped>
.alerts-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: fixed;
  right: 0;
  top: 10px;
  z-index: 10000;
  .alert-list {
    display: flex;
    flex-direction: column;
  }
}

.alert-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.alert-title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 4px;
  .alert-title-header {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
}

.alert-text {
  font-size: 14px;
}

.alert-icon {
  width: 60px;
  height: 60px;
}
</style>
