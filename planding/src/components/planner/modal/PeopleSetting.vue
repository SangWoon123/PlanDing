<template>
  <div class="people-setting">
    <label>인원 설정</label>
    <v-divider></v-divider>
    <div class="people-setting__header">
      <div class="people-setting__profile-group">
        <div
          v-for="(user, index) in selectedUsers"
          :key="user.userCode"
          class="people-setting__profile"
          :style="{ left: `${index * 20}px` }"
        >
          <img :src="user.profileImageUrl || '/planding_icon.png'" />
        </div>
      </div>
      <span class="people-setting__text">총 {{ selectedUsers.length }}명</span>
    </div>
    <v-divider class="mb-5"></v-divider>

    <v-virtual-scroll height="418px" :items="groupStore.selectGroup.users" item-height="100">
      <template #default="{ item, index }">
        <PlannerItem
          :key="index"
          :userInfo="item"
          :isSelected="isSelected(item)"
          @toggle-user="handleToggleUser"
        />
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup>
import PlannerItem from './PeopleItem.vue'
import { userGroupsStore } from '@/store/group'
import { ref } from 'vue'

const selectedUsers = ref([])
const groupStore = userGroupsStore()

function handleToggleUser({ userInfo, isAdded }) {
  if (isAdded) {
    selectedUsers.value.push(userInfo)
  } else {
    selectedUsers.value = selectedUsers.value.filter((user) => user.userCode !== userInfo.userCode)
  }
}

function isSelected(user) {
  return selectedUsers.value.some((selectedUser) => selectedUser.userCode === user.userCode)
}
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
