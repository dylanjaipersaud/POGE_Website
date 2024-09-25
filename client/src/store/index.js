import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    role: 0,
    user: null,
    customer_items: [],
    game_items: [],
  },

  getters: {
    role: state => state.role,
    user: state => state.user,
    customer_items: state => state.customer_items,
    game_items: state => state.game_items,
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

    get_games(state) {
      state.customer_items =
        axios.get("http://localhost:3030/Games/")
          .then((res) => {
            console.log(res);
            this.state.game_items = res.data;
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

    getGames({ commit }) {
      commit('get_games')
    },
  },
})

export default store;
