<template>
  <v-card color="#fdfdfd" width="500px" height="700px" flat rounded="lg" class="pa-5">
    <div class="card-header">
      <v-btn flat density="compact" icon="mdi-pencil-outline" />
      <v-btn flat density="compact" @click="deleteAlert = true">
        <v-icon>mdi-trash-can-outline</v-icon>
        <DeleteAlert
          @closeModal="deleteAlert = false"
          v-model="deleteAlert"
          @confirmDelete="deleteEvent(event.id)"
          :subtitle="event.title"
        />
      </v-btn>
      <v-btn flat density="compact" icon="mdi-close" />
    </div>

    <div class="info-header">
      <p>{{ event.title }}</p>
      <span>
        {{
          `${formatedDate(event.start)} ${formatedTime(event.start)} ~ ${formatedTime(event.end)}`
        }}</span
      >
    </div>
    <v-divider class="mt-3" length="500px" thickness="2px"></v-divider>

    <v-expansion-panels class="my-6" flat>
      <v-expansion-panel>
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          <v-icon>mdi-account-group-outline</v-icon>
          <span class="ml-2">스케줄 참여자</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-for="i in group.userScheduleAttendances">
            <div class="attendance" v-if="i.userCode !== userStore.userCode">
              <span>{{ i.userName }}</span>
              <v-chip variant="outlined"> 참여</v-chip>
            </div>
            <div class="attendance" v-else-if="i.status === 'POSSIBLE'">
              <span>{{ i.userName }}</span>
              <v-btn
                @click="handleAttandance(event.id, 'IMPOSSIBLE')"
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
        @click="handleAttandance(event.id, 'POSSIBLE')"
        width="90%"
        color="#656ae6"
        variant="outlined"
        >스케줄 참여하기</v-btn
      >
    </div>
  </v-card>
</template>

<script setup>
import DeleteAlert from '../SmallTools/DeleteAlert.vue'
import { participationGroupSchedule } from '@/service/attendaceController'
import { usegroupScheduleStore } from '@/store/groupSchedule'
import { useAuthStore } from '@/store/store'
import { ref } from 'vue'

const userStore = useAuthStore()
const groupSchedule = usegroupScheduleStore()
const deleteAlert = ref(false)
defineProps({
  event: Object,
  isVisible: Boolean,
  group: Object
})
const emit = defineEmits(['deleteEvent', 'closeModal'])

function formatedDate(date) {
  const days = ['일', '월', '화', '수', '목', '금', '토']

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = days[date.getDay()]

  return `${year}.${month}.${day} (${dayOfWeek})`
}

function formatedTime(date) {
  return date.getHours() + (date.getHours() >= 12 ? 'PM' : 'AM')
}

function deleteEvent(id) {
  deleteAlert.value = false
  emit('deleteEvent', id)
}
async function handleAttandance(scheduleId, status) {
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
.card-header {
  display: flex;
  justify-content: end;
  gap: 10px;
}
.info-header {
  p {
    font-size: 22px;
    font-weight: 700;
  }
  span {
    font-size: 14px;
    opacity: 0.7;
  }
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
.attendance {
  display: flex;
  justify-content: space-between;
}
</style>
