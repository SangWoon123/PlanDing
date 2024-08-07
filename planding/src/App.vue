<template>
  <div>
    <GlobalAlert :data="data" @remove="removeAlert" />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { sseConnect } from './service/sseService'
import GlobalAlert from './components/SmallTools/GlobalAlert.vue'

const connect = ref(null)
const data = ref([])
onMounted(() => {
  connect.value = sseConnect()

  connect.value.onopen = () => {
    console.log('Connection to server opened.')
  }

  connect.value.onmessage = function (e) {
    const parsedData = JSON.parse(e.data)
    data.value = [...data.value, parsedData] // 불변성을 유지하며 데이터 추가
    console.log(data.value)
  }

  connect.value.onerror = (e) => {
    console.log('sse 에러', e)
    connect.value.close()
    connect.value = sseConnect()
  }
})

function removeAlert(item) {
  data.value = data.value.filter((alert) => alert.id !== item.scheduleId)
}

onUnmounted(() => {
  connect.value.close()
})
</script>

<style>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
    format('woff');
  font-weight: 400, 500, 700, 800, 900;
  font-style: normal;
}
</style>
