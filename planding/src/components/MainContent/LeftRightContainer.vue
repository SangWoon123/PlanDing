<template>
  <section id="container">
    <RightComponent :invitations="alarmStore.invites" :schedules="alarmStore.scheduleAlarm">
      <template #footer>
        <ScheduleCreate :create="create" />
      </template>
    </RightComponent>

    <slot></slot>
    <LeftComponent :favoriteGroup="groupStore.favoriteGroups" />
  </section>
</template>

<script setup>
import RightComponent from './right/\bRightComponent.vue'
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
}
</style>
