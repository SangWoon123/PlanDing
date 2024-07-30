import { createWebHashHistory, createRouter } from 'vue-router'
import LoginPage from './components/LoginComponent/LoginPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/login', component: LoginPage }]
})

export default router
