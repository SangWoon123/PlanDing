import { defineStore } from 'pinia'
import { authInstance } from '@/service/authAxios'
import { deleteGroup } from '@/service/groupController'
import { getFavoriteList } from '@/service/favoriteController'

export const userGroupsStore = defineStore('group', {
  state: () => ({
    groups: [],
    selectGroup: {},
    favoriteGroups: []
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
    // 그룹 삭제
    async handlerDeleteGroup(groupCode) {
      try {
        await deleteGroup(groupCode)
        this.groups = this.groups.filter((group) => group.code !== groupCode)
      } catch (error) {
        console.error('그룹 삭제 실패: ', error)
      }
    },
    async handleFavorite(groupCode) {
      const groupIndex = this.groups.findIndex((group) => group.code === groupCode)
      if (groupIndex === -1) return
    },
    // 즐겨찾기 그룹
    async getFavoriteGroups() {
      const response = await getFavoriteList()
      this.favoriteGroups = response
    },
    getGroup() {
      return this.selectGroup
    }
  }
})
