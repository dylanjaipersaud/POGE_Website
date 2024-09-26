import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    role: 0,
    user: null,
    customer_items: [],
    employee_items: [],
    login_items: [],
    game_items: [],
    team_items: [],
  },

  getters: {
    role: state => state.role,
    user: state => state.user,
    customer_items: state => state.customer_items,
    employee_items: state => state.employee_items,
    login_items: state => state.login_items,
    game_items: state => state.game_items,
    team_items: state => state.team_items,
  },

  mutations: {
    update_user(state, newUser) {
      state.user = newUser;
    },

    update_role(state, newRole) {
      state.role = newRole;
    },

    get_customers(state) {
      state.customer_items =
        axios.get("http://localhost:3030/Customers/")
          .then((res) => {
            console.log(res);
            this.state.customer_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    get_employees(state) {
      state.employee_items =
        axios.get("http://localhost:3030/Employees/")
          .then((res) => {
            console.log(res);
            this.state.employees_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    get_logins(state){
      state.login_items =
        axios.get("http://localhost:3030/LoginList/")
          .then((res) => {
            console.log(res);
            this.state.login_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    get_games(state) {
      state.game_items =
        axios.get("http://localhost:3030/Games/")
          .then((res) => {
            console.log(res);
            this.state.game_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    get_teams(state){
      state.team_items = 
      axios.get("http://localhost:3030/Teams/")
          .then((res) => {
            console.log(res);
            this.state.team_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    }
  },

  actions: {
    getCustomers({ commit }) {
      commit('get_customers')
    },

    getEmployees({ commit }) {
      commit('get_employees')
    },

    getLogins({ commit }){
      commit('get_logins')
    },

    getGames({ commit }) {
      commit('get_games')
    },

    getTeams({ commit }) {
      commit('get_teams')
    },

  },
})

export default store;
