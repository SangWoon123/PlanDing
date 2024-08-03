<template>
  <div v-for="user in users">
    <div class="profile">
      <img :class="{ owner: user.hasPermission }" :src="user.profileImageUrl" alt="" />
      <span>{{ user.userName }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: Array
})
</script>

<style lang="scss" scoped>
div {
  display: flex;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
}
.owner {
  border: 2px solid #5f64d9;
}
.profile {
  font-size: 10px;
  font-weight: 400;
  flex-direction: column;
  align-items: center;
}
</style>
