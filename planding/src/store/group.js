import { defineStore } from 'pinia'
import { authInstance } from '@/api/authAxios'

export const userGroupsStore = defineStore('group', {
  state: () => ({
    groups: [],
    selectGroup: {}
  }),
  actions: {
    async getGroups() {
      const response = await authInstance('/api/v1/group').get()
      this.groups = response.data.data
    },
    async getGroupInfo(code) {
      const response = await authInstance(`/api/v1/group/${code}`).get()
      this.selectGroup = response.data.data
    },
    getGroup() {
      return this.selectGroup
    }
  }
})
