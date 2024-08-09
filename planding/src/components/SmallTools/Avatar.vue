<template>
  <div class="avatar-group">
    <div class="avatar" v-for="i in visibleAvatars">
      <img src="/public/planding.png" alt="Profile" />
    </div>
    <div style="width: 100%; display: flex; align-items: center; justify-content: end">
      <v-badge
        v-if="badgeContent"
        style="width: 15px; margin: auto"
        color="grey"
        :content="badgeContent"
      ></v-badge>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  size: Number
})

const visibleAvatars = computed(() => {
  return Math.min(props.size, 3)
})

const badgeContent = computed(() => {
  return props.size > 3 ? `${props.size - 3}+` : null
})
</script>

<style lang="scss" scoped>
.avatar-group {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.avatar-group {
  margin-left: 10px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid lightgreen;
    background-color: #656ae6;
    margin-left: -10px;
  }
}
</style>
