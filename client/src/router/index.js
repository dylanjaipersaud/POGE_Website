import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import HomeView from '../components/HomeView.vue';
import EmployeeAccView from '../components/EmployeeAccView.vue';
import LeadAccView from '../components/LeadAccView.vue';
import CustomerAccView from '../components/CustomerAccView.vue';
import GameView from '../components/GameView.vue'; 

const routes = [
  { path: '/', name: HomeView, component: HomeView},
  { path: '/LoginView', name: LoginView, component: LoginView },
  { path: '/EmployeeAccView', name: EmployeeAccView, component: EmployeeAccView },
  { path: '/LeadAccView', name: LeadAccView, component: LeadAccView },
  { path: '/CustomerAccView', name: CustomerAccView, component: CustomerAccView },
  { path: '/GameView/:name', name: 'GameView', component: GameView, props: true }, 
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

