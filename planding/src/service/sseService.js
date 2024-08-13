import { useAuthStore } from '@/store/store'
import { EventSourcePolyfill } from 'event-source-polyfill'

const VITE_APP_SERVER_URI = import.meta.env.VITE_APP_SERVER_URI
const EventSource = EventSourcePolyfill

export const sseConnect = () => {
  const accessToken = useAuthStore().accessToken
  const connect = new EventSource(`${VITE_APP_SERVER_URI}/api/v1/notification/connect`, {
    headers: {
      'Content-Type': 'text/event-stream',
      Authorization: `Bearer ${accessToken}`
    },
    heartbeatTimeout: 300000,
    withCredentials: true
  })
  return connect
}

export const message = (connect) => {
  connect.addEventListener('data', function (event) {
    console.log('새로운 이벤트: ', event)
  })
}
