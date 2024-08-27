<template>
  <section id="top">
    <div class="one">
      <figure>
        <img
          :src="userInfo.profileImage || baseImage"
          :class="{ 'profile-true': userInfo.profileImage }"
          alt=""
        />
        <div class="info">
          <span>{{ userInfo.userName }}</span>
          <span style="font-size: 16px; color: lightgrey">{{ userInfo.userCode }}</span>
        </div>
      </figure>

      <router-link to="/" @click="logout" class="logout" type="button">로그아웃</router-link>
    </div>

    <div class="two">
      <v-menu location="top" offset-y :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @click="notification = true"
            density="compact"
            stacked
            variant="plain"
            class="icon-btn"
          >
            <v-badge color="error" :content="alarmMessageCount || 0">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card width="380" height="630" rounded="xl" class="pa-2">
          <template v-slot:title>
            <span class="font-weight-black">알림</span>
          </template>
          <v-divider color="black" length="100%" thickness="1px" class="mb-3" />

          <div class="d-flex justify-center">
            <div class="custom-tabs">
              <v-tabs v-model="tab" height="30px" slider-color="#656ae6">
                <v-tab value="one" class="custom-tab">
                  <span>전체</span>
                  <v-badge
                    :class="{ 'badge-selected': tab === 'one' }"
                    text-color="#656ae6"
                    color="#F5F5FC"
                    inline
                    :content="countAll"
                    rounded="0"
                  ></v-badge>
                </v-tab>
                <v-tab value="two" class="custom-tab">
                  <span>초대</span>
                  <v-badge
                    :class="{ 'badge-selected': tab === 'two' }"
                    text-color="#656ae6"
                    color="#F5F5FC"
                    inline
                    :content="invitations.length"
                    rounded="0"
                  ></v-badge>
                </v-tab>
                <v-tab value="three" class="custom-tab">
                  <span>개인</span>
                  <v-badge
                    :class="{ 'badge-selected': tab === 'three' }"
                    text-color="#656ae6"
                    color="#F5F5FC"
                    inline
                    :content="countPersonalSchedule"
                    rounded="0"
                  ></v-badge>
                </v-tab>
                <v-tab value="four" class="custom-tab">
                  <span>팀</span>
                  <v-badge
                    :class="{ 'badge-selected': tab === 'four' }"
                    text-color="#656ae6"
                    color="#F5F5FC"
                    inline
                    :content="countGroupSchedule"
                    rounded="0"
                  ></v-badge>
                </v-tab>
              </v-tabs>
            </div>
          </div>

          <v-virtual-scroll :items="currentItems" height="450px" item-height="48">
            <template v-slot:default="{ item }">
              <InviteNotification v-if="tab === 'two'" :data="item" />
              <ScheduleNotification
                v-if="tab === 'three' && item.groupName === null"
                :data="item"
              />
              <ScheduleNotification v-if="tab === 'four' && item.groupName !== null" :data="item" />
            </template>
          </v-virtual-scroll>

          <v-divider color="black" length="500px" thickness="1px" />

          <div class="d-flex justify-end ma-2">
            <v-btn color="#656ae6" text="모두읽음" variant="text" />
          </div>
        </v-card>
      </v-menu>
      <v-btn density="compact" stacked variant="plain" class="icon-btn">
        <v-icon>mdi-account-edit-outline</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script setup>
import baseImage from '../../../assets/Ellipse.png'
import ScheduleNotification from '@/components/Notification/ScheduleNotification.vue'
import InviteNotification from '@/components/Notification/InviteNotification.vue'
import { useAuthStore } from '@/store/store'
import { computed, inject, onMounted, ref } from 'vue'

const props = defineProps({
  invitations: Array,
  schedules: Array
})

const tab = ref('one')
const currentItems = computed(() => {
  if (tab.value === 'one') {
    return []
  } else if (tab.value === 'two') {
    return props.invitations
  } else {
    return props.schedules
  }
})

//전체 스케줄 수
const countAll = computed(() => {
  return props.invitations.length + props.schedules.length
})

// groupName이 있는 스케줄 수
const countGroupSchedule = computed(() => {
  return props.schedules.filter((schedule) => schedule.groupName).length
})

// groupName이 없는 스케줄 수
const countPersonalSchedule = computed(() => {
  return props.schedules.filter((schedule) => !schedule.groupName).length
})

const notification = ref(false)
const userInfo = useAuthStore()

const alarmMessageCount = computed(() => {
  return (props.schedules?.length || 0) + (props.invitations?.length || 0)
})
const connect = inject('sse')

onMounted(async () => {
  await userInfo.getUserInfo()
})

const logout = () => {
  console.log('zzz')
  if (connect.value) {
    connect.value.close()
    connect.value = null
  }
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
      .profile-true {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 8px;
    }
    .logout {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 89px;
      height: 34px;
      color: white;
      background-color: #656ae6;
      border-radius: 4px;
    }
  }
  .two {
    margin-left: 10px;
    .icon-btn {
      min-width: auto;
    }
  }
  .custom-tab {
    font-size: 14px;
    font-weight: 500;
  }
}
.custom-tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f6f6f8;
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 16px;
  box-shadow: inset 0 0px 1px rgba(0, 0, 0, 0.5);
}
:deep(.v-tab-item--selected) {
  background-color: white;
  border-radius: 4px !important;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  color: #656ae6;
  font-weight: 700;
}
</style>
