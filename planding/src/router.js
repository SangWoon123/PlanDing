import { createWebHistory, createRouter } from 'vue-router'
import LoginPage from './components/LoginComponent/LoginPage.vue'
import LoginProgress from './components/LoginComponent/LoginProgress.vue'
import MainPage from './components/ListPage/MainContent/MainPage.vue'
import GroupPage from './components/ListPage/Information/GroupPage.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/LoginProgressPage', component: LoginProgress },
    { path: '/planding', component: MainPage },
    { path: '/group/:groupCode', component: GroupPage }
  ]
})

export default router
