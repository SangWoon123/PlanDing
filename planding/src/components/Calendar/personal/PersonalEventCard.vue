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
      </v-card>
    </template>

    <!-- 카드 디자인 -->
    <EventCardDetail :event="event" @deleteEvent="deleteEvent" @closeModal="closeModal" />
    <!-- 카드 디자인 -->
  </v-menu>
</template>

<script setup>
import EventCardDetail from '@/components/Calendar/EventCardDetail.vue'
import { scheduleStore } from '@/store/schedule'
import { defineEmits, ref } from 'vue'

const schedulesStore = scheduleStore()
const isVisible = ref(true)
const isMenuActive = ref(false)

defineProps({
  event: Object
})

const emit = defineEmits(['deleteEvent'])

async function handleCardClick(event) {
  if (isMenuActive.value) {
    await schedulesStore.getPersonalScheduleInfo(event.id)
  }
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
