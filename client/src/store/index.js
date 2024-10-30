import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    role: localStorage.getItem('role') || 0,
    user: JSON.parse(localStorage.getItem('user')) || {},
    cart_items: JSON.parse(localStorage.getItem('cart')) || [],
    customer_items: [],
    employee_items: [],
    login_items: [],
    game_items: [],
    team_items: [],
    update_items: [],
    development_items: [],
    forum_items: [],
    purchase_items: [],
  },

  getters: {
    role: state => state.role,
    user: state => state.user,
    cart_items: state => state.cart_items,
    customer_items: state => state.customer_items,
    employee_items: state => state.employee_items,
    login_items: state => state.login_items,
    game_items: state => state.game_items,
    team_items: state => state.team_items,
    update_items: state => state.update_items,
    development_items: state => state.development_items,
    forum_items: state => state.forum_items,
    purchase_items: state => state.purchase_items,
  },

  mutations: {
    update_user(state, newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
      state.user = newUser;
      console.log("Updated user");
    },

    update_role(state, newRole) {
      localStorage.setItem('role', newRole)
      state.role = newRole;
    },

    set_cart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart_items))
    },

    add_cart(state, item) {
      state.cart_items.push(item);
      localStorage.setItem('cart', JSON.stringify(state.cart_items))
    },

    remove_cart(state, item) {
      for (let i = 0; i < state.cart_items.length; i++) {
        if (state.cart_items[i].game === item.game && String(state.cart_items[i].store).trim() === String(item.store).trim())
          state.cart_items.splice(i)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart_items))
    },

    clear_cart(state) {
      state.cart_items = [];
      localStorage.removeItem('cart')
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

    get_logins(state) {
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

    set_games(state, items) {
      state.game_items = items
    },

    get_teams(state) {
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

    set_updates(state, items) {
      state.update_items = items;
    },

    set_developments(state, items) {
      state.development_items = items;
    },

    get_forums(state) {
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

    set_purchases(state, items) {
      state.purchase_items = items
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
    login({ commit }, newData) {
      console.log(newData)
      commit('update_user', newData.user)
      commit('update_role', newData.role)
    },

    logout({ commit }) {
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      commit('update_user', {})
      commit('update_role', 0)
    },

    setCart({ commit }) {
      commit('set_cart')
    },

    addCart({ commit }, item) {
      commit('add_cart', item)
    },

    removeCart({ commit }, item) {
      commit('remove_cart', item)
    },

    clearCart({ commit }) {
      commit('clear_cart')
    },

    getCustomers({ commit }) {
      commit('get_customers')
    },

    getEmployees({ commit }) {
      commit('get_employees')
    },

    getLogins({ commit }) {
      commit('get_logins')
    },

    getGames({ commit }) {
      return axios.get("http://localhost:3030/Games/")
        .then((res) => {
          console.log(res);
          commit('set_games', res.data)
        })
        .catch((err) => {
          console.err(err)
        })

    },

    getTeams({ commit }) {
      commit('get_teams')
    },

    async getUpdates({ commit }) {
      return await axios.get("http://localhost:3030/Updates/")
          .then((res) => {
            console.log(res);
            commit('set_updates', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },

    async getDevelopments({ commit }) {
      return await axios.get("http://localhost:3030/Developments/")
        .then((res) => {
          console.log(res);
          commit('set_developments', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getForums({ commit }) {
      commit('get_forums')
    },

    async getPurchases({ commit }) {
      return axios.get("http://localhost:3030/Purchases/")
        .then((res) => {
          console.log(res);
          commit('set_purchases', res.data)
        })
        .catch((err) => {
          console.log(err)
        })

    },

  },
})

export default store;
