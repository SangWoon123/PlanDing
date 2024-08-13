<template>
  <Modal @close="closeModal">
    <GroupMakeTitle />
    <Thumbnail @update-thumbnail="handleThumbnail" />

    <GroupInput v-model="title" text="그룹 이름" ySize="40px" />
    <GroupInput v-model="desc" text="그룹 설명" ySize="80px" />

    <div class="btn">
      <v-btn class="group-btn" @click="createGroup(title, desc)" text="그룹 만들기" flat />
      <v-btn class="cancle-btn" @click="closeModal" text="취소" flat />
    </div>
  </Modal>
</template>

<script setup>
import Modal from '../SmallTools/Modal.vue'
import GroupInput from './GroupInput.vue'
import GroupMakeTitle from './GroupMakeHeader.vue'
import Thumbnail from './Thumbnail.vue'
import { ref } from 'vue'
import { authInstance } from '@/service/authAxios'
import { userGroupsStore } from '@/store/group'

const title = ref('')
const desc = ref('')
const thumbnail = ref(null)
const groupStore = userGroupsStore()

const emit = defineEmits()

const closeModal = () => {
  emit('close')
}
const handleThumbnail = (file) => {
  thumbnail.value = file
}

const createGroup = async () => {
  const formData = new FormData()

  const groupRequest = {
    name: title.value,
    description: desc.value
  }

  formData.append('request', new Blob([JSON.stringify(groupRequest)], { type: 'application/json' }))
  formData.append('thumbnail', thumbnail.value)

  const response = await authInstance('/api/v1/group').post('', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  groupStore.groups.push(response.data.data)
  emit('close')
}
</script>

<style lang="scss" scoped>
.btn {
  position: absolute;
  bottom: 40px;
  right: 32px;
  .group-btn {
    background-color: #9da2ff;
    color: white;
    margin-right: 7.5px;
    box-shadow: 2px 2px 0px 0px #6065d4;
  }
  .cancle-btn {
    background-color: #dcdcdc;
    margin-left: 7.5px;
    box-shadow: 2px 2px 0px 0px #b1b1b1;
  }
}
</style>
