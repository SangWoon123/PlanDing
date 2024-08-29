<template>
  <div class="right">
    <HeaderSection :invitations="invitations" :schedules="schedules"/>
    <DateSelect />
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import HeaderSection from './HeaderSection.vue'
import DateSelect from './DateSelect.vue'

defineProps({
  invitations: Array,
  schedules: Array
})
</script>

<style lang="scss" scoped>
.right {
  background-color: #ffffff;
  width: 320px;
  height: 860px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
