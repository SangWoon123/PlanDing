<template>
  <section id="top">
    <div class="one">
      <figure>
        <img src="../../../../assets/Ellipse.png" alt="" />
        <div class="info">
          <span>{{ userInfo.userName }}</span>
          <span style="font-size: 16px; color: lightgrey">{{ userInfo.userCode }}</span>
        </div>
      </figure>

      <button @click="logout" class="logout" type="button">로그아웃</button>
    </div>

    <div class="two">
      <button>
        <img src="../../../../assets/message_icon.png" alt="" />
      </button>
      <button>
        <img src="../../../../assets/alert_icon.png" alt="" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from '@/store/store'
import { onMounted } from 'vue'

const userInfo = useAuthStore()

onMounted(async () => {
  await userInfo.getUserInfo()
})

const logout = () => {
  userInfo.clearAuth()
}
</script>

<style lang="scss" scoped>
#top {
  margin-top: 20px;
  width: 90%;
  height: 136px;
  background-color: #f6f6f8;
  border-radius: 8px;
  .one {
    margin: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 100%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 8px;
    }
    .logout {
      width: 89px;
      height: 34px;
      color: white;
      background-color: #656ae6;
      border-radius: 4px;
    }
  }
  .two {
    margin-left: 20px;
    button:first-child {
      margin-right: 5px;
    }
  }
}
</style>
