import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
import LoginView from '../components/LoginView.vue'
import HomeView from "../components/HomeView.vue"
import EmployeeAccView from '../components/EmployeeAccView.vue';
import LeadAccView from '../components/LeadAccView.vue';
import CustomerAccView from '../components/CustomerAccView.vue'
const routes = [
  // { path: '/', component: App },
  { path: '/', name: HomeView, component: HomeView},
  { path: '/LoginView', name: LoginView, component: LoginView },
  { path: '/EmployeeAccView', name: EmployeeAccView, component: EmployeeAccView },
  { path: '/LeadAccView', name: LeadAccView, component: LeadAccView },
  { path: '/CustomerAccView', name: CustomerAccView, component: CustomerAccView },
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
