<template>
  <div>
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-h5 text-medium-emphasis ps-2">Invite to Group</div>

      <v-btn icon="mdi-close" variant="text" @click="isActive.value = false"></v-btn>
    </v-card-title>

    <v-divider class="mb-4"></v-divider>

    <v-card-text>
      <div class="text-medium-emphasis mb-4">
        Invite collaborators to your network and grow your connections.
      </div>

      <div class="mb-2">Usercode (optional)</div>

      <div>
        <v-text-field variant="outlined" v-model="inputUserCode"> </v-text-field>
        <v-btn color="#656ae6" @click="createInvite">invite</v-btn>
      </div>

      <div class="text-overline mb-2">💎 PREMIUM</div>

      <div class="text-medium-emphasis mb-1">
        Share with unlimited people and get more insights about your network. Try Premium Free for
        30 days.
      </div>

      <v-btn
        class="text-none font-weight-bold ms-n4"
        color="primary"
        text="Retry Premium Free"
        variant="text"
      ></v-btn>
    </v-card-text>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAlarmStore } from '@/store/alarm';

const alarmStore=useAlarmStore()
const inputUserCode = ref('')
const route = useRoute()

async function createInvite() {
  const groupCode = route.params.groupCode
  const userCode = inputUserCode.value

  alarmStore.postInvitation(groupCode,userCode)
}
</script>

<style lang="scss" scoped></style>
