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
                style="width: 40px; height: 40px; background-color: #e2e1df; border-radius: 50%"
              ></div>
            </v-col>
            <v-col>
              <div class="d-flex flex-column">
                <div style="display: flex; justify-content: space-between">
                  <span>
                    <span v-if="data.groupName"> {{ data.groupName }}의 </span>
                    <span style="font-size: 14px">Upcoming Schedule: </span>
                    <span class="font-weight">{{ data.message }}</span> Event
                  </span>
                  <DeleteButton
                    class="pa-1 ma-2"
                    style="background-color: #8487e2"
                    @click="alarmStore.deleteSchedule(data.id)"
                    flat
                    v-if="isHovering"
                  />
                </div>
                <span style="font-size: 12px; color: gray; margin-top: 4px">{{
                  timeAgo(data.createdAt)
                }}</span>
                <v-btn
                  v-if="isHovering"
                  color="#8487e2"
                  style="font-size: 14px; margin-top: 30px"
                  rounded="lg"
                  flat
                  >확인</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script setup>
import { useAlarmStore } from '@/store/alarm'
import DeleteButton from '../ui/DeleteButton.vue'
import { timeAgo } from '@/service/utils/date'

const alarmStore = useAlarmStore()
defineProps({
  data: Object
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  // border: 1px solid lightgrey;
}
.content {
  // border: 1px solid plum;
  border-radius: 20px;
}
.font-weight {
  font-weight: 900;
}

/* Add some margin between the buttons */
.v-btn {
  margin-right: 8px;
}
</style>
