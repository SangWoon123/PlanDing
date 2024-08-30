<template>
  <div class="planner">
    <div class="planner__header">
      <BaseTitle :text="`${groupStore.selectGroup.name} 일정표`" size="24px" />
    </div>

    <div class="planner__content">
      <div class="planner__content-header">
        <BaseTitle text="일정 목록" size="20px" />
        <AddButton type text="추가하기" icon="mdi-plus" @click="openForm" />
      </div>
      <div class="planner__content-nav-box">
        <div class="planner__content-nav">
          <div>제목</div>
          <div>일정</div>
          <div>시작일</div>
          <div>종료일</div>
        </div>
      </div>
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeForm">
        <PlannerForm @close="closeForm" @create="createPlanner" />
      </div>
    </div>

    <div
      class="planner__content-body"
      v-for="(item, index) in plannerStore.weekPlanners"
      :key="index"
    >
      <PlannerItemParent :schedule="item" />
    </div>
  </div>
</template>

<script setup>
import BaseTitle from '../ui/BaseTitle.vue'
import AddButton from '../ui/AddButton.vue'
import PlannerItemParent from './PlannerItemParent.vue'
import PlannerForm from './modal/PlannerForm.vue'
import { useModal } from '@/hook/useModal'
import { useAuthStore } from '@/store/store'
import { useRoute } from 'vue-router'
import { usePlannerStore } from '@/store/planner'
import { inject, onMounted, ref, watch } from 'vue'
import { useDateStore } from '@/store/date'
import { userGroupsStore } from '@/store/group'
import { getPlannerById } from '@/service/plannerController'

const { isOpen: isModalOpen, open: openForm, close: closeForm } = useModal()

const client = inject('websocketClient')
const groupStore = userGroupsStore()
const userStore = useAuthStore()
const groupCode = ref(useRoute().params.groupCode)
const plannerStore = usePlannerStore()
const dateStore = useDateStore()
const weekDate = ref({})

function createPlanner() {
  const headers = {
    Authorization: `Bearer ${userStore.accessToken}`,
    groupCode: groupCode.value
  }

  const newPlanner = plannerStore.submitForm()
  client.value.send(`/pub/planner/create/${headers.groupCode}`, {}, JSON.stringify(newPlanner))

  console.log('생성 폼',newPlanner)

  //TODO 고쳐야함
  plannerStore.weekPlanners.forEach(async(planner) => {
    if (planner.scheduleId === newPlanner.scheduleId) {
      console.log('forEach', planner.planner)
      // planner.planner.push(response)
      // getPlannerById(groupCode,)
    }
  })
  closeForm()
}

async function fetchPlannerData() {
  const current = dateStore.caculateWeekRange(new Date())
  await plannerStore.getWeekPlannerByGroup(groupCode.value, current.startDate, current.endDate)
}

onMounted(() => {
  fetchPlannerData()
})

watch(
  () => dateStore.selectedDate,
  async (newVal) => {
    weekDate.value = useDateStore().caculateWeekRange(newVal)
    await plannerStore.getWeekPlannerByGroup(
      groupCode.value,
      weekDate.value.startDate,
      weekDate.value.endDate
    )
  }
)
</script>

<style lang="scss" scoped>
.planner {
  height: 100vw;
  background-color: white;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #e8e9fa;
    width: 100%;
    height: 66px;
  }

  &__content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    gap: 20px;

    &-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-nav-box {
      width: 932px;
      background-color: #474aa1;
      border-radius: 8px;
      display: flex;
      justify-content: start;
    }
    &-nav {
      width: 668px;
      max-width: 932px;
      height: 42px;
      color: white;
      display: flex;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        font-size: 12px;
      }

      div:nth-child(1) {
        width: 264px;
        justify-content: start;
        margin-left: 8px;
      } /* 제목 */
      div:nth-child(2) {
        width: 60px;
      } /* 일정 */
      div:nth-child(3) {
        width: 160px;
      } /* 시작일 */
      div:nth-child(4) {
        width: 160px;
      } /* 종료일 */
    }

    &-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgb(0, 0, 0,0.5);
  z-index: 1;
}
</style>
