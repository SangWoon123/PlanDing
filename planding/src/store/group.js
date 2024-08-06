import { defineStore } from 'pinia'
import { authInstance } from '@/service/authAxios'
import { deleteGroup } from '@/service/groupController'

export const userGroupsStore = defineStore('group', {
  state: () => ({
    groups: [],
    selectGroup: {}
  }),
  actions: {
    // 그룹 목록 가져오기
    async getGroups() {
      const response = await authInstance('/api/v1/group').get()
      this.groups = response.data.data
    },
    // 특정 그룹정보 가져오기
    async getGroupInfo(code) {
      const response = await authInstance(`/api/v1/group/${code}`).get()
      this.selectGroup = response.data.data
    },
    getGroup() {
      return this.selectGroup
    },
    // 그룹 삭제
    async handlerDeleteGroup(groupCode) {
      try {
        await deleteGroup(groupCode)
        this.groups = this.groups.filter((group) => group.code !== groupCode)
      } catch (error) {
        console.error('그룹 삭제 실패: ', error)
      }
    }
  }
})
