<template>
  <div style="display: flex; justify-content: center">
    <Progress />
  </div>
</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/store/store'
import Progress from '../ui/Progress.vue'
import { onMounted } from 'vue'
import { authInstance } from '@/service/authAxios'

const handleKakaoLogin = async () => {

  // 쿼리스트링
  const temporaryToken = new URLSearchParams(window.location.search).get('temporary')

  const data={
    temporaryToken: temporaryToken
  }
  const response = await authInstance('/api/v1/temporary-token').post('',data)

  const accessToken=response.headers['access-token']
  const refreshToken=response.headers['refresh-token']
  if (accessToken) {
    const authStore = useAuthStore();
    authStore.saveAccessToken(accessToken);
    authStore.saverefreshToken(refreshToken);
    router.push('/planding');
  } else {
    console.error('토큰을 찾을 수 없습니다.');
  }
}

onMounted(() => {
  handleKakaoLogin()
})
</script>

<style lang="scss" scoped></style>
