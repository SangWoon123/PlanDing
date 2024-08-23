<template>
  <LeftRightContainer :create="create">
    <ScheduleManager>
      <div class="group-page__header">
        <div class="header-title">
          <img :src="groupInfo.thumbnailUrl" alt="Group Thumbnail" />
          {{ groupInfo.name }}
          <span style="font-size: 20px; margin: 5px; align-self: flex-end">스케줄</span>
        </div>
        <div class="group-page-header">
          <UsersProfile :users="groupInfo.users" />
          <!-- 플래너 -->
          <AddButton
            @click="loadPlanner"
            :icon="plannerIcon"
            :text="!isPlannerLoaded ? 'Planner' : 'Schedule'"
          />
          <!-- 즐겨찾기 -->
          <AddButton
            @click="toggleFavorite"
            icon="mdi-star"
            text="Favorite"
            :color="bookmarkColor"
          />
        </div>
      </div>

      <!-- 스케줄 -->
      <template #calendar>
        <component :is="isPlannerLoaded ? PlannerPage : GroupSchedule" />
      </template>
    </ScheduleManager>
  </LeftRightContainer>
  <span class="speed-dialog">
    <SubMenu />
  </span>
</template>

<script setup>
import GroupSchedule from './GroupSchedule.vue'
import PlannerPage from '@/components/planner/PlannerPage.vue'
import LeftRightContainer from '../LeftRightContainer.vue'
import ScheduleManager from '../ScheduleManager.vue'
import AddButton from '@/components/ui/AddButton.vue'

import UsersProfile from '../../ListPage/Information/UsersProfile.vue'
import SubMenu from '../dialog/SubMenu.vue'
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import { userGroupsStore } from '@/store/group'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { Stomp } from '@stomp/stompjs'
import { useAuthStore } from '@/store/store'

const groupStore = userGroupsStore()
const route = useRoute()
const groupInfo = ref({})
const userStore = useAuthStore()

const groupCode = ref(route.params.groupCode)
const isPlannerLoaded = ref(false) // Planner 버튼 상태 관리

const loadPlanner = () => {
  isPlannerLoaded.value = !isPlannerLoaded.value
}

async function toggleFavorite() {
  await groupStore.toggleFavorite(groupCode.value)
}

const bookmarkColor = computed(() => (isBookmarked.value ? 'yellow' : 'white'))
const isBookmarked = computed(() => {
  return groupStore.favoriteGroups.some((group) => group.code === groupCode.value)
})
const plannerIcon = computed(() => (isPlannerLoaded.value ? 'mdi-calendar' : 'mdi-apple'))

const create = (postInfo) => {
  const headers = {
    Authorization: `Bearer ${userStore.accessToken}`,
    groupCode: groupCode.value
  }
  client.value.send(`/pub/schedule/create/${headers.groupCode}`, {}, JSON.stringify(postInfo))
}

const fetchGroupInfo = async () => {
  await groupStore.getGroupInfo(groupCode.value)
  groupInfo.value = groupStore.getGroup()
}

const fetchInvite = async () => {
  await groupStore.getFavoriteGroups()
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
  if (client.value) {
    client.value.disconnect()
  }
})

onBeforeRouteUpdate((to, from, next) => {
  if (to.params.groupCode !== from.params.groupCode) {
    groupCode.value = to.params.groupCode
    fetchGroupInfo()
  }
  next()
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
.group-page {
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.group-page-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-title {
  display: flex;
  align-items: center;
}

.speed-dialog {
  position: absolute;
  bottom: 60px;
  right: 20px;
  z-index: 1000;
}
</style>
