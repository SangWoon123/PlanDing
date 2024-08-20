import { defineStore } from 'pinia'
import { authInstance } from '@/service/authAxios'
import { deleteGroup, leaveGroup } from '@/service/groupController'
import { getFavoriteList } from '@/service/favoriteController'
import { postFavorite, deleteFavorite } from '@/service/favoriteController'

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
    //그룹나가기
    async leaveGroup(groupCode) {
      try {
        await leaveGroup(groupCode)
        this.groups = this.groups.filter((group) => group.code !== groupCode)
      } catch (error) {
        console.error('그룹 떠나기 실패: ', error)
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
    async toggleFavorite(groupCode) {
      const bookmarkIndex = this.favoriteGroups.findIndex((group) => group.code === groupCode)
      try {
        if (bookmarkIndex !== -1) {
          await deleteFavorite(groupCode)
          this.favoriteGroups = this.favoriteGroups.filter((group) => group.code !== groupCode)
        } else {
          await postFavorite(groupCode)
          const group = this.groups.find((group) => group.code === groupCode)
          if (group) {
            this.favoriteGroups.push(group)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    getGroup() {
      return this.selectGroup
    }
  }
})
