import { defineStore } from 'pinia'
import { getGroupScheduleInfo, getAllGroupSchedule } from '@/service/scheduleController'

export const usegroupScheduleStore = defineStore('groupSchedule', {
  state: () => ({
    groupSchedules: []
  }),
  actions: {
    async groupScheduleInfo(groupCode, scheduleId) {
      const response = await getGroupScheduleInfo(groupCode, scheduleId)
      this.groupSchedules.push(response)
    },
    async getAllGroupSchedule(groupCode) {
      const response = await getAllGroupSchedule(groupCode)
      this.groupSchedules = response
    }
  }
})
