import { createWebHistory, createRouter } from 'vue-router'
import LoginPage from './components/login/LoginPage.vue'
import LoginProgress from './components/login/LoginProgress.vue'
import Lobby from './components/loby/Lobby.vue'
import GroupPage from './components/main/group/GroupPage.vue'
import PersonalPage from './components/main/personal/PersonalPage.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/LoginProgressPage', component: LoginProgress },
    { path: '/planding', component: Lobby },
    { path: '/group/:groupCode', component: GroupPage },
    { path: '/personal', component: PersonalPage }
  ]
})

export default router
