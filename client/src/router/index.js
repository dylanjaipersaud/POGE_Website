import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
import LoginView from '../components/LoginView.vue'
import HomeView from "../components/HomeView.vue"

const routes = [
  // { path: '/', component: App },
  { path: '/', name: HomeView, component: HomeView},
  { path: '/LoginView', name: LoginView, component: LoginView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
