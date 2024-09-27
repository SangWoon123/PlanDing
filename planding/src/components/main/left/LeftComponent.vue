<template>
  <div class="left">
    <div class="left__bar">
      <div v-for="favorite in favoriteGroup" :key="favorite.groupCode" class="mt-4">
        <img
          @click="navigaitorPage(favorite)"
          :src="favorite.thumbnailPath ?  favorite.thumbnailPath : '/src/assets/base_avatar.png'"
          @error="replaceByDefault"
        />
      </div>
    </div>
    <ChatButton @click="toggleModal" />
    <div v-if="isModalOpen" class="speed-dialog">
      <ChattingModal class="modal" />
    </div>
  </div>
</template>

<script setup>
import ChattingModal from '../chat/ChattingModal.vue'
import ChatButton from '@/components/main/chat/ChatButton.vue'
import router from '@/router'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useModal } from '@/hook/useModal'
const { isOpen: isModalOpen, open: openForm, close: closeForm, toggle: toggleModal } = useModal()

defineProps({
  favoriteGroup: Array,
  invitations: Array
})

const route = useRoute()

function navigaitorPage(favorite) {
  router.push({
    path: `/group/${favorite.code}`
  })
}

function replaceByDefault(e){
  e.target.src = '/src/assets/base_avatar.png';
}

watch(
  () => route.params.groupCode,
  (newGroupCode, oldGroupCode) => {
    // 라우트 변경에 반응...
    router.push({
      path: `/group/${newGroupCode}`
    })
  }
)
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  height: 861px;
  flex-direction: column;
  align-items: center;
  &__bar {
    background-color: #ffffff;
    width: 88px;
    height: 765px;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 999px;
      border: 3px solid #363bc9;
    }
  }
}
.speed-dialog {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-icon {
  cursor: pointer;
  width: 36px;
  height: 36px;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal {
  position: absolute;
  right: 70px;
  bottom: -30px;
}
</style>
