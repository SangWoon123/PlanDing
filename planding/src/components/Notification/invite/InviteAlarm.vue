<template>
  <transition-group name="slide-y-transition" tag="div" class="container">
    <div class="container">
      <div v-for="(item, index) in data" :key="index">
        <div class="alert-list">
          <v-alert
            v-show="item"
            rounded="lg"
            width="450px"
            height="150px"
            elevation="2"
            color="#FFFFFF"
            closable
            @click:close="handleClose(item)"
          >
            <template v-slot:prepend>
              <img src="/planding_icon.png" alt="Icon" class="alert-icon" />
            </template>

            <v-row class="alert-content">
              <v-col col="3" class="logo-col">
                <v-img src="/planding_icon.png" alt="Logo" contain />
              </v-col>
              <v-col cols="9">
                <div class="alert-title">
                  <div class="alert-title-header">
                    <span> 그룹 알람</span>
                  </div>
                  <span style="color: #7d7d7d">now</span>
                </div>
                <span class="alert-text">{{ item.message }}</span>
                <div class="alert-subtext">※ 초대는 00시 까지 유효합니다.</div>
              </v-col>
            </v-row>
            <div class="alert-btn">
              <v-btn width="50%">거절하기</v-btn>
              <v-btn width="50%" color="#5f64d9" @click="acceptInvite">수락하기</v-btn>
            </div>
          </v-alert>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script setup>

const emit = defineEmits(['remove'])
defineProps({
  data: Array
})

function handleClose(item) {
  emit('remove', item)
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  z-index: 10000;
  left: 20px;
  bottom: 10px;
  display: flex;
  flex-direction: column-reverse;
  .alert-list {
    display: flex;
    flex-direction: column;
    margin-top: 2px;
  }
}
.alert-content {
  display: flex;
  justify-content: center;
}

.logo-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 4px;
  .alert-title-header {
    display: flex;
    flex-direction: column;
  }
}

.alert-text {
  font-size: 14px;
  margin-bottom: 4px;
}
.alert-subtext {
  font-size: 12px;
  color: #7d7d7d;
}

.alert-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  margin-top: 10px;
  .v-btn {
    flex: 1;
  }
}

.alert-icon {
  width: 60px;
  height: 60px;
}
</style>
