import axios from 'axios'
import { useAuthStore } from '@/store/store'

export const logout = async () => {
  const authStore = useAuthStore()
  const refreshToken = authStore.refreshToken

  try {
    // 로그아웃 요청
    const response = await axios.post(
      'http://localhost:8080/logout',
      {},
      {
        headers: {
          refreshToken: `Bearer ${refreshToken}`
        }
      }
    )

    // 로그아웃 성공 시 처리
    if (response.status === 200) {
      authStore.clearAuth()
      window.location.href = 'http://localhost:5173/'
    }
  } catch (error) {
    // 에러 처리
    console.error('Logout failed:', error)
  }
}
