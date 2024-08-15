<template>
  <div class="pa-4 text-center">
    <CustomFab @click="toggleMenu">
      <v-menu v-model="isMenuOpen" location="end" offset-y :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" width="100%" height="100%" density="compact" variant="plain" :ripple="false"/>
        </template>

        <v-card width="400" height="600" rounded="xl" class="card">
          <v-layout class="pa-2" bg-color="primary">
            <v-bottom-navigation :active="active" color="indigo" rounded="lg" grow>
              <v-btn @click="showInvite">
                <v-icon>mdi-account-plus-outline</v-icon>
                초대
              </v-btn>

              <v-btn @click="showChat">
                <v-icon> mdi-chat-processing-outline </v-icon>
                대화
              </v-btn>
            </v-bottom-navigation>
          </v-layout>
          <InvitePage v-if="invite" />
          <ChatPage v-else-if="chat" />
        </v-card>
      </v-menu>
    </CustomFab>
  </div>
</template>

<script setup>
import ChatPage from './ChatPage.vue'
import InvitePage from './InvitePage.vue'
import CustomFab from '@/components/ui/CustomFab.vue';
import { ref } from 'vue'
const active = ref(true)

const chat = ref(false)
const invite = ref(false)

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function showInvite() {
  invite.value = true
  chat.value = false
  console.log('invite click', invite.value, chat.value)
}

function showChat() {
  invite.value = false
  chat.value = true
  console.log('chat click', invite.value, chat.value)
}
</script>

<style lang="scss" scoped></style>
