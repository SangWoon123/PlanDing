<template>
  <LeftRightContainer :create="create">
    <ScheduleManager>
      <img src="/planding_icon.png" />
      <div class="group-page__header">
        <div class="group-page__header-tab">
          <SwitchTab
            :active="currentTab === 'schedule'"
            type="schedule"
            @click="setActiveTab('schedule')"
          />
          <SwitchTab
            :active="currentTab === 'planner'"
            type="planner"
            @click="setActiveTab('planner')"
          />
        </div>
      </div>
      <AddButton
        style="align-self: center"
        @click="toggleFavorite"
        icon="mdi-star"
        text="즐겨찾기"
        type
        :color="bookmarkColor"
      />

      <!-- 스케줄 -->
      <template #calendar>
        <component :is="isPlannerLoaded ? PlannerPage : GroupSchedule" />
      </template>
    </ScheduleManager>
  </LeftRightContainer>
</template>

<script setup>
import GroupSchedule from './GroupSchedule.vue'
import PlannerPage from '@/components/planner/PlannerPage.vue'
import LeftRightContainer from '../LeftRightContainer.vue'
import ScheduleManager from '../ScheduleManager.vue'
import AddButton from '@/components/ui/AddButton.vue'
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import { userGroupsStore } from '@/store/group'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { Stomp } from '@stomp/stompjs'
import { useAuthStore } from '@/store/store'
import SwitchTab from '@/components/ui/SwitchTab.vue'


const groupStore = userGroupsStore()
const route = useRoute()
const groupInfo = ref({})
const userStore = useAuthStore()
const groupCode = ref(route.params.groupCode)
const isPlannerLoaded = ref(false) // Planner 버튼 상태 관리
const currentTab = ref('schedule')

const loadPlanner = (event) => {
  isPlannerLoaded.value = event
}

function setActiveTab(tab) {
  currentTab.value = tab
  loadPlanner(tab === 'planner')
}

async function toggleFavorite() {
  await groupStore.toggleFavorite(groupCode.value)
}

const bookmarkColor = computed(() => (isBookmarked.value ? 'yellow' : 'white'))
const isBookmarked = computed(() => {
  return groupStore.favoriteGroups.some((group) => group.code === groupCode.value)
})

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
  width: 70px;
  height: 70px;
}

.group-page {
  &__header {
    width: 80%;
    display: flex;
    justify-content: space-between;
    &-tab {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
