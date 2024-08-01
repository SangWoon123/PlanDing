<template>
  <section id="container">
    <div class="left"></div>
    <div class="mid">
      <div class="inner">
        <div class="title">PlanDing</div>

        <SubTitle text="My Plan" />
        <div class="plan-content" :style="{ height: height }">
          <GroupRoom :img="img" :title="title" :createdAt="createdAt" />
        </div>

        <SubTitle text="Team Plan" />
        <div class="team-plan-content" style="height: 100%; border-radius: 0 0 4px 4px">
          <GroupRoom class="group-room" @click="createGroup" title="그룹 생성" />
          <ol v-if="!loading" v-for="group in groupsData">
            <GroupRoom :img="group.thumbnailPath" :title="group.name" :createdAt="createdAt" />
          </ol>

          <!-- 데이터 로딩중일때 -->
          <div v-else>
            <Progress />
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <Top />
      <DatePicker />
      <Bottom />
    </div>
    <!-- Group 모달 -->
    <GroupMake
      v-if="groupModal"
      @closeModal="groupModal.value = false"
      @close="groupModal = false"
    />
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { groupsStore } from '@/store/group'
import SubTitle from './atom/SubTitle.vue'
import GroupRoom from './GroupRoom.vue'
import Top from './right/HeaderSection.vue'
import DatePicker from './right/DateSelect.vue'
import Bottom from './right/Footer.vue'
import GroupMake from '@/components/Group/GroupCreate.vue'
import Progress from '@/components/Progress.vue'

const title = '박철현님의 일정'
const createdAt = '1시간전'

const groupModal = ref(false)
const groupsData = ref([])
const loading = ref(true)

const createGroup = () => {
  groupModal.value = !groupModal.value
}

const fetchGroups = async () => {
  try {
    await groupsStore().getGroups()
    groupsData.value = groupsStore().groups
  } catch (error) {
    console.log('그룹 데이터 실패', error)
  } finally {
    loading.value = false
  }
}
watch(()=>groupsStore().groups,(newGroups)=>{
  groupsData.value=newGroups
  console.log(newGroups)
},{immediate:true})

onMounted(() => {
  fetchGroups()
})
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5fd;

  .left {
    background-color: #ffffff;
    width: 88px;
    height: 781px;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .mid {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1012px;
    height: 848px;
    border-radius: 16px;
    margin: 0 15px 0 15px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    .inner {
      background-color: #e8e9fa;
      width: 96.04%;
      height: 808px;
      border: 1px solid #5f64d9;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .title {
        font-family: 'Pretendard-Regular';
        font-weight: 900;
        font-size: 30px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        background-color: #8487e2;
        color: #ffffff;
        padding: 12px;
        border-radius: 4px 4px 0 0;
      }
      .plan-content,
      .team-plan-content {
        background-color: #ffffff;
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
        .group-room {
          color: #363bc9;
        }
      }
      .team-plan-content {
        overflow-y: auto;
        scrollbar-color: #8487e2 #f6f6f8;
      }
    }
  }
  .right {
    background-color: #ffffff;
    width: 320px;
    height: 860px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
