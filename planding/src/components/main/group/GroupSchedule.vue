<template>
  <CustomCalendar :group="true" :fetchData="fetchData" :events="events">
    <template #group="{ event }">
      <EventCard :event="event" @deleteEvent="deleteEvent" />
    </template>
  </CustomCalendar>
</template>

<script setup>
import CustomCalendar from '@/components/Calendar/CustomCalendar.vue'
import EventCard from '@/components/Calendar/group/GroupEventCard.vue'
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/store'
import { scheduleStore } from '@/store/schedule'
import { usegroupScheduleStore } from '@/store/groupSchedule'
import { useDateStore } from '@/store/date'

//socket
const route = useRoute()
const dateStore = useDateStore()
const client = inject('websocketClient')
const userStore = useAuthStore()
const groupCode = ref(route.params.groupCode)
const headers = {
  Authorization: `Bearer ${userStore.accessToken}`,
  groupCode: groupCode.value
}

const events = ref([])
const weekDate = ref({})
const view_mode = ref('month')
const colors = ['#8487e2', '#5f64d9', '#656ae6']

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

const { startDay, endDay } = dateStore.getWeekDays(view_mode, new Date())

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
      id: data.scheduleCommonResponse.id,
      title: data.scheduleCommonResponse.title,
      start: new Date(new Date(data.scheduleCommonResponse.scheduleDate).setHours(data.scheduleCommonResponse.startTime)),
      end: new Date(new Date(data.scheduleCommonResponse.scheduleDate).setHours(data.scheduleCommonResponse.endTime)),
      color: colors[rnd(0, colors.length - 1)],
      timed: true
    })
  } else if (data.action === 'DELETE') {
    events.value = events.value.filter((event) => event.id !== data.scheduleCommonResponse.id)
  }
}

function addEvent(schedule) {
  const eventExists = Array.from(events.value).some((event) => event.id === schedule.id)
  if (!eventExists) {
    events.value.push({
      id: schedule.scheduleCommonResponse.id,
      title: schedule.scheduleCommonResponse.title,
      start: new Date(new Date(schedule.scheduleCommonResponse.scheduleDate).setHours(schedule.scheduleCommonResponse.startTime)),
      end: new Date(new Date(schedule.scheduleCommonResponse.scheduleDate).setHours(schedule.scheduleCommonResponse.endTime)),
      color: colors[rnd(0, colors.length - 1)],
      timed: true
    })
  }
}

async function fetchData() {
  client.value.connect(headers, () => {
    client.value.subscribe(`/sub/schedule/${headers.groupCode}`, handleWebSocketMessage)
  })

  // 그룹 스케줄 전부 가져온다
  await groupScheduleStore.getAllGroupSchedule(groupCode.value)
  await updateEvents(startDay, endDay)
}
async function updateEvents(startDate, endDate) {
  const schedules = await scheduleStore().getGroupScheduleOfWeek(
    groupCode.value,
    startDate,
    endDate
  )
  schedules.data.data.forEach(addEvent)
}

watch(
  () => dateStore.selectedDate,
  async (newVal) => {
    weekDate.value = useDateStore().caculateWeekRange(newVal)
    await updateEvents(weekDate.value.startDate, weekDate.value.endDate)
  }
)
</script>

<style lang="scss" scoped></style>
