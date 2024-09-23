import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
import LoginView from '../components/LoginView.vue'
import HomeView from "../components/HomeView.vue"
import AccountView from '../components/AccountView.vue';
import AccountView2 from '../components/AccountView2.vue';
const routes = [
  // { path: '/', component: App },
  { path: '/', name: HomeView, component: HomeView},
  { path: '/LoginView', name: LoginView, component: LoginView },
  { path: '/AccountView', name: AccountView, component: AccountView },
  { path: '/AccountView2', name: AccountView2, component: AccountView2 },

  ,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
