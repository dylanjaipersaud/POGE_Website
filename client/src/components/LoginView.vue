
<template>
  <v-container v-if="role == 0" class="login-con">
    <h2>Sign into your POGE Account</h2>
    <v-card v-if="invalidAuth" class="invalid-card" flat>
      <h4>Authentication failed!</h4>
    </v-card>
    <v-form class="form-con" ref="form" lazy>
      <v-text-field
        class="form-opt-email"
        label="Email"
        prepend-icon="mdi-account-box"
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
        type="password"
        persistent-hint
        clearable
        v-model="id"
        required
      >
      </v-text-field>
      {{ email }}
      <br />
      {{ id }}
      <br />
      {{ login_items }}
      <br />
      {{ role }}
      <br />
      {{ user }}
      <v-btn type="submit" class="login-btn" @click="accountLookUp"
        >Login</v-btn
      >
    </v-form>
  </v-container>
  <v-container v-else>
    User logged in - {{ user }}
    <br />
    Role - {{ role }}
  </v-container>
</template>

<script>
// import { indexOf } from 'core-js/core/array';

// import axios from "axios";

export default {
  data: () => ({
    // Customer login test
    // email: "mako1902@ymail.com",
    // id: 6590559,

    // Employee login test
    email: "goodneighbor@poge.com",
    id: 1092,

    // Tech Lead login test
    // email: "mjersey@poge.com",
    // id: 8422,


    // holdCustomer: {},
    rules: [
      (value) => {
        if (value) return true;

        return "Field cannot be empty!";
      },
    ],
    invalidAuth: false,
  }),
  computed: {
    login_items() {
      return this.$store.getters.login_items;
    },
    team_items() {
      return this.$store.getters.team_items;
    },
    role() {
      return this.$store.state.role;
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.$store
      .dispatch("getLogins")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      this.$store
      .dispatch("getTeams")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    accountLookUp() {
      const holdUser = this.login_items.find((item) => {
        console.log(item);
        return item.id == this.id;
      });
      if (holdUser.email == this.email) {
        alert("User Authenticated");
        this.$store.commit("update_user", holdUser);
        this.getUserRole();
      } else{
        this.invalidAuth = true;
        this.id = null;
        this.$refs.form.validate();
      };
    },

    getUserRole() {
      const empEmail = "poge.com";
      const emailAddress = this.email.substring(this.email.indexOf("@") + 1);
      if (empEmail != emailAddress) {
        this.$store.commit("update_role", 1);
      } else {
        const holdLead = this.team_items.find((item) => {
            return item.manager == this.id;
          } )
          console.log(holdLead);
        if (holdLead != undefined) {
          this.$store.commit("update_role", 3);
        } else this.$store.commit("update_role", 2);
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
  padding-top: 20px;
  padding-bottom: 20px;
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
.form-opt-email {
  padding-top: 30px;
  padding-bottom: 15px;
  min-width: 20rem;
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
