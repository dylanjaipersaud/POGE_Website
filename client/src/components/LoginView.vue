<template>
  <div class="login-view">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const username = ref('');
const email = ref('');
const emit = defineEmits(['login']);

function login() {
  emit('login', username.value, email.value);
}
</script>

<style scoped>
.login-view {
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
}
</style>
