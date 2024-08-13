<template>
  <div class="left">
    <div v-for="favorite in favoriteGroup" :key="favorite.groupCode" class="mt-4">
      <img
        @click="navigaitorPage(favorite)"
        :src="favorite.thumbnailPath ? favorite.thumbnailPath : '/planding.png'"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
defineProps({
  favoriteGroup: Array,
  invitations: Array
})

const route = useRoute()

function navigaitorPage(favorite) {
  router.push({
    path: `/group/${favorite.code}`
  })
}

watch(
  () => route.params.groupCode,
  (newGroupCode, oldGroupCode) => {
    // 라우트 변경에 반응...
    console.log(newGroupCode)
    console.log(oldGroupCode)
    router.push({
      path: `/group/${newGroupCode}`
    })
  }
)
</script>

<style lang="scss" scoped>
.left {
  background-color: #ffffff;
  width: 88px;
  height: 781px;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: 2px solid #5f64d9;
  }
}
</style>
