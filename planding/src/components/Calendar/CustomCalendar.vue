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
      <template v-slot:header="{ title }">
        <CalendarNavigation
          :group="group"
          :title="title"
          :view_mode="view_mode"
          @prev="prev"
          @next="next"
          @toToday="toToday"
          @updateViewMode="handleViewMode"
        />
      </template>

      <template v-slot:event="{ event }">
        <slot name="group" :event="event"></slot>
        <slot name="personal" :event="event"></slot>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script setup>
import { useDateStore } from '@/store/date'
import CalendarNavigation from './CalendarNavigation.vue';
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  group: {
    type: Boolean
  },
  events: {
    type: Array
  },
  fetchData: {
    type: Function,
    required: true
  },
  deleteEvent: {
    type: Function,
    required: true
  }
})

const dateStore = useDateStore()

// 달력선택시 해당 주로 변경
watch(
  () => dateStore.selectedDate,
  (newDate) => {
    value.value = [newDate]
  }
)
const calendar = ref(null)
const weekday = ref([0, 1, 2, 3, 4, 5, 6])
const value = ref([new Date()])

function handleViewMode(event) {
  view_mode.value = event
}
const view_mode = ref('month')

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

onMounted(async () => {
  // 스케줄 -> 이벤트 카드
  await props.fetchData()
})
</script>

<style scoped lang="scss">
.calendar {
  background-color: #fdfdfd;
}
:deep(.bg-primary) {
  background-color: #656ae6 !important;
}
</style>
