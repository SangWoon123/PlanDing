<template>
  <CustomCalendar :fetchData="fetchData" :events="events">
    <template #group="{ event }">
      <EventCard :event="event" @deleteEvent="deleteEvent" />
    </template>
  </CustomCalendar>
</template>

<script setup>
import CustomCalendar from '@/components/Calendar/CustomCalendar.vue'
import EventCard from '@/components/Calendar/group/GroupEventCard.vue'
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/store'
import { scheduleStore } from '@/store/schedule'
import { usegroupScheduleStore } from '@/store/groupSchedule'

//socket
const route = useRoute()
const client = inject('websocketClient')
const userStore = useAuthStore()
const headers = {
  Authorization: `Bearer ${userStore.accessToken}`,
  groupCode: route.params.groupCode
}

const value = ref([new Date()])
const events = ref([])
const view_mode = ref('month')
const colors = ['#8487e2', '#5f64d9', '#656ae6']

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

const { startDay, endDay } = getWeekDays()

function getWeekDays() {
  const today = new Date(value.value)
  let startOfWeek, endOfWeek

  if (view_mode.value === 'week') {
    const dayOfWeek = today.getDay()
    startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek)
    endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
  } else {
    startOfWeek = new Date(today.getFullYear(), today.getMonth(), 1)
    endOfWeek = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  }

  return {
    startDay: startOfWeek.toISOString().split('T')[0],
    endDay: endOfWeek.toISOString().split('T')[0]
  }
}

const groupScheduleStore = usegroupScheduleStore()

function deleteEvent(index) {
  const data = {
    scheduleId: index
  }
  client.value.send(`/pub/schedule/delete/${headers.groupCode}`, {}, JSON.stringify(data))
}

function handleWebSocketMessage(message) {
  const data = JSON.parse(message.body).data
  if (data.action === 'CREATE') {
    events.value.push({
      id: data.id,
      title: data.title,
      start: new Date(new Date(data.scheduleDate).setHours(data.startTime)),
      end: new Date(new Date(data.scheduleDate).setHours(data.endTime)),
      color: colors[rnd(0, colors.length - 1)],
      timed: true
    })
  } else if (data.action === 'DELETE') {
    events.value = events.value.filter((event) => event.id !== data.id)
  }
}

async function fetchData() {
  client.value.connect(headers, () => {
    client.value.subscribe(`/sub/schedule/${headers.groupCode}`, handleWebSocketMessage)
  })

  // 그룹 스케줄 전부 가져온다
  await groupScheduleStore.getAllGroupSchedule(route.params.groupCode)

  const schedules = await scheduleStore().getGroupScheduleOfWeek(
    route.params.groupCode,
    startDay,
    endDay
  )

  schedules.data.data.forEach((schedule) => {
    events.value.push({
      id: schedule.id,
      title: schedule.title,
      start: new Date(new Date(schedule.scheduleDate).setHours(schedule.startTime)),
      end: new Date(new Date(schedule.scheduleDate).setHours(schedule.endTime)),
      color: colors[rnd(0, colors.length - 1)],
      timed: true
    })
  })
}
</script>

<style lang="scss" scoped></style>
