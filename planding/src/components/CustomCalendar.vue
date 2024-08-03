<template>
  <v-calendar
    ref="calendar"
    class="calendar"
    v-model="value"
    :events="events"
    view-mode="week"
    :weekdays="weekday"
  >
    <template #event="{ event }">
      <!-- 이벤트 정보 출력 -->
      {{ console.log('zzz', event) }}
    </template>
  </v-calendar>
</template>

<script setup>
import { scheduleStore } from '@/store/schedule'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/store'
import { Stomp } from '@stomp/stompjs'

const VITE_APP_WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL
const userStore = useAuthStore()
const route = useRoute()
const headers = {
  Authorization: `Bearer ${userStore.accessToken}`,
  groupCode: route.params.groupCode
}

const weekday = ref([0, 1, 2, 3, 4, 5, 6])
const colors = ['#8487e2', '#5f64d9', '#656ae6']
const value = ref([new Date()])
const events = ref([])

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

function getWeekDays() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - dayOfWeek)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  return {
    startDay: startOfWeek.toISOString().split('T')[0],
    endDay: endOfWeek.toISOString().split('T')[0]
  }
}

const { startDay, endDay } = getWeekDays()

function handleWebSocketMessage(message) {
  const data = JSON.parse(message.body).data
  if (data.action === 'CREATE') {
    events.value.push({
      id: data.id,
      title: data.title,
      start: new Date(new Date(data.scheduleDate).setHours(data.startTime)),
      end: new Date(new Date(data.scheduleDate).setHours(data.endTime)),
      color: colors[rnd(0, colors.length - 1)]
    })
  }
}

let client

async function fetchData() {
  client = Stomp.client(`${VITE_APP_WEBSOCKET_URL}/api/v1/ws`)
  client.connect(headers, () => {
    client.subscribe(`/sub/schedule/${headers.groupCode}`, handleWebSocketMessage)
  })

  const schedules = await scheduleStore().getGroupScheduleOfWeek(
    useRoute().params.groupCode,
    startDay,
    endDay
  )

  schedules.data.data.forEach((schedule) => {
    events.value.push({
      id: schedule.id,
      title: schedule.title,
      start: new Date(new Date(schedule.scheduleDate).setHours(schedule.startTime)),
      end: new Date(new Date(schedule.scheduleDate).setHours(schedule.endTime)),
      color: colors[rnd(0, colors.length - 1)]
    })
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.calendar {
  background-color: #fdfdfd;
}
</style>
