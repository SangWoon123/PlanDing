<template>
  <div class="container">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          width="100%"
          height="90%"
          elevation="0"
          v-bind="props"
          :color="isHovering ? '#f6f6f6' : undefined"
          class="pa-5 content"
        >
          <v-row>
            <v-col cols="2" class="ml-2">
              <div
                style="
                  width: 40px;
                  height: 40px;
                  background-color: palevioletred;
                  border-radius: 50%;
                "
              ></div>
            </v-col>
            <v-col>
              <div class="d-flex flex-column">
                <div style="display: flex; justify-content: space-between">
                  <span>
                    <span style="font-size: 14px">You have been invited to join the group </span>
                    <span class="font-weight">{{ data.groupName }} !</span>
                  </span>
                  <DeleteButton
                    class="pa-1 ma-2"
                    style="background-color: #c565e6"
                    @click="alarmStore.deleteSchedule(data.id)"
                    flat
                    v-if="isHovering"
                  />
                </div>
                <span style="font-size: 12px; color: gray; margin-top: 4px">{{
                  timeAgo(data.createdAt)
                }}</span>

                <div class="d-flex">
                  <v-btn flat @click="declineInvite">Decline</v-btn>
                  <v-btn flat @click="acceptInvite" color="#8487e2">Accept</v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script setup>
import DeleteButton from '../ui/DeleteButton.vue'
import { useAlarmStore } from '@/store/alarm'
import { timeAgo } from '@/service/utils/date'
import { userGroupsStore } from '@/store/group'

const alarmStore = useAlarmStore()
const groupStore = userGroupsStore()
async function acceptInvite() {
  alarmStore.invites = alarmStore.invites.filter(
    (invitation) => invitation.inviteCode !== props.data.inviteCode
  )
  await alarmStore.acceptInvite(props.data.groupCode, props.data.inviteCode)

  //TODO: 초대수락이후 그룹 갱신 API 개선
  await groupStore.getGroups()
}

async function declineInvite() {
  alarmStore.invites = alarmStore.invites.filter(
    (invitation) =>
      invitation.inviteCode !== props.data.inviteCode &&
      invitation.createdAt !== props.data.createdAt
  )
  await alarmStore.declineInvite(props.data.inviteCode)
}

const props = defineProps({
  data: Object
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
.content {
  border-radius: 20px;
}
.font-weight {
  font-weight: 900;
}

.v-btn {
  margin-right: 8px;
}
</style>
