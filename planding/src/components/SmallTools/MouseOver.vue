<!-- MouseOver.vue -->
<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <div v-bind="props" class="mouse-over-container">
      <slot :isHovering="isHovering"></slot>
      <v-expand-transition>
        <div v-if="isHovering" class="hover-buttons">
          <div class="hover-btn">
            <v-btn
              @click="handleFavorite(groupCode)"
              :icon="test ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
              class="mr-2"
            />
            <v-btn @click="handlerDeleteGroup(groupCode)" icon="mdi-trash-can-outline" />
          </div>
        </div>
      </v-expand-transition>
    </div>
  </v-hover>
</template>

<script setup>
import { ref, watch } from 'vue'
import { userGroupsStore } from '@/store/group'
import { postFavorite, deleteFavorite } from '@/service/favoriteController'

const props = defineProps({
  bookmark: Boolean,
  groupCode: String
})

const groupStore = userGroupsStore()
const test = ref(props.bookmark)

async function handleFavorite(groupCode) {
  try {
    if (test.value) {
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
    test.value = !test.value
  }
}

function handlerDeleteGroup(groupCode) {
  groupStore.handlerDeleteGroup(groupCode)
}

watch(
  () => props.bookmark,
  (newVal) => {
    test.value = newVal
  }
)
</script>

<style lang="scss" scoped>
.mouse-over-container {
  position: relative;
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

.hover-btn {
}

.mouse-over {
  background-color: aqua;
  // box-shadow: inset 0px 0px 10px #666;
}
</style>
