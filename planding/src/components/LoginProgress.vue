<template>
  <h1>Hello World</h1>
</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/store/store'
const queryParams = new URLSearchParams(location.search)
const accessToken = queryParams.get('accessToken')

const handleKakaoLogin = async (accessToken) => {
  const authStore = useAuthStore()
  authStore.accessToken = accessToken

  try {
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}

if (accessToken) {
  handleKakaoLogin(accessToken)
}
</script>

<style lang="scss" scoped></style>
