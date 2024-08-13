<template>
  <v-date-picker
    v-model="date"
    show-adjacent-months
    hide-header
    bg-color="#F6F6F8"
    class="date-picker"
    color="#C6C8F2"
  >
  </v-date-picker>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDateStore } from '@/store/date'
const date = ref(new Date())
const dateStore = useDateStore()

watch(date, (newVal) => {
  dateStore.setDate(newVal)
})
</script>

<style lang="scss" scoped>
.date-picker {
  transform: scale(0.9);
  border-radius: 8px;
}
:deep(.v-date-picker-controls__month) {
  color: #656ae6 !important;
  // 버튼
  :nth-child(1) {
    color: #5f64d9;
  }
}

:deep(.v-btn--icon) {
  border-radius: 4px !important;
  background-color: inherit;
}
:deep(.v-btn__content) {
  color: #585bb2;
}

:deep(.v-date-picker-controls .v-btn__content) {
  font-size: 20px !important;
}
:deep(.v-date-picker-month__weekday) {
  color: #BABBDD !important;
}
</style>
