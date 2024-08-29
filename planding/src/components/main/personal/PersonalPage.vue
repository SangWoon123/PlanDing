<template>
  <LeftRightContainer :create="create">
    <ScheduleManager>
      <div style="display: flex; align-items: center">
        <img :src="userInfo.profileImage" alt="" />
        <span style="font-size: 20px; margin: 5px"
          >{{ userInfo.userName }}
          <span style="font-size: 18px; font-weight: 100">님의 개인스케줄</span>
        </span>
      </div>
      <UsersProfile />
      <template v-slot:calendar>
        <PersonalSchedule />
      </template>
    </ScheduleManager>
  </LeftRightContainer>
</template>

<script setup>
import LeftRightContainer from '../LeftRightContainer.vue'
import ScheduleManager from '../ScheduleManager.vue'
import PersonalSchedule from './PersonalSchedule.vue'
import UsersProfile from '@/components/ui/user/UsersProfile.vue'
import { useAuthStore } from '@/store/store'
import { scheduleStore } from '@/store/schedule'

const userInfo = useAuthStore()
const schedulesStore = scheduleStore()
const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

async function create(postInfo) {
  const schedule = await schedulesStore.createPersonalSchedule(postInfo)
  schedulesStore.events.push({
    id: schedule.id,
    title: schedule.title,
    start: new Date(new Date(schedule.scheduleDate).setHours(schedule.startTime)),
    end: new Date(new Date(schedule.scheduleDate).setHours(schedule.endTime)),
    color: colors[rnd(0, colors.length - 1)],
    timed: true
  })
}
</script>

<style lang="scss" scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 9999px;
  border: 2px solid #5f64d9;
  margin-right: 20px;
}
</style>
