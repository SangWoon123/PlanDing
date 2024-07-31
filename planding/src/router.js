import { createWebHistory, createRouter } from 'vue-router'
import LoginPage from './components/LoginComponent/LoginPage.vue'
import LoginProgress from './components/LoginComponent/LoginProgress.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/LoginProgressPage', component: LoginProgress }
  ]
})

export default router
