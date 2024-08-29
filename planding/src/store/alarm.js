import { defineStore } from 'pinia'
import {
  getScheduleAlarm,
  deleteAlarm,
  getInvitation,
  postInvitation,
  accpetInvitation,
  declineInvitation
} from '@/service/inviteController'

export const useAlarmStore = defineStore('alarm', {
  state: () => ({
    invites: [],
    scheduleAlarm: []
  }),
  actions: {
    async postInvitation(groupCode, userCode) {
      await postInvitation(groupCode, userCode)
    },
    async acceptInvite(groupCode, inviteCode) {
      await accpetInvitation(groupCode, inviteCode)
    },
    async declineInvite(inviteCode) {
      await declineInvitation(inviteCode)
    },
    async getInvites() {
      const response = await getInvitation()
      this.invites = response
    },
    async getSchedule() {
      const response = await getScheduleAlarm()
      this.scheduleAlarm = response
    },
    async deleteSchedule(scheduleId) {
      await deleteAlarm(scheduleId)
      this.scheduleAlarm = this.scheduleAlarm.filter((schedule) => schedule.id !== scheduleId)
    }
  }
})
