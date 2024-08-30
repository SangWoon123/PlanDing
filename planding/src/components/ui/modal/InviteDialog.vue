<template>
  <div class="outer-container">
    <div class="background"></div>
    <div class="box">
      <div class="box__header">
        <BaseTitle text="OOO 그룹으로 초대하기" size="28px" style="font-weight: 400" />
        <span style="font-size: 14px; color: #8889a1">그룹으로 동료를 초대하세요</span>
        <v-divider length="80%"></v-divider>
      </div>

      <div class="box__body">
        <input type="text" class="input" placeholder="#0000" v-model="inputUserCode" />
        <v-btn icon="mdi-search-web" class="icon" flat variant="text" :ripple="false" />
      </div>

      <div class="box__footer">
        <v-btn color="#474aa1" @click="createInvite">요청보내기</v-btn>
        <v-btn color="#474aa1" variant="outlined" @click="$emit('close')">취소</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseTitle from '@/components/ui/BaseTitle.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAlarmStore } from '@/store/alarm'

defineEmits(['close'])

const alarmStore = useAlarmStore()
const inputUserCode = ref('')
const route = useRoute()

async function createInvite() {
  const groupCode = route.params.groupCode
  const userCode = inputUserCode.value

  await alarmStore.postInvitation(groupCode, userCode)
}
</script>

<style scoped lang="scss">
.outer-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  box-shadow: 0 0 0 rgb(0, 0, 0, 0.5);
}

.background {
  position: absolute;
  width: 464px;
  height: 275px;
  border-radius: 16px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.box {
  position: relative;
  width: 448px;
  height: 259px;
  border: 1px solid #8889a1;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
  }
  &__body {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    .input {
      width: 392px;
      height: 40px;
      border: 1px solid #8889a1;
      border-radius: 4px;
      padding: 8px;
    }
    .icon {
      position: absolute;
      right: 20px;
      color: #8889a1;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    // button {
    //   background-color: #474aa1;
    //   border-radius: 4px;
    //   color: white;
    //   width: 105px;
    //   height: 34px;
    //   padding: 10px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    // }
  }
}
</style>
