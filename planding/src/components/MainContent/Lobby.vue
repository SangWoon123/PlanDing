<template>
  <section id="container">
    <RightComponent :invitations="alarmStore.invites" :schedules="alarmStore.scheduleAlarm">
      <template #footer>
        <Footer :data="todaySchedule" />
      </template>
    </RightComponent>
    <div class="mid">
      <div class="inner">
        <h1 class="title">PlanDing</h1>

        <SubTitle text="My Plan" />
        <div class="plan-content" :style="{ height: height }">
          <GroupRoom
            @click="navigatorToPersonal"
            :img="img"
            title="김상운 개인플래너"
            :createdAt="createdAt"
          />
        </div>

        <SubTitle text="Team Plan" />
        <div class="team-plan-content" style="height: 100%; border-radius: 0 0 4px 4px">
          <GroupRoom class="group-room" @click="createGroup" title="그룹 생성" />
          <div v-if="!loading" v-for="group in groupStore.groups" :key="group.id">
            <MouseOver :groupCode="group.code" :bookmark="isBookmarked(group.code)">
              <GroupRoom
                @click="navigatorToGroup(group)"
                :img="group.thumbnailPath"
                :title="group.name"
                :createdAt="createdAt"
              />
            </MouseOver>
          </div>

          <!-- 데이터 로딩중일때 -->
          <div v-else>
            <Progress />
          </div>
        </div>
      </div>
    </div>

    <LeftComponent :favoriteGroup="groupStore.favoriteGroups" />

    <!-- Group 모달 -->
    <GroupCreate v-if="groupModal" @closeModal="groupModal = false" @close="groupModal = false" />
    <!-- 알람 -->
    <ScheduleAlarm :data="data" @remove="removeAlert" />
    <InviteAlarm :data="invite" @remove="removeAlert" />
  </section>
</template>

<script setup>
import { onMounted, ref, provide } from 'vue'
import RightComponent from './right/\bRightComponent.vue'

import { userGroupsStore } from '@/store/group'
import SubTitle from '../ui/SubTitle.vue'
import GroupRoom from './group/GroupRoom.vue'
import Footer from './right/Footer.vue'
import GroupCreate from '@/components/Group/GroupCreate.vue'
import Progress from '@/components/ui/Progress.vue'
import router from '@/router'
import { authInstance } from '@/service/authAxios'
import MouseOver from '../ui/MouseOver.vue'
import LeftComponent from './left/LeftComponent.vue'
import { useAlarmStore } from '@/store/alarm'
import { sseConnect } from '@/service/sseService'
import ScheduleAlarm from '../Notification/schedule/ScheduleAlarm.vue'
import InviteAlarm from '../Notification/invite/InviteAlarm.vue'

const createdAt = '1시간전'

const groupModal = ref(false)
const loading = ref(true)
const todaySchedule = ref([])

const groupStore = userGroupsStore()
const alarmStore = useAlarmStore()

const createGroup = () => {
  groupModal.value = !groupModal.value
}

function isBookmarked(groupCode) {
  return groupStore.favoriteGroups.some((group) => group.code === groupCode)
}

const navigatorToGroup = (group) => {
  router.push({
    path: `/group/${group.code}`
  })
}

function navigatorToPersonal() {
  router.push({
    path: '/personal'
  })
}

const fetchGroups = async () => {
  try {
    await groupStore.getGroups()
    loading.value = false
  } catch (error) {
    console.log('그룹 데이터 실패', error)
  } finally {
    loading.value = false
  }
}

async function showTodaySchedule() {
  const response = await authInstance('/api/v1/common/schedule/today').get()
  return response.data.data
}

async function fetchAlarmMessage() {
  alarmStore.getInvites()
  alarmStore.getSchedule()
}

onMounted(async () => {
  //SSE
  if (!connect.value) {
    initializeConnection()
  }
  // 유저 그룹 가져오기
  fetchGroups()
  // 오늘 스케줄
  todaySchedule.value = await showTodaySchedule()
  // 즐겨찾기 그룹
  await groupStore.getFavoriteGroups()
  // 초대
  fetchAlarmMessage()
})

const data = ref([])
const invite = ref([])
const connect = ref(null)

function initializeConnection() {
  if (connect.value) {
    connect.value.close()
    return
  }
  connect.value = sseConnect()

  connect.value.onopen = () => {
    provide('sse', connect)

    console.log('Connection to server opened.')
  }

  connect.value.onmessage = (e) => {
    const parsedData = JSON.parse(e.data)
    if (parsedData.notificationType === 'INVITE') {
      alarmStore.invites.push(parsedData)
      invite.value.push(parsedData)
    } else if (
      parsedData.notificationType === 'PERSONAL_SCHEDULE' ||
      parsedData.notificationType === 'GROUP_SCHEDULE'
    ) {
      alarmStore.scheduleAlarm.push(parsedData)
      data.value.push(parsedData)
    }
  }

  connect.value.error = (e) => {
    console.log(e.code, e.wasClean)
    setTimeout(initializeConnection, 3000)
  }
}

function removeAlert(item) {
  data.value = data.value.filter((alert) => alert.id !== item.scheduleId)
}
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5fd;

  .mid {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1012px;
    height: 861px;
    border-radius: 16px;
    margin: 0 15px 0 15px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    .inner {
      background-color: #e8e9fa;
      width: 96.04%;
      // height: 808px;
      height: 97%;
      border: 1px solid #5f64d9;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .title {
        font-family: 'Pretendard-Regular';
        font-weight: 900;
        font-size: 35px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        background-color: #8487e2;
        color: #ffffff;
        padding: 12px;
        border-radius: 4px 4px 0 0;
      }
      .plan-content,
      .team-plan-content {
        background-color: #ffffff;
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
        .group-room {
          color: #363bc9;
          font-weight: 600;
        }
      }
      .team-plan-content {
        overflow-y: auto;
        scrollbar-color: #8487e2 #f6f6f8;
      }
    }
  }
}
</style>
