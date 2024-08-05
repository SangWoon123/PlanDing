<template>
  <v-sheet>
    <v-calendar
      :weekdays="weekday"
      ref="calendar"
      class="calendar"
      v-model="value"
      :events="events"
      :view-mode="view_mode"
    >
      <template v-slot:day="day">
        <div class="tw-h-full" @click="openModalDay(day)" />
      </template>

      <template v-slot:header="{ title }">
        <v-toolbar class="header" flat>
          <div>
            <v-btn color="#7F83EA" @click="prev">
              <figure>
                <img src="../assets/left.png" alt="Previous arrow" />
              </figure>
            </v-btn>
            <v-btn class="today" flat :text="title" icon @click="toToday" />
            <v-btn color="#7F83EA" icon @click="next">
              <figure>
                <img src="../assets/right.png" alt="Previous arrow" />
              </figure>
            </v-btn>
          </div>
          <v-spacer></v-spacer>

          <!-- 보기 모드 토글 버튼 -->
          <v-btn-toggle v-model="view_mode" mandatory>
            <v-btn color="#8487e2" value="month">월간 보기</v-btn>
            <v-btn color="#8487e2" value="week">주간 보기</v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <template v-slot:event="{ event }">
        <div class="event-card">
          <button @click="deleteEvent(event.id)" class="delete-btn" />
          <span style="font-weight: 700" class="event-time">{{ formatedDate(event.start) }}</span>
          <span class="event-title">{{ event.title }}</span>
        </div>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/store'
import { scheduleStore } from '@/store/schedule'
import { Stomp } from '@stomp/stompjs'
import { useDateStore } from '@/store/date'

const dateStore = useDateStore()

const calendar = ref(null)

// 달력선택시 해당 주로 변경
watch(
  () => dateStore.selectedDate,
  (newDate) => {
    value.value = [newDate]
  }
)

//socket
const VITE_APP_WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL
const userStore = useAuthStore()
const route = useRoute()
const headers = {
  Authorization: `Bearer ${userStore.accessToken}`,
  groupCode: route.params.groupCode
}
const client = ref(null)

const weekday = ref([0, 1, 2, 3, 4, 5, 6])
const colors = ['#8487e2', '#5f64d9', '#656ae6']
const view_mode = ref('month')
const value = ref(new Date())
const events = ref([])
const { startDay, endDay } = getWeekDays()

//v-calendar event
function next() {
  if (view_mode.value === 'month') {
    const newDate = new Date(value.value)
    newDate.setMonth(newDate.getMonth() + 1)
    value.value = newDate
  } else if (view_mode.value === 'week') {
    const newDate = new Date(value.value)
    newDate.setDate(newDate.getDate() + 7)
    value.value = newDate
  }
}

function prev() {
  if (view_mode.value === 'month') {
    const newDate = new Date(value.value)
    newDate.setMonth(newDate.getMonth() - 1)
    value.value = newDate
  } else if (view_mode.value === 'week') {
    const newDate = new Date(value.value)
    newDate.setDate(newDate.getDate() - 7)
    value.value = newDate
  }
}

function toToday() {
  value.value = new Date()
}

function formatedDate(date) {
  const formatedDate = date.getHours() + (date.getHours() >= 12 ? 'PM' : 'AM')
  return formatedDate
}

function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

// API
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

// websocket handler
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
    events.value = events.value.filter((event) => data.id !== event.id)
  }
}

async function fetchData() {
  client.value = Stomp.client(`${VITE_APP_WEBSOCKET_URL}/api/v1/ws`)
  client.value.connect(headers, () => {
    client.value.subscribe(`/sub/schedule/${headers.groupCode}`, handleWebSocketMessage)
  })

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

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.calendar {
  background-color: #fdfdfd;
}
.event-card {
  white-space: normal;
  line-height: 1.2;
  padding: 4px 8px;
  background-color: #656ae6;
  border-radius: 8px;
  color: white;
  position: relative;
  font-size: 12px;
  margin-bottom: 1px;
}
.delete-btn {
  background-color: #f75e56;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 4px;
  border: none;
  cursor: pointer;
}

.event-time {
  display: block;
  margin-bottom: 4px;
}

.event-title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.bg-primary) {
  background-color: #656ae6 !important;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 2px;
  .today {
    margin: 0 10px;
  }
}
</style>
