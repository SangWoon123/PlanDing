// src/store/websocketStore.js
import { defineStore } from 'pinia'
import { Stomp } from '@stomp/stompjs'

export const webSocketStore = defineStore('websocket', {
  state: () => ({
    client: null,
    testa: []
  }),
  actions: {
    initializeClient(url, headers) {
      this.client = Stomp.client(url)
      this.client.connect(headers, (frame) => {
        console.log('Connected:', frame)
      })
    },
    testPush(event) {
      this.testa = event
    }
  }
})
