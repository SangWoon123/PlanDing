<template>
  <div class="people-setting">
    <label>인원 설정</label>
    <v-divider></v-divider>
    <div class="people-setting__header">
      <div class="people-setting__profile-group">
        <div
          v-for="(i, index) in 5"
          :key="index"
          class="people-setting__profile"
          :style="{ left: `${index * 20}px` }"
        ></div>
      </div>
      <span class="people-setting__text">총 3명</span>
    </div>
    <v-divider class="mb-5"></v-divider>

    <v-virtual-scroll height="310px" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" item-height="100">
      <template #default="{ item, index }">
        <PlannerItem :key="index" />
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup>
import PlannerItem from './PeopleItem.vue'
</script>

<style lang="scss" scoped>
.people-setting {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0 14px 0;
  }
  &__profile-group {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__profile {
    width: 28px;
    height: 28px;
    background-color: #87df79;
    border-radius: 50%;
    position: absolute;
  }
  &__text {
    font-size: 16px;
    margin-right: 10px;
  }
}
</style>
