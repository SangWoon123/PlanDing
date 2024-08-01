import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

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
      const VITE_APP_SERVER_URI = import.meta.env.VITE_APP_SERVER_URI
      const response = await axios.get(VITE_APP_SERVER_URI + '/api/v1/profile', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })

      this.userCode = response.data.data.userCode
      this.userName = response.data.data.username
    }
  }
})
