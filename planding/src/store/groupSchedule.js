import { defineStore } from 'pinia'
import { getGroupScheduleInfo } from '@/service/scheduleController'

export const usegroupScheduleStore = defineStore('groupSchedule', {
  state: () => ({
    groupSchedules: []
  }),
  actions: {
    async groupScheduleInfo(groupCode, scheduleId) {
      const response = await getGroupScheduleInfo(groupCode, scheduleId)
      this.groupSchedules.push(response)
    }
  }
})
