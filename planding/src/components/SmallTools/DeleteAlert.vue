<template>
  <v-dialog max-width="400">
    <v-card>
      <v-card-title class="text-h6"> 정말 이 스케줄을 삭제하시겠습니까? </v-card-title>
      <v-card-text>
        <p>{{ subtitle }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#D91A31" @click="confirmDelete">Delete</v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  subtitle: {
    type: String,
    default: '이 작업은 되돌릴 수 없습니다.'
  }
})

const emit = defineEmits(['closeModal', 'confirmDelete'])

function confirmDelete() {
  emit('confirmDelete')
}

function closeDialog() {
  emit('closeModal')
}
</script>

<style scoped lang="scss"></style>
