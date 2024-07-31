<template>
  <div class="plan-content" :style="{ height: height }">
    <GroupRoom :img="img" :title="title" :createdAt="createdAt" />
  </div>
</template>

<script setup>
import GroupRoom from './GroupRoom.vue'

const title = '박철현님의 일정'
const createdAt = '1시간전'

const props = defineProps({
  desc: String,
  height: String
})
</script>

<style lang="scss" scoped>
.plan-content {
  background-color: #ffffff;
  padding: 12px;
}
</style>
