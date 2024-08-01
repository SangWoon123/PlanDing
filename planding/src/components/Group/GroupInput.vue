<template>
  <div>
    <SubTitle :text="text" style="font-size: 18px; padding:0px" />
    <input type="text" placeholder="Text" class="input" :style="{ height: ySize }" />
  </div>
</template>

<script setup>
import SubTitle from '../ListPage/MainContent/atom/SubTitle.vue'

const props = defineProps({
  text: String,
  ySize: String
})
</script>

<style lang="scss" scoped>
.input {
  width: 360px;
  height: 80px;
  border: 1px solid #bebebe;
  border-radius: 4px;
  padding: 0px 0px 0px 10px;
}
input::placeholder {
  color: #303494;
}
</style>
