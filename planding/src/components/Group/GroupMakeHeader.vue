<template>
  <div class="header">
    <SubTitle text="그룹 만들기" style="padding: 0px" />
    <div class="desc">생성할 그룹의 정보를 입력해주세요</div>
    <v-divider color="#9DA2FF" length="360px" thickness="2px"></v-divider>
  </div>
</template>

<script setup>
import SubTitle from '../ui/SubTitle.vue';
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  margin: 0 auto; 
  padding: 16px;
}
.desc {
  color: #6065d3;
  font-size: 12px;
  margin-bottom: 5px;
}
</style>
