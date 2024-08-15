<!-- MouseOver.vue -->
<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <div v-bind="props" class="mouse-over-container">
      <slot :isHovering="isHovering"></slot>

      <v-expand-transition>
        <div v-if="isHovering" class="hover-buttons">
          <v-btn
            class="btn"
            @click="handleFavorite(groupCode)"
            :icon="bookmark ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
          />
          <v-btn
            class="btn"
            @click="handleAlarm(groupCode)"
            :icon="alarm ? 'mdi-bell-ring' : 'mdi-bell-ring-outline'"
          />
          <v-btn class="btn" @click="handlerDeleteGroup(groupCode)" icon="mdi-trash-can-outline" />
        </div>
      </v-expand-transition>
    </div>
  </v-hover>
</template>

<script setup>
import { ref, watch } from 'vue'
import { userGroupsStore } from '@/store/group'
import { postFavorite, deleteFavorite } from '@/service/favoriteController'
import { updateGroupAlarmSetting } from '@/service/alarmController'

const props = defineProps({
  bookmark: Boolean,
  groupCode: String
})

const groupStore = userGroupsStore()
const bookmark = ref(props.bookmark)
const alarm = ref(true)

async function handleFavorite(groupCode) {
  try {
    if (bookmark.value) {
      const response = await deleteFavorite(groupCode)
      groupStore.favoriteGroups = groupStore.favoriteGroups.filter(
        (group) => group.code !== groupCode
      )
      console.log('delete', response)
    } else {
      const response = await postFavorite(groupCode)
      const group = groupStore.groups.find((group) => group.code === groupCode)
      if (group) {
        groupStore.favoriteGroups.push(group)
      }

      console.log('post', response)
    }
  } catch (error) {
    console.log(error)
  } finally {
    bookmark.value = !bookmark.value
  }
}

function handlerDeleteGroup(groupCode) {
  groupStore.leaveGroup(groupCode)
}

function handleAlarm(groupCode) {
  try {
    if (alarm.value) {
      const response = updateGroupAlarmSetting(groupCode, false)
    } else {
      const response = updateGroupAlarmSetting(groupCode, true)
    }
  } catch (error) {
    console.error(error)
  } finally {
    alarm.value = !alarm.value
  }
}

watch(
  () => props.bookmark,
  (newVal) => {
    bookmark.value = newVal
  }
)
</script>

<style lang="scss" scoped>
.mouse-over-container {
  position: relative;
}
.btn {
  width: 35px;
  height: 35px;
}
.hover-buttons {
  position: absolute;
  right: 15%;
  bottom: 10%;
  z-index: 10;
}
.delete-btn {
  position: absolute;
  top: -40px;
  right: 0;
  width: 20px;
  height: 20px;
}

.mouse-over {
  background-color: aqua;
  // box-shadow: inset 0px 0px 10px #666;
}
</style>
