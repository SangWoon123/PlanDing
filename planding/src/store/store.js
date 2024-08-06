import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { authInstance } from '@/service/authAxios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    userName: '',
    userCode: '',
    profileImage: ''
  }),
  actions: {
    saveToken(token) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    clearAuth() {
      this.accessToken = ''
      this.userName = ''
      this.userCode = ''
      localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common['Authorization']
      router.push('/')
    },
    async getUserInfo() {
      const response = await authInstance('/api/v1/profile').get()
      this.userCode = response.data.data.userCode
      this.userName = response.data.data.username
      this.profileImage = response.data.data.profileImage
    }
  }
})
