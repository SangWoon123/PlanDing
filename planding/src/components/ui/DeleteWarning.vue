<template>
  <v-dialog max-width="400">
    <v-card height="300px">
      <v-card-title>
        <div class="icon">
          <v-icon color="red">mdi-alert</v-icon>
        </div>
        <span>정말 이 스케줄을 삭제하시겠습니까? </span>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="closeDialog">Cancel</v-btn>
        <v-btn variant="flat" color="#D91A31" @click="confirmDelete">Delete</v-btn>
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

<style scoped lang="scss">
.icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
}
</style>
