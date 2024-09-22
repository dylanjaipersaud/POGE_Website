<template>
  <v-container class="main-con">
    <NavBar />
  <router-view></router-view>
  </v-container>
  <!-- <header style="display: flex; align-items: center; margin-right: 50px; background-color: #121212; position: fixed; width: 100%;">
    <img alt="Vue logo" class="logo" src="./assets/pogchamp-twitch.jpg" width="125" height="125" />
    

    <nav class="menu" style="margin-left: auto;">
      <ul style="list-style: none; display: flex; ">
        <li><button @click="showGameList" style="background: none; border: none; color: #fff; text-decoration: none;">Home</button></li>
        <li><button style="background: none; border: none; color: #fff; text-decoration: none;">Shop</button></li>
        <li><button style="background: none; border: none; color: #fff; text-decoration: none;">About</button></li>
        <li><button style="background: none; border: none; color: #fff; text-decoration: none;">Contact</button></li>
        <li v-if="!isLoggedIn"><button style="background: none; border: none; color: #fff; text-decoration: none;" @click="showLogin">Login</button></li>
        <li v-if="isLoggedIn"><button style="background: none; border: none; color: #fff; text-decoration: none;" @click="handleLogout">Logout</button></li>
      </ul>
    </nav>
  </header>
  

  <main style="padding-top: 150px; background-color: #1e1e1e; color: #fff;">
    <div class="wrapper" style="display: flex; flex-direction: column; align-items: center;">
      <h2 v-if="isLoggedIn && !showingAccount">Available Games</h2>

      <div v-if="showingAccount">
        <AccountView :userInfo="userInfo" @onUpdate="updateUserInfo" />
        <p v-if="successMessage">{{ successMessage }}</p>
      </div>

      <div v-if="!showingAccount && !showingLogin && showGames">
        <img src="./assets/B30FDC786E112747191946B2E3C783731F810FA0.gif" alt="Promotional GIF" style="max-width: 100%; height: auto; margin-bottom: 2rem;" />
        <div class="game-list" style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%;">
          <GameItem v-for="game in games" :key="game.title" :game="game" />
        </div>
      </div>

      <LoginView v-if="showingLogin" @login="handleLogin" />
    </div>
  </main> -->
</template>
<script setup>
import { ref, onMounted } from 'vue'
import GameItem from './components/GameItem.vue'
import LoginView from './components/LoginView.vue'
import AccountView from './components/AccountView.vue'
import usersData from '@/assets/MOCK_DATA.json' // Import the JSON data
import NavBar from './components/NavBar.vue'

// Set initial states
const isLoggedIn = ref(false)
const showingLogin = ref(false)
const showingAccount = ref(false)
const showGames = ref(true)
const successMessage = ref('')
const userInfo = ref({
  username: '',
  email: ''
})
const games = [
  { title: 'Game 1', price: 19.99, image: './assets/game1.jpg' },
  { title: 'Game 2', price: 29.99, image: './assets/game2.jpg' },
  { title: 'Game 3', price: 39.99, image: './assets/game3.jpg' },
  { title: 'Game 4', price: 49.99, image: './assets/game4.jpg' },
  { title: 'Game 5', price: 59.99, image: './assets/game5.jpg' }
]

const users = ref([])

onMounted(() => {
  users.value = usersData
})

function showLogin () {
  showingLogin.value = true
}

function handleLogin (username, email) {
  const user = users.value.find(user => user.username === username && user.email === email)

  if (user) {
    isLoggedIn.value = true
    userInfo.value = { username, email }
    showingLogin.value = false
    showingAccount.value = true
    successMessage.value = '200: Login successful'
  } else {
    successMessage.value = 'Error: Invalid username or email.'
  }
}

function handleLogout () {
  isLoggedIn.value = false
  showingAccount.value = false
  showGames.value = true
  successMessage.value = ''
}

function updateUserInfo (updatedInfo) {
  userInfo.value = updatedInfo
  successMessage.value = '200: Account information updated successfully'
}

function showGameList () {
  showGames.value = true
  showingAccount.value = false
  successMessage.value = ''
}
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
 .main-con{
  padding: 0%;
  margin: 0%;
  height: 100%;
 }
</style>
