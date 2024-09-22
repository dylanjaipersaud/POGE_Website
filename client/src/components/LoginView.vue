
<template>
  <!-- <div class="login-view">
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
  </div> -->
  <v-container class="login-con">
    <h2>Sign into your POGE Account</h2>
    <v-card v-if="invalidAuth" class="invalid-card" flat>
      <h4>Authentication failed!</h4>
    </v-card>
    <v-form class="form-con" ref="form">
      <v-text-field
        class="form-opt"
        label="Email"
        prepend-icon="mdi-account"
        hint="Enter the email associated to your account"
        :rules="rules"
        persistent-hint
        clearable
        v-model="email"
        required
      >
      </v-text-field>
      <v-text-field
        class="form-opt"
        label="ID"
        prepend-icon="mdi-lock"
        hint="Enter the ID associated to your account"
        :rules="rules"
        persistent-hint
        clearable
        v-model="id"
        required
      >
      </v-text-field>
      <v-btn type="submit" class="login-btn" @click="validateLogin">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
/* eslint-disable */
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
    id: null,
    rules: [
      (value) => {
        if (value) return true;

        return "Field cannot be empty!";
      },
    ],
    invalidAuth: false,
  }),
  methods: {
    validateLogin() {
      if (this.email != null && this.id != null) {
        window.console.log(
          "Login Received - user: ",
          this.user,
          ", id: ",
          this.id
        );
        if (this.email == "ex@gmail.com" && this.id != 1234) {
          alert("Login Successful");
        }
      } else {
        this.invalidAuth = true;
        alert("Login Failed");
      }
    },
  },

  // props: [],
};
</script>

<style scoped>
.login-con {
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: red; */
  padding-top: 10%;
  height: 50vh;
  justify-content: space-evenly;
}
.invalid-card {
  display: flex;
  justify-content: center;
  color: rgb(245, 60, 60);
  width: max-content;
  padding: 20px;
}
.form-con {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-view {
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
}
.form-opt {
  padding-bottom: 15px;
  min-width: 20rem;
}
.login-btn {
  margin-top: 10px;
  width: min-content;
}
</style>
