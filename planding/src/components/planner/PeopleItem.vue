<template>
  <div class="team-member">
    <div class="team-member__profile">
      <div class="team-member__avatar"></div>
      <div class="team-member__info">
        <p class="team-member__name">팀원이름</p>
        <p class="team-member__details">팀원의 정보</p>
      </div>
    </div>

    <div class="team-member__actions">
      <v-btn
        @click="isAdded = !isAdded"
        :class="buttonClass"
        rounded="lg"
        width="64px"
        height="33px"
        variant="outlined"
      >
        {{ buttonText }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isAdded = ref(true)

const buttonText = computed(() => (isAdded.value ? '추가' : '추가됨'))
const buttonClass = computed(() =>
  isAdded.value ? 'team-member__button--add' : 'team-member__button--added'
)
</script>

<style lang="scss" scoped>
.team-member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  &__profile {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rebeccapurple;
  }

  &__info {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__button--added {
    color: #87df79;
  }

  &__button--add {
    color: var(--v-grey-darken-1);
    border-color: var(--v-grey-darken-1);
  }
}
</style>
