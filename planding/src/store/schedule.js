import { defineStore } from 'pinia'
import { authInstance } from '@/service/authAxios'
import { getPersonalScheduleInfo } from '@/service/scheduleController'

export const scheduleStore = defineStore('schedule', {
  state: () => ({
    title: '',
    content: '',
    scheduleDate: '',
    startTime: '',
    endTime: '',
    schedules: [],
    events:[]
  }),
  actions: {
    async createPersonalSchedule(postInfo) {
      try {
        const response = await authInstance('/api/v1/schedule').post('', postInfo)
        this.schedules.push(response.data.data)
        return response.data.data
      } catch (error) {
        console.error('Error creating schedule:', error)
      }
    },

    async getPersonalScheduleOfWeek(startOfWeek, endOfWeek) {
      try {
        const response = await authInstance(
          `/api/v1/schedule/week/${startOfWeek}/${endOfWeek}`
        ).get()
        this.schedules = response.data.data
      } catch (error) {
        console.error('주간개인스케줄 가져오는중 문제 발생:', error)
      }
    },
    async deletePersonalSchedule(scheduleId) {
      try {
        await authInstance(`/api/v1/schedule/${scheduleId}`).delete()
        this.schedules = this.schedules.filter((schedule) => schedule.id !== scheduleId)
      } catch (error) {
        console.error('주간개인스케줄 가져오는중 문제 발생:', error)
      }
    },
    async getPersonalScheduleInfo(scheduleId) {
      const response = await getPersonalScheduleInfo(scheduleId)
      console.log(response)
    },
    async getGroupScheduleOfWeek(groupCode, startOfWeek, endOfWeek) {
      try {
        return await authInstance(
          `/api/v1/group-rooms/week/${groupCode}/${startOfWeek}/${endOfWeek}`
        ).get()
      } catch (error) {
        console.error('주간그룹스케줄 가져오는중 문제 발생:', error)
      }
    }
  }
})
