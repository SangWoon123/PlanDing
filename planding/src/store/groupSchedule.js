import { defineStore } from 'pinia'
import {
  getGroupScheduleInfo,
  getAllGroupSchedule,
  getWeekScheduleByGroup
} from '@/service/scheduleController'

export const usegroupScheduleStore = defineStore('groupSchedule', {
  state: () => ({
    groupSchedules: [],
    weekSchedules: []
  }),
  actions: {
    async groupScheduleInfo(groupCode, scheduleId) {
      const response = await getGroupScheduleInfo(groupCode, scheduleId)
      this.groupSchedules.push(response)
    },
    async getAllGroupSchedule(groupCode) {
      const response = await getAllGroupSchedule(groupCode)
      this.groupSchedules = response
    },
    // async getWeekScheduleByGroup(groupCode, startDate, endDate) {
    //   const response = await getWeekScheduleByGroup(groupCode, startDate, endDate)
    //   console.log('샂해',response)
    //   this.weekSchedules = response
    // }
  }
})
