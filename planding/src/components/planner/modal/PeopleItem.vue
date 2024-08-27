<template>
  <div class="team-member">
    <div class="team-member__profile">
      <div class="team-member__avatar">
        <img :src="userInfo.profileImageUrl" alt="" />
      </div>
      <div class="team-member__info">
        <p class="team-member__name">{{ userInfo.userName }}</p>
        <p class="team-member__details">{{ userInfo.userCode }}</p>
      </div>
    </div>

    <div class="team-member__actions">
      <v-btn
        @click="toggleUser(userInfo)"
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

const props = defineProps({
  userInfo: Object,
  isSelected: Boolean
})

const emit = defineEmits(['toggle-user'])

const isAdded = ref(true)

const buttonText = computed(() => (isAdded.value ? '추가' : '추가됨'))
const buttonClass = computed(() =>
  isAdded.value ? 'team-member__button--add' : 'team-member__button--added'
)

function toggleUser(userInfo) {
  isAdded.value = !isAdded.value
  emit('toggle-user', { userInfo, isAdded: !isAdded.value })
}
</script>

<style lang="scss" scoped>
.team-member {
  width: 100%;
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
