// src/store/dateStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDateStore = defineStore('date', () => {
  const selectedDate = ref(new Date())

  function setDate(date) {
    selectedDate.value = date
  }

  return { selectedDate, setDate }
})
