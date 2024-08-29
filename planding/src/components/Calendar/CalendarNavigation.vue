<template>
  <v-toolbar class="header">
    <div class="one">
      <v-btn class="today" flat :text="title" @click="toToday" />
      <v-btn color="#7F83EA" icon="mdi-chevron-left" @click="prev" class="arrow" />
      <v-btn color="#7F83EA" icon="mdi-chevron-right" @click="next" class="arrow" />
    </div>

    <!-- 보기 모드 토글 버튼 -->
    <div class="custom-tabs">
      <v-tabs v-model="viewMode" height="40px" @update:modelValue="updateViewMode" hide-slider>
        <v-tab value="month" :class="{ active: viewMode === 'month' }" class="custom-tab">
          <v-btn value="month">Monthly</v-btn>
        </v-tab>
        <v-tab value="week" :class="{ active: viewMode === 'week' }" class="custom-tab">
          <v-btn value="week">Weekly</v-btn>
        </v-tab>
      </v-tabs>
    </div>
    <v-spacer></v-spacer>

    <!-- 그룹모드만 -->
    <div v-if="group" class="modal-container">
      <GroupFunctionModal class="modal-content" />
    </div>
  </v-toolbar>
</template>

<script setup>
import GroupFunctionModal from '@/components/ui/modal/GroupFunctionModal.vue'
import { ref } from 'vue'
defineProps({
  group: Boolean,
  title: String,
  view_mode: String
})
const viewMode = ref('month')
const emit = defineEmits(['prev', 'next', 'toToday', 'updateViewMode'])

function prev() {
  emit('prev')
}

function next() {
  emit('next')
}

function toToday() {
  emit('toToday')
}

function updateViewMode(value) {
  emit('updateViewMode', value)
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 10px 0 2px;
  background-color: white;
  .today {
    font-size: 20px;
  }
}
.custom-tabs {
  display: flex;
  justify-content: center;
  height: 50px;
  background-color: #f6f6f8;
  border-radius: 6px;
  padding: 5px;
  box-shadow: inset 0 0px 1px rgba(0, 0, 0, 0.2);
  .active {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  }
}

.custom-tab {
  padding: 0; /* 탭 안의 여백을 줄임 */
}

.v-btn {
  text-transform: none !important; /* 텍스트가 대문자로 변환되지 않도록 설정 */
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-content {
    width: 36px;
    height: 36px;
    background-color: #474aa1;
    border-radius: 50%;
  }
}
</style>
