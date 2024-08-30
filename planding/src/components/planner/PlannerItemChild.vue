<template>
  <div class="container">
    <div class="title">{{ planner.title }}</div>
    <div class="second">
      <div class="manager">
        <!-- <div class="avatar"></div> -->
        <img :src="planner.manager.profileImage" class="avatar" />
        <p>{{ planner.manager.username }}</p>
      </div>
      <div class="user">
        <div v-for="(user, index) in displayedUsers" :key="index">
          <img :src="user.profileImage" class="avatar" />
        </div>
        <span v-if="extraUsersCount > 0">+{{ extraUsersCount }}</span>
      </div>
      <div class="state">
        <StateButton
          :state="planner.status"
          :color="stateConfig[planner.status].color"
          width="20"
          height="20"
          :label="stateConfig[planner.status].label"
          style="border: none"
        />
      </div>
      <div class="end">
        <span>{{
          `${new Date(planner.deadline).getMonth() + 1}월${new Date(planner.deadline).getDate()}일${new Date(planner.deadline).getHours()}시 `
        }}</span>
        <span>까지</span>
      </div>
    </div>
    <div class="more">
      <button class="button">
        <v-icon>mdi-dots-horizontal</v-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StateButton from './modal/StateButton.vue'
const props = defineProps({
  planner: Object
})
const stateConfig = {
  IN_PROGRESS: { label: '진행중', color: '#f3ee6e' },
  DONE: { label: '완료', color: '#87df79' },
  TODO: { label: '진행대기', color: '#e15a5a' }
}
const displayedUsers = computed(() => props.planner.users.slice(0, 3))
const extraUsersCount = computed(() => props.planner.users.length - 3)
</script>

<style lang="scss" scoped>
.container {
  background-color: #f6f6f8;
  width: 904px;
  height: 41px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  border-top: 1px solid #e2e3e8;
  border-bottom: 1px solid #e2e3e8;
}
.title {
  margin-left: 32px;
  width: 472px;
  display: flex;
  justify-content: flex-start;
}
.second {
  width: 352px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  .manager {
    gap: 6px;
    width: 78px;
    display: flex;
  }
  .avatar {
    width: 16px;
    height: 16px;
    background-color: rebeccapurple;
    border-radius: 50%;
  }
  .user {
    width: 71px;
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  .state {
    width: 80px;
  }
  .end {
    width: 111px;
  }
  .more {
    .button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
    }
  }
}
</style>
