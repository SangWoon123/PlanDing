<template>
  <section id="container">
    <div class="left"></div>
    <div class="mid">
      <div class="inner">
        <div class="title">
          <div style="display: flex; align-items: center">
            <img :src="groupInfo.thumbnailUrl" alt="" />
            {{ groupInfo.name }}
            <span style="font-size: 20px; margin: 5px; align-self: flex-end">스케줄</span>
          </div>
          <UsersProfile :users="groupInfo.users" />
        </div>
        <!-- <p>{{ meesage }}</p> -->

        <CustomCalendar class="calendar" />
      </div>
    </div>
    <div class="right">
      <Top />
      <DatePicker />
      <ScheduleCreate />
    </div>
  </section>
</template>

<script setup>
import CustomCalendar from '@/components/CustomCalendar.vue'
import DatePicker from '../MainContent/right/DateSelect.vue'
import Top from '../MainContent/right/HeaderSection.vue'
import UsersProfile from './UsersProfile.vue'
import ScheduleCreate from './ScheduleCreate.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { groupsStore } from '@/store/group'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/store'
import { Stomp } from '@stomp/stompjs'

const userStore = useAuthStore()
const groupStore = groupsStore()
const route = useRoute()
const groupInfo = ref({})
const meesage = ref({})

const fetchGroupInfo = async () => {
  const groupCode = route.params.groupCode
  await groupStore.getGroupInfo(groupCode)
  groupInfo.value = groupStore.getGroup()
}

//웹소켓 연결
let client;
const connectWebsocket = () => {
  const VITE_APP_WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL
  client = Stomp.client(`${VITE_APP_WEBSOCKET_URL}/api/v1/ws`)
  const headers = {
    Authorization: `Bearer ${userStore.accessToken}`,
    groupCode: route.params.groupCode
  }
  client.connect(headers, function () {
    client.subscribe(`/sub/schedule/${headers.groupCode}`, function (message) {
      meesage.value = JSON.parse(message.body).data
    })
  })
}

// 컴포넌트가 마운트될 때 그룹 정보를 가져옴
onMounted(() => {
  fetchGroupInfo()
  connectWebsocket()
})

onUnmounted(() => {
  client.disconnect()
})
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5fd;

  .left {
    background-color: #ffffff;
    width: 88px;
    height: 781px;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .mid {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1012px;
    height: 848px;
    border-radius: 16px;
    margin: 0 15px 0 15px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    .calendar {
      overflow-y: auto;
      border-radius: 4px;
      scrollbar-color: #8487e2 #f6f6f8;
    }
    .inner {
      background-color: #e8e9fa;
      width: 96.04%;
      height: 808px;
      border: 1px solid #5f64d9;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .title {
        font-family: 'Pretendard-Regular';
        font-weight: 900;
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        background-color: #8487e2;
        color: #ffffff;
        padding: 12px;
        border-radius: 4px 4px 0 0;
        position: relative;
        img {
          width: 60px;
          height: 60px;
          border-radius: 9999px;
          border: 2px solid #5f64d9;
          margin-right: 20px;
        }
      }
      .plan-content,
      .team-plan-content {
        background-color: #ffffff;
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
        .group-room {
          color: #363bc9;
        }
      }
      .team-plan-content {
        overflow-y: auto;
        scrollbar-color: #8487e2 #f6f6f8;
      }
    }
  }
  .right {
    background-color: #ffffff;
    width: 320px;
    height: 860px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
