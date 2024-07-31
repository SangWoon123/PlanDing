<template>
  <v-date-picker
    show-adjacent-months
    hide-header
    bg-color="#F6F6F8"
    :month-format="getMonth"
    class="date-picker"
    locale="ko-KR"
  >
  </v-date-picker>
</template>

<script setup>
const getMonth = (date) => {
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ]
  return months[date.getMonth()]
}
</script>

<style lang="scss" scoped>
.date-picker {
  transform: scale(0.9);
  border-radius: 8px;
}
</style>
