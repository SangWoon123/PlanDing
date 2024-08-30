<template>
  <v-speed-dial location="bottom center" transition="fade-transition">
    <template v-slot:activator="{ props: activatorProps }">
      <v-fab v-bind="activatorProps" size="x-large" icon="mdi-plus"> </v-fab>
    </template>
    <v-btn key="1" @click="createInvite" icon="mdi-account-multiple-plus"> </v-btn>
    <v-btn key="2" icon="mdi-chat"></v-btn>
  </v-speed-dial>
  <Invite v-if="inviteModal" @close="inviteModal = false" />
</template>

<script setup>
import Invite from './ChatButton.vue'
import { ref } from 'vue'
const inviteModal = ref(false)
function createInvite() {
  inviteModal.value = !inviteModal.value
}
</script>

<style lang="scss" scoped></style>
