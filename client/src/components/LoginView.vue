<!-- eslint-disable space-before-function-paren -->
<!-- eslint-disable semi -->
<template>
  <div class="login-view">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Email</label>
        <input type="text" v-model="email" id="username" required />
      </div>
      <div>
        <label for="email">Account ID</label>
        <input type="email" v-model="id" id="email" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
// import { ref, defineEmits } from 'vue'

// const username = ref('')
// const email = ref('')
// const emit = defineEmits(['login'])

// function login () {
//   emit('login', username.value, email.value)
// }
export default {
  data: () => ({
    email: null,
    id: 0
  }),

  props: []
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
