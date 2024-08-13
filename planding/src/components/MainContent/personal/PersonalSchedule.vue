<template>
  <CustomCalendar :fetchData="fetchData" :events="schedulesStore.events" :deleteEvent="deleteEvent">
    <template #personal="{ event }">
      <PersonalEventCard :event="event" @deleteEvent="deleteEvent" />
    </template>
  </CustomCalendar>
</template>

<script setup>
import PersonalEventCard from '@/components/Calendar/personal/PersonalEventCard.vue'
import CustomCalendar from '@/components/Calendar/CustomCalendar.vue'
import { scheduleStore } from '@/store/schedule'
import { ref } from 'vue'

const value = ref([new Date()])
const events = ref([])
const view_mode = ref('month')
const { startDay, endDay } = getWeekDays()
const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

const schedulesStore = scheduleStore()

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

async function deleteEvent(index) {
  await schedulesStore.deletePersonalSchedule(index)
  schedulesStore.events = schedulesStore.events.filter((event) => event.id !== index)
}

async function fetchData() {
  await schedulesStore.getPersonalScheduleOfWeek(startDay, endDay)
  schedulesStore.schedules.forEach((schedule) => {
    events.value.push({
      id: schedule.id,
      title: schedule.title,
      start: new Date(new Date(schedule.scheduleDate).setHours(schedule.startTime)),
      end: new Date(new Date(schedule.scheduleDate).setHours(schedule.endTime)),
      color: colors[rnd(0, colors.length - 1)],
      timed: true
    })
    schedulesStore.events=events.value
  })
}
</script>

<style lang="scss" scoped></style>
