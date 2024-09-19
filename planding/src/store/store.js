import { defineStore } from 'pinia'
import axios from 'axios'
import { authInstance } from '@/service/authAxios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    userName: '',
    userCode: '',
    profileImage: ''
  }),
  actions: {
    saveAccessToken(token) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    saverefreshToken(token) {
      this.refreshToken = token
      localStorage.setItem('refreshToken', token)
      // axios.defaults.headers.common['refreshToken'] = `Bearer ${token}`
    },
    clearAuth() {
      this.accessToken = ''
      this.refreshToken = ''
      this.userName = ''
      this.userCode = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      delete axios.defaults.headers.common['Authorization']
      // router.push('/')
    },
    async getUserInfo() {
      const response = await authInstance('/api/v1/profile').get()
      this.userCode = response.data.data.userCode
      this.userName = response.data.data.username
      this.profileImage = response.data.data.profileImage
    }
  }
})
