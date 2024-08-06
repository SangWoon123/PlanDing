import { useAuthStore } from '@/store/store'
import axios from 'axios'

const VITE_APP_SERVER_URI = import.meta.env.VITE_APP_SERVER_URI
const VITE_APP_WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL

export const authInstance = (url) => {
  const userInfo = useAuthStore()
  const instance = axios.create({
    baseURL: VITE_APP_SERVER_URI + url,
    timeout: 10000,
    headers: { Authorization: `Bearer ${userInfo.accessToken}`, 'Content-Type': 'application/json' }
  })

  return instance
}

export const authInstanceWebsocket = (url) => {
  const userInfo = useAuthStore()
  const instance = axios.create({
    baseURL: VITE_APP_WEBSOCKET_URL + url,
    timeout: 10000,
    headers: { Authorization: `Bearer ${userInfo.accessToken}`, 'Content-Type': 'application/json' }
  })

  return instance
}
