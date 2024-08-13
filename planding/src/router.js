import { createWebHistory, createRouter } from 'vue-router'
import LoginPage from './components/LoginComponent/LoginPage.vue'
import LoginProgress from './components/LoginComponent/LoginProgress.vue'
import Lobby from './components/MainContent/Lobby.vue'
import MainContent from './components/MainContent/MainContent.vue'
import GroupPage from './components/MainContent/group/GroupPage.vue'
import PersonalPage from './components/MainContent/personal/PersonalPage.vue'
import NotificationTemplate from './components/Notification/ScheduleNotification.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/LoginProgressPage', component: LoginProgress },
    { path: '/planding', component: Lobby },
    { path: '/group/:groupCode', name: 'test', component: GroupPage },
    { path: '/personal', component: PersonalPage },
    { path: '/modal', component: NotificationTemplate },
    { path: '/test', component: MainContent }
  ]
})

export default router
