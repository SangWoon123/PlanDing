import { defineStore } from 'pinia'
import { authInstance } from '@/api/authAxios'

export const groupsStore = defineStore('group', {
  state: () => ({
    groups: []
  }),
  actions: {
    async getGroups() {
      const response = await authInstance('/api/v1/group').get()
      this.groups = response.data.data
    }
  }
})
