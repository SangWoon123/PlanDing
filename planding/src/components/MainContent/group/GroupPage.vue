<template>
  <LeftRightContainer :create="create">
    <ScheduleManager>
      <div style="display: flex; align-items: center">
        <img :src="groupInfo.thumbnailUrl" alt="" />
        {{ groupInfo.name }}
        <span style="font-size: 20px; margin: 5px; align-self: flex-end">스케줄</span>
      </div>
      <div class="title-user">
        <UsersProfile :users="groupInfo.users" />
      </div>
      <template v-slot:calendar>
        <GroupSchedule />
      </template>
    </ScheduleManager>
  </LeftRightContainer>
  <span class="speed-dialog">
    <SubMenu />
  </span>
</template>

<script setup>
import GroupSchedule from './GroupSchedule.vue'
import LeftRightContainer from '../LeftRightContainer.vue'
import ScheduleManager from '../ScheduleManager.vue'

import UsersProfile from '../../ListPage/Information/UsersProfile.vue'
import SubMenu from '../dialog/SubMenu.vue'
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { userGroupsStore } from '@/store/group'
import { useRoute } from 'vue-router'
import { Stomp } from '@stomp/stompjs'
import { useAuthStore } from '@/store/store'

const groupStore = userGroupsStore()
const route = useRoute()
const groupInfo = ref({})
const userStore = useAuthStore()

const create = (postInfo) => {
  const headers = {
    Authorization: `Bearer ${userStore.accessToken}`,
    groupCode: route.params.groupCode
  }
  client.value.send(`/pub/schedule/create/${headers.groupCode}`, {}, JSON.stringify(postInfo))
}


const fetchGroupInfo = async () => {
  const groupCode = route.params.groupCode
  await groupStore.getGroupInfo(groupCode)
  groupInfo.value = groupStore.getGroup()
}

const fetchInvite = async () => {
  groupStore.getFavoriteGroups()
}

//웹소켓 연결
const client = ref(null)
const connectWebsocket = () => {
  const VITE_APP_WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL
  client.value = Stomp.client(`${VITE_APP_WEBSOCKET_URL}/api/v1/ws`)
  return client
}

provide('websocketClient', connectWebsocket())

// 컴포넌트가 마운트될 때 그룹 정보를 가져옴
onMounted(() => {
  fetchGroupInfo()
  fetchInvite()
})

onUnmounted(() => {
  client.value.disconnect()
})
</script>

<style lang="scss" scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 9999px;
  border: 2px solid #5f64d9;
  margin-right: 20px;
}
.title-user {
  display: flex;
  gap: 10px;
}

.speed-dialog {
  position: absolute;
  bottom: 60px;
  right: 20px;
  z-index: 1000;
}
</style>
