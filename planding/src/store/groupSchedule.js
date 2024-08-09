import { defineStore } from 'pinia'
import { authInstance } from '@/service/authAxios'

export const usegroupScheduleStore = defineStore('groupSchedule', {
  state: () => ({
    groupSchedules: []
  }),
  actions: {}
})
