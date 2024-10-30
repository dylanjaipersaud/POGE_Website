
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
      <!-- {{ email }}
      <br />
      {{ id }}
      <br />
      {{ employee_items }}
      <br />
      {{ role }}
      <br />
      {{ user }} -->
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
    // email: "joshypoo@poge.com",
    // id: 8375,

    // Tech Lead login test
    email: "gamermaster@poge.com",
    id: 8829,

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
    employee_items() {
      return this.$store.getters.employee_items;
    },
    customer_items() {
      return this.$store.getters.customer_items;
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
    this.$store
      .dispatch("getEmployees")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store
      .dispatch("getCustomers")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // Determines if the account exists by comparing the id to
    // the elements in 'login_items'
    // If valid, the role gets determined
    // If it is not valid, the id is cleared to fail validation and
    // the user is prompted their authentication failed
    accountLookUp() {
      //Find the user's login details based on their id
      let holdUser = { email: "", id: 0 };
      for (let i = 0; i < this.login_items.length; i++) {
        if (this.id == this.login_items[i].id) {
          holdUser = this.login_items[i];
        }
      }

      // Alternative method used to find login details
      // const holdUser = Array(this.login_items).find((item) => {

      //   return item.id == this.id;
      // });

      // If the user's id was matched, match the email
      if (holdUser.email == this.email) {
        // alert("User Authenticated");
        this.$store.commit("update_user", holdUser);
        this.getUserRole();
      }
      // If the emails do not match, the user is invalidated
      else {
        this.invalidAuth = true;
        this.id = null;
        this.$refs.form.validate();
      }
    },

    // Obtains the user's role determined by their email address
    // If it does not contain 'poge.com' they are a customer and
    // role is set to 3
    // If it does match, the user's id is compared to manager id's
    // If there is a match between IDs, the user is a tech lead
    // and role is set to 1
    // If there is no match, the user is an employee and role is
    // set to 2
    getUserRole() {
      let holdData = {
        user: null,
        role: 0,
      };
      const empEmail = "poge.com";
      const emailAddress = this.email.substring(this.email.indexOf("@") + 1);

      // Checking if the user is a customer
      if (empEmail != emailAddress) {
        holdData.user = this.customer_items.find((item) => {
          return item.id == this.id;
        });
        holdData.role = 3;
        this.$store.dispatch("login", holdData);
        this.$router.push("/CustomerAccView");
      }
      // If the user is not a customer, they are an employee
      else {
        holdData.role = 2;
        holdData.user = this.employee_items.find((item) => {
          return item.id == this.id;
        });
        const holdLead = this.team_items.find((item) => {
          return item.manager == holdData.user.id;
        });

        // Checking if the employee is a tech lead
        if (holdLead != undefined) {
          holdData.role = 1;
          this.$store.dispatch("login", holdData);
          this.$router.push("/LeadAccView");
        }

        // Returning the user as an employee or lead
        this.$store.dispatch("login", holdData);
        this.$router.push("/EmployeeAccView");
      }
    },
  },
};
</script>

<style scoped>
.login-con {
  display: flex;
  align-items: center;
  flex-direction: column;

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
