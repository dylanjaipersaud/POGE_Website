import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    role: localStorage.getItem('role') || 0,
    user: JSON.parse(localStorage.getItem('user')) || {}, 
    customer_items: [],
    employee_items: [],
    login_items: [],
    game_items: [],
    team_items: [],
    update_items: [],
    forum_items: [],
    purchase_items: [],
  },

  getters: {
    role: state => state.role,
    user: state => state.user,
    customer_items: state => state.customer_items,
    employee_items: state => state.employee_items,
    login_items: state => state.login_items,
    game_items: state => state.game_items,
    team_items: state => state.team_items,
    update_items: state => state.update_items,
    forum_items: state => state.forum_items,
    purchase_items: state => state.purchase_items,
  },

  mutations: {
    update_user(state, newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
      state.user = newUser;
      console.log("Updated user")
    },

    update_role(state, newRole) {
      localStorage.setItem('role', newRole)
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
            this.state.employee_items = res.data;
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
    },

    get_updates(state){
      state.update_items = 
      axios.get("http://localhost:3030/Updates/")
          .then((res) => {
            console.log(res);
            this.state.update_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    get_forums(state){
      state.forum_items = 
      axios.get("http://localhost:3030/Forums/")
          .then((res) => {
            console.log(res);
            this.state.forum_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    get_purchases(state){
      state.purchase_items = 
      axios.get("http://localhost:3030/Purchases/")
          .then((res) => {
            console.log(res);
            this.state.purchase_items = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
    },

    // put_employee(state, newData){
    //   axios.put("http://localhost:3030/Teams/", newData)
    //   .then((res) => {
    //     console.log(res);
    //     this.state.team_items = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
  },

  actions: {
    login({ commit }, newData){
      console.log(newData)
      commit('update_user', newData.user)
      commit('update_role', newData.role)
    },

    logout({ commit }){
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      commit('update_user', {})
      commit('update_role', 0)
    },

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

    getUpdates({ commit }) {
      commit('get_updates')
    },

    getForums({ commit }) {
      commit('get_forums')
    },

    getPurchases({ commit }) {
      commit('get_purchases')
    },

  },
})

export default store;
