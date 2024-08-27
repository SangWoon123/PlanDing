<template>
  <v-menu class="test" location="left" @update:modelValue="toggleClick">
    <template v-slot:activator="{ props }">
      <div class="container" v-bind="props" :style="containerStyles">
        <v-icon>mdi-dots-horizontal</v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        @click="selectFunction(index)"
        class="content"
        v-for="(item, index) in filteredItems"
        :key="index"
        :value="index"
      >
        <v-icon :style="{ color: item.color ? '#E15A5A' : '#525477' }">{{ item.icon }}</v-icon>
        <span :style="{ color: item.color ? '#E15A5A' : '#525477' }">{{ item.title }}</span>
      </v-list-item>
    </v-list>
  </v-menu>

  <div class="modal-wrap">
    <InviteDialog v-if="inviteModal" @close="inviteModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InviteDialog from '@/components/MainContent/dialog/InviteDialog.vue'
import { userGroupsStore } from '@/store/group'
import { useAuthStore } from '@/store/store'
import { useRoute } from 'vue-router'
import router from '@/router'

const groupStore = userGroupsStore()
const userStore = useAuthStore()

const groupCode = useRoute().params.groupCode

const items = [
  { title: '초대하기', icon: 'mdi-account-plus' },
  { title: '나가기', icon: 'mdi-exit-run' },
  { title: '삭제하기', icon: 'mdi-trash-can', color: '#E15A5A' }
]

const filteredItems = computed(() => {
  if (groupStore.selectGroup.owner === userStore.userCode) {
    return items.filter((item) => item.title !== '나가기')
  }
  return items.filter((item) => item.title !== '삭제하기')
})

const click = ref(false)
const inviteModal = ref(false)

const containerStyles = computed(() => ({
  backgroundColor: click.value ? '#474aa1' : '#f6f6f8',
  color: click.value ? 'white' : 'black'
}))

function toggleClick() {
  click.value = !click.value
}

function selectFunction(index) {
  const item = filteredItems.value[index]

  if (item) {
    if (item.title === '초대하기') {
      inviteModal.value = true
    } else if (item.title === '삭제하기') {
      handlerDeleteGroup()
    } else if (item.title === '나가기') {
      handlerLeaveGroup()
    }
  }
  click.value = false
}

function handlerDeleteGroup() {
  groupStore.handlerDeleteGroup(groupCode)
  router.push('/planding')
}

function handlerLeaveGroup() {
  groupStore.leaveGroup(groupCode)
  router.push('/planding')
}
</script>

<style lang="scss" scoped>
:deep(.v-overlay__content) {
  border-radius: 8px;
  background-color: #525477 !important;
}
.v-menu > .v-overlay__content > .v-list {
  background-color: #f6f6f8;
  color: #525477;
  font-size: 12px;
}
.container {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.content {
  max-width: 96px;
  max-height: 87px;
}

.modal-wrap {
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.4);
}
</style>
