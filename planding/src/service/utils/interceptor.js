import { useAuthStore } from '@/store/store'
import axios from 'axios'

let isRefreshing = false
let subscribers = []

const onRefreshed = (token) => {
  subscribers.map((cb) => cb(token))
}

const addSubscriber = (cb) => {
  subscribers.push(cb)
}


const reissueAccessToken = async (authStore, url, method) => {
  try {
    const refreshToken = authStore.refreshToken

    const response = await axios({
      url: url,
      method: method, // 기존 메서드 사용
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      }
    })
    // 새로발급된 액세스토큰 보관소에저장
    const newAccessToken = response.headers.authorization.replace('Bearer ', '')
    authStore.saveAccessToken(newAccessToken)
    return newAccessToken
  } catch (error) {
    throw new Error('리프레시토큰 재발급 오류')
  }
}

export function setInterceptor(instance) {
  const authStore = useAuthStore()

  instance.interceptors.request.use(
    function (config) {
      const accessToken = authStore.accessToken
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    async function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true // 무한 루프 방지

        // 리프레시토큰으로 재발급 과정이 이뤄지고 있는동안 들어온 요청을 배열로 보관
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            addSubscriber((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(axios(originalRequest))
            })
          })
        }

        // 액세스토큰이 만료되었을시 들어온 최초 API
        isRefreshing = true

        try {
          const newAccessToken = await reissueAccessToken(
            authStore,
            originalRequest.baseURL,
            originalRequest.method
          )

          // 액세스토큰 재발급후 실행되는 코드
          isRefreshing = false
          onRefreshed(newAccessToken)

          //새 액세스토큰으로 재 요청
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(originalRequest)
        } catch (refreshError) {
          // Refresh Token이 유효하지 않으면 로그아웃 처리
          console.error('리프레시 토큰이 유효하지 않음', refreshError)
          isRefreshing = false
          authStore.logout()
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}
