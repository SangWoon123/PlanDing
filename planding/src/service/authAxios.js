import axios from 'axios'
import { setInterceptor } from './utils/interceptor'

const VITE_APP_SERVER_URI = import.meta.env.VITE_APP_SERVER_URI
const VITE_APP_WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL

export const authInstance = (url) => {
  const instance = axios.create({
    baseURL: VITE_APP_SERVER_URI + url,
    timeout: 10000,
    withCredentials:true
  })

  return setInterceptor(instance)
}

export const authInstanceWebsocket = (url) => {
  const instance = axios.create({
    baseURL: VITE_APP_WEBSOCKET_URL + url,
    timeout: 10000,
    withCredentials:true
  })

  return setInterceptor(instance)
}
