<template>
  <div>
    <v-expansion-panels class="my-6" flat>
      <v-expansion-panel>
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          <v-icon>mdi-account-group-outline</v-icon>
          <span class="ml-2">스케줄 참여자</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-for="i in detailGroup(groupId).userScheduleAttendances">
            <div class="attendance" v-if="i.userCode !== userStore.userCode">
              <span>{{ i.userName }}</span>
              <v-chip variant="outlined"> 참여</v-chip>
            </div>
            <div class="attendance" v-else-if="i.status === 'POSSIBLE'">
              <span>{{ i.userName }}</span>
              <v-btn
                @click="handleAttandance(groupId, 'IMPOSSIBLE')"
                variant="outlined"
                color="error"
                >참여 취소</v-btn
              >
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="button-container">
      <v-btn
        @click="handleAttandance(groupId, 'POSSIBLE')"
        width="90%"
        color="#656ae6"
        variant="outlined"
        >스케줄 참여하기</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/store'
import { userGroupsStore } from '@/store/group'
import { usegroupScheduleStore } from '@/store/groupSchedule'
import { participationGroupSchedule } from '@/service/attendaceController'

const userStore = useAuthStore()
const group = userGroupsStore()
const groupSchedule = usegroupScheduleStore()

defineProps({
  groupId: Number
})

function detailGroup(scheduleId) {
  const schedule = groupSchedule.groupSchedules.find((schedule) => schedule.id === scheduleId)
  return schedule
}

const handleAttandance = async (scheduleId, status) => {
  await participationGroupSchedule(scheduleId, status)
  const schedule = groupSchedule.groupSchedules.find((schedule) => schedule.id === scheduleId)
  if (schedule) {
    const userAttendance = schedule.userScheduleAttendances.find(
      (user) => user.userCode === userStore.userCode
    )
    if (userAttendance) {
      userAttendance.status = status
    } else if (status === 'POSSIBLE') {
      schedule.userScheduleAttendances.push({
        userCode: userStore.userCode,
        userName: userStore.userName,
        status: 'POSSIBLE'
      })
    }
  }
}
</script>

<style scoped>
.attendance {
  display: flex;
  justify-content: space-between;
}
.button-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 10px;
}
</style>
