<template>
  <v-container class="main-con">
    <NavBar />
    <router-view></router-view>
  </v-container>
</template>
<script >
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  data: () => ({}),
};
// import { ref, onMounted } from 'vue'
// import GameItem from './components/GameItem.vue'
// import LoginView from './components/LoginView.vue'
// import AccountView from './components/AccountView.vue'
// import usersData from '@/assets/MOCK_DATA.json' // Import the JSON data

// Set initial states
// const isLoggedIn = ref(false)
// const showingLogin = ref(false)
// const showingAccount = ref(false)
// const showGames = ref(true)
// const successMessage = ref('')
// const userInfo = ref({
//   username: '',
//   email: ''
// })
// const games = [
//   { title: 'Game 1', price: 19.99, image: './assets/game1.jpg' },
//   { title: 'Game 2', price: 29.99, image: './assets/game2.jpg' },
//   { title: 'Game 3', price: 39.99, image: './assets/game3.jpg' },
//   { title: 'Game 4', price: 49.99, image: './assets/game4.jpg' },
//   { title: 'Game 5', price: 59.99, image: './assets/game5.jpg' }
// ]

// const users = ref([])

// onMounted(() => {
//   users.value = usersData
// })

// function showLogin () {
//   showingLogin.value = true
// }

// function handleLogin (username, email) {
//   const user = users.value.find(user => user.username === username && user.email === email)

//   if (user) {
//     isLoggedIn.value = true
//     userInfo.value = { username, email }
//     showingLogin.value = false
//     showingAccount.value = true
//     successMessage.value = '200: Login successful'
//   } else {
//     successMessage.value = 'Error: Invalid username or email.'
//   }
// }

// function handleLogout () {
//   isLoggedIn.value = false
//   showingAccount.value = false
//   showGames.value = true
//   successMessage.value = ''
// }

// function updateUserInfo (updatedInfo) {
//   userInfo.value = updatedInfo
//   successMessage.value = '200: Account information updated successfully'
// }

// function showGameList () {
//   showGames.value = true
//   showingAccount.value = false
//   successMessage.value = ''
// }
</script>

<style scoped>
/* .game-item {
  background-color: #222;
  color: #fff;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  margin: 1rem;
} */
.main-con {
  padding: 0px;
  margin: 0px;
  height: 100%;
  min-width: 100%;
}
</style>
