import { defineStore } from 'pinia'
import { authInstance } from '@/api/authAxios'

export const scheduleStore = defineStore('schedule', {
  state: () => ({
    title: '',
    content: '',
    scheduleDate: '',
    startTime: '',
    endTime: ''
  }),
  actions: {
    async createPost(postInfo) {
      try {
        const response = await authInstance('/api/v1/schedule').post('', postInfo)
        console.log(response.data)
      } catch (error) {
        console.error('Error creating schedule:', error)
      }
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
