import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDateStore = defineStore('date', () => {
  const selectedDate = ref(new Date())
  const weekStart = ref(null)
  const weekEnd = ref(null)

  function setDate(date) {
    selectedDate.value = date
  }

  function caculateWeekRange(date) {
    const current = new Date(date)
    const dayOfWeek = current.getDay()

    const start = new Date(current)
    start.setDate(current.getDate() - dayOfWeek)

    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    weekStart.value = start.toISOString().split('T')[0]
    weekEnd.value = end.toISOString().split('T')[0]

    return { startDate: weekStart.value, endDate: weekEnd.value }
  }

  // calendar 전용
  function getWeekDays(viewMode, currentDate) {
    const today = new Date(currentDate)
    let startOfWeek, endOfWeek

    if (viewMode.value === 'week') {
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

  return { selectedDate, setDate, weekStart, weekEnd, caculateWeekRange, getWeekDays }
})
