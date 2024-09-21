
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
  <v-container>
    <h2>Login</h2>
    <v-form ref="form">
      <v-text-field
        label="Email"
        append-icon="mdi-account"
        hint="Enter the email associated to your account"
        persistent-hint
        clearable
        v-model="email"
        required
      >
      </v-text-field>
      <v-text-field
        label="ID"
        append-icon="mdi-password"
        hint="Enter the ID associated to your account"
        persistent-hint
        clearable=true
        v-model="id"
        required
      >
      </v-text-field>
      <v-btn class="mt-2" type="submit" block @click="validate">Login</v-btn>
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
  }),
  methods: {
    validate(){
      if(this.email != null && this.id != null){
        window.console.log("Login Received - user: ", this.user, ", id: ", this.id);
        if(this.email == "ex@gmail.com" && this.id != 1234){
          window.console.log("Login Successful");
        }
      }
      else{
        window.console.log("Login Failed");
      }
    }
  },

  // props: [],
};
</script>

<style scoped>
.login-view {
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
}
</style>
