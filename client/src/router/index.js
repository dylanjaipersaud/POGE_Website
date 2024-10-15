import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import HomeView from '../components/HomeView.vue';
import EmployeeAccView from '../components/EmployeeAccView.vue';
import LeadAccView from '../components/LeadAccView.vue';
import CustomerAccView from '../components/CustomerAccView.vue';
import GameDetails from '../components/gameDetails.vue'; 

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/employee', name: 'Employee', component: EmployeeAccView },
  { path: '/lead', name: 'Lead', component: LeadAccView },
  { path: '/customer', name: 'Customer', component: CustomerAccView },
  { path: '/game/:id', name: 'GameDetails', component: GameDetails, props: true }, 
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

