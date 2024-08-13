<template>
  <section id="container">
    <LeftComponent :favoriteGroup="groupStore.favoriteGroups" />

    <slot></slot>

    <div class="right">
      <HeaderSection :invitations="alarmStore.invites" :schedules="alarmStore.scheduleAlarm" />
      <DateSelect />

      <ScheduleCreate :create="create" />
    </div>
  </section>
</template>

<script setup>
import DateSelect from './right/DateSelect.vue'
import HeaderSection from './right/HeaderSection.vue'
import ScheduleCreate from '../ListPage/Information/ScheduleCreate.vue'
import LeftComponent from './left/LeftComponent.vue'
import { useAlarmStore } from '@/store/alarm'
import { userGroupsStore } from '@/store/group'
defineProps({
  create: Function
})
const groupStore = userGroupsStore()
const alarmStore = useAlarmStore()
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5fd;

  .left {
    background-color: #ffffff;
    width: 88px;
    height: 781px;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  .right {
    background-color: #ffffff;
    width: 320px;
    height: 860px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
