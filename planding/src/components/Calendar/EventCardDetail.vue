<template>
  <v-card color="#fdfdfd" width="500px" height="700px" flat rounded="lg" class="pa-5">
    <div class="card-header">
      <v-btn flat density="compact" icon="mdi-pencil-outline" />
      <v-btn flat density="compact" @click="deleteAlert = true">
        <v-icon>mdi-trash-can-outline</v-icon>
        <DeleteAlert
          @closeModal="deleteAlert = false"
          v-model="deleteAlert"
          @confirmDelete="deleteEvent(event.id)"
          :subtitle="event.title"
        />
      </v-btn>
      <v-btn flat density="compact" icon="mdi-close" />
    </div>

    <div class="info-header">
      <p>{{ event.title }}</p>
      <span>
        {{
          `${formatedDate(event.start)} ${formatedTime(event.start)} ~ ${formatedTime(event.end)}`
        }}</span
      >
    </div>
    <v-divider class="mt-3" length="500px" thickness="2px"></v-divider>

    <slot name="attendance"> </slot>
  </v-card>
</template>

<script setup>
import DeleteAlert from '../ui/DeleteAlert.vue'
import { ref } from 'vue'

const deleteAlert = ref(false)
defineProps({
  event: Object,
  isVisible: Boolean
})
const emit = defineEmits(['deleteEvent', 'closeModal'])

function formatedDate(date) {
  const days = ['일', '월', '화', '수', '목', '금', '토']

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = days[date.getDay()]

  return `${year}.${month}.${day} (${dayOfWeek})`
}

function formatedTime(date) {
  return date.getHours() + (date.getHours() >= 12 ? 'PM' : 'AM')
}

function deleteEvent(id) {
  deleteAlert.value = false
  emit('deleteEvent', id)
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: end;
  gap: 10px;
}
.info-header {
  p {
    font-size: 22px;
    font-weight: 700;
  }
  span {
    font-size: 14px;
    opacity: 0.7;
  }
}
</style>
