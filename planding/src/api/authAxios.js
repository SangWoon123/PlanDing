import { useAuthStore } from '@/store/store'
import axios from 'axios'

const VITE_APP_SERVER_URI = import.meta.env.VITE_APP_SERVER_URI

export const authInstance = (url) => {
  const userInfo = useAuthStore()
  const instance = axios.create({
    baseURL: VITE_APP_SERVER_URI + url,
    timeout: 10000,
    headers: { Authorization: `Bearer ${userInfo.accessToken}` }
  })

  return instance
}
