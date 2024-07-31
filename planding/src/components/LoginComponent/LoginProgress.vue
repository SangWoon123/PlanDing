<template>
  <div style="display: flex; justify-content: center">
    <Progress />
  </div>
</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/store/store'
import Progress from '../Progress.vue'
const queryParams = new URLSearchParams(location.search)
const accessToken = queryParams.get('accessToken')

const handleKakaoLogin = async (accessToken) => {
  const authStore = useAuthStore()
  authStore.accessToken = accessToken

  try {
    router.push('/planding')
  } catch (error) {
    console.error(error)
  }
}

if (accessToken) {
  handleKakaoLogin(accessToken)
}
</script>

<style lang="scss" scoped></style>
