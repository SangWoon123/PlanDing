<template>
  <div class="modal-overlay">
    <div class="box">
      <GroupMakeTitle />
      <Thumbnail @update-thumbnail="handleThumbnail" />

      <GroupInput v-model="title" text="그룹 이름" ySize="40px" />
      <GroupInput v-model="desc" text="그룹 설명" ySize="80px" />

      <div class="btn">
        <v-btn class="group-btn" @click="createGroup(title, desc)" text="그룹 만들기" flat />
        <v-btn class="cancle-btn" @click="closeModal" text="취소" flat />
      </div>
    </div>
  </div>
</template>

<script setup>
import GroupInput from './GroupInput.vue'
import GroupMakeTitle from './GroupMakeHeader.vue'
import Thumbnail from './Thumbnail.vue'
import { ref } from 'vue'
import { authInstance } from '@/api/authAxios'

const title = ref('')
const desc = ref('')
const thumbnail = ref(null)

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

  const instance = authInstance('/api/v1/group')

  const response = await instance.post('', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(response)
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 700px;
  background-color: white;
  border-radius: 4px;
  position: relative;
}
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
