<template>
  <section id="container">
    <div class="background">
      <figure class="left">
        <img src="../../assets/LoginLogo.svg" alt="" />
      </figure>
      <div class="right">
        <h2 style="color: #3f43c0">PlanDing</h2>
        <p>
          {{ desc }}
        </p>

        <div class="form-group">
          <LoginInput text="User Name" />
          <LoginInput text="Password" />

          <LoginBtn style="margin: 50px 0 15px 0" color="#9DA2FF" text="Login" textColor="white" />
          <LoginBtn style="margin-bottom: 30px" color="#BEBEBE" text="Sign In" textColor="gray" />
          <span class="line"></span>
          <LoginBtn color="#fee500" text="kakao" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import LoginBtn from './LoginBtn.vue'
import LoginInput from './LoginInput.vue'

const desc =
  'PlanDing은 일정 관리와 그룹 스터디 플래너의 경계를 넘어서는 플랫폼입니다. 사용자의 일상과 학습 활동을 지원하기 위해 설계된 PlanDing은 직관적인 인터페이스와 함께, 일정 계획부터 실행까지 일련의 과정을 단순화하고 향상시키는 다양한 기능을 제공합니다.'
</script>

<style lang="scss" scoped>
#container {
  background-color: #f5f5fd;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .background {
    display: flex;
    width: 1180px;
    height: 840px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  .left {
    padding: 20px;
    margin: auto;
    width: 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .right {
    margin: auto;
    padding: 25px; // 전체 패딩 추가

    h2 {
      margin: 0 0 15px 0; // 제목 아래쪽 마진
      font-size: 28px; // 제목 크기 조정
    }

    p {
      margin: 15px 0; // 문단 위아래 마진
      line-height: 1.5; // 줄 간격 조정
      text-align: justify; // 양쪽 정렬
      font-size: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .line {
        width: 380px;
        border-top: 1px solid lightgray;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
