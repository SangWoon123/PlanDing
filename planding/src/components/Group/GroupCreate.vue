<template>
  <div class="modal-overlay">
    <div class="box">
      <GroupMakeTitle />
      <Thumbnail />

      <GroupInput text="그룹 이름" ySize="40px" />
      <GroupInput text="그룹 설명" ySize="80px" />

      <div class="btn">
        <v-btn class="group-btn" text="그룹 만들기" flat />
        <v-btn class="cancle-btn" @click="closeModal" text="취소" flat />
      </div>
    </div>
  </div>
</template>

<script setup>
import GroupInput from './GroupInput.vue'
import GroupMakeTitle from './GroupMakeHeader.vue'
import Thumbnail from './Thumbnail.vue'

const emit = defineEmits()

const closeModal = () => {
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
