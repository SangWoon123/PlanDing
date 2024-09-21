<template>
  <section id="container">
    <RightComponent :invitations="alarmStore.invites" :schedules="alarmStore.scheduleAlarm">
      <template #footer>
        <ScheduleCreate :create="create" :type="type" />
      </template>
    </RightComponent>

    <slot></slot>
    <LeftComponent :favoriteGroup="groupStore.favoriteGroups" />
  </section>
</template>

<script setup>
import RightComponent from './right/RightComponent.vue'
import ScheduleCreate from './right/ScheduleCreate.vue'
import LeftComponent from './left/LeftComponent.vue'
import { useAlarmStore } from '@/store/alarm'
import { userGroupsStore } from '@/store/group'
defineProps({
  create: Function,
  type: Boolean
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
