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

      <button @click="logout" class="logout" type="button">로그아웃</button>
    </div>

    <div class="two">
      <v-btn density="compact" stacked variant="plain" class="icon-btn">
        <v-icon>mdi-account-edit-outline</v-icon>
      </v-btn>
      <v-menu location="end" offset-y :close-on-content-click="false">
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

        <v-card width="450" height="600" rounded="xl" class="notification-card pa-2">
          <v-card-title class="notification-title">
            <span>Notifications</span>
            <v-btn variant="text" color="#656ae6">모두읽음</v-btn>
          </v-card-title>

          <div class="d-flex justify-center">
            <div class="custom-tabs">
              <v-tabs
                v-model="tab"
                height="30px"
                density="compact"
                fixed-tabs
                slider-color="#656ae6"
              >
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

          <v-virtual-scroll :items="currentItems" height="400px" item-height="48">
            <template v-slot:default="{ item }">
              <InviteNotification v-if="tab === 'two'" :data="item" />
              <ScheduleNotification
                v-if="tab === 'three' && item.groupName === null"
                :data="item"
              />
              <ScheduleNotification v-if="tab === 'four' && item.groupName !== null" :data="item" />
            </template>
          </v-virtual-scroll>

          <v-divider color="#9DA2FF" length="100%" thickness="2px"></v-divider>

          <div class="d-flex justify-center mt-5">
            <v-btn width="200px" color="#656ae6" text="close" />
          </div>
        </v-card>
      </v-menu>
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

  .notification-card {
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .notification-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .custom-tab {
    font-size: 14px;
    font-weight: 500;
  }
}
.custom-tabs {
  background-color: #f6f6f8;
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
:deep(.v-tab-item--selected) {
  background-color: white;
  border-radius: 4px !important;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  color: #656ae6;
  font-weight: 700;
}
</style>
