<template>
  <v-menu v-model="isMenuActive" location="end" :close-on-content-click="false">
    <template v-slot:activator="{ isHovering, props }">
      <v-card
        class="event-card"
        :color="isHovering ? 'primary' : undefined"
        v-bind="props"
        @click="handleCardClick(event)"
      >
        <span style="font-weight: 700" class="event-time">
          {{ `${formatedDate(event.start)} - ${formatedDate(event.end)}` }}
        </span>
        <span class="event-title">{{ event.title }}</span>
        <Avatar :size="computedAvatarSize(event.id)" />
      </v-card>
    </template>

    <!-- 카드 디자인 -->
    <EventCardDetail
      :event="event"
      @deleteEvent="deleteEvent"
      @closeModal="closeModal"
    >
      <template #attendance>
        <ScheduleAttendance :groupId="event.id" />
      </template>
    </EventCardDetail>
    <!-- 카드 디자인 -->
  </v-menu>
</template>

<script setup>
import Avatar from '@/components/ui/Avatar.vue'
import ScheduleAttendance from '../../Group/ScheduleAttendance.vue'
import EventCardDetail from '../EventCardDetail.vue'
import { defineEmits, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usegroupScheduleStore } from '@/store/groupSchedule'

const groupScheduleStore = usegroupScheduleStore()
const isVisible = ref(true)
const isMenuActive = ref(false)

defineProps({
  event: Object
})

const emit = defineEmits(['deleteEvent'])
const groupCode = useRoute().params.groupCode

async function handleCardClick(event) {
  if (isMenuActive.value) {
    await groupScheduleStore.groupScheduleInfo(groupCode, event.id)
  }
}

const computedAvatarSize = (scheduleId) => {
  const schedule = groupScheduleStore.groupSchedules.find((s) => s.id === scheduleId)
  if (!schedule) return 0
  return schedule.userScheduleAttendances.filter((user) => user.status === 'POSSIBLE').length
}

function formatedDate(date) {
  return date.getHours() + (date.getHours() >= 12 ? 'PM' : 'AM')
}

function deleteEvent(id) {
  emit('deleteEvent', id)
}
function closeModal() {
  isVisible.value = false
}
</script>

<style lang="scss" scoped>
.event-card {
  padding: 4px 8px;
  height: 100px;
  border: 1px solid #656ae6;
  border-radius: 8px;
  color: #656ae6;
  position: relative;
  font-size: 12px;
  margin-bottom: 4px;
}
.event-time {
  display: block;
  margin-bottom: 4px;
}
.event-title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
