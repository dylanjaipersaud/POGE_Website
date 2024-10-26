<template>
  <v-container>
    <h3>Customer Account Information</h3>
    <div class="header-con">
      <h2>Welcome {{ user.first_name }}</h2>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="editUser()">Edit</v-btn>
        <v-btn @click="logoutUser()">Logout</v-btn>
      </div>
    </div>
    <v-form ref="form" class="form-con" v-if="editMode">
      <v-text-field
        class="form-opt"
        label="Email"
        prepend-icon="mdi-account"
        hint="Edit your email address"
        :rules="rules"
        persistent-hint
        clearable
        disabled
        v-model="newUserData.email"
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="ID"
        prepend-icon="mdi-lock"
        hint="Edit your account ID"
        :rules="rules"
        persistent-hint
        clearable
        disabled
        v-model="newUserData.id"
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Account Name"
        prepend-icon="mdi-pencil"
        :rules="rules"
        clearable
        disabled
        v-model="newUserData.account_name"
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="First Name"
        prepend-icon="mdi-pencil"
        hint="Edit your first name"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.first_name"
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Last Name"
        prepend-icon="mdi-pencil"
        hint="Edit your last name"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.last_name"
      >
      </v-text-field>

        <v-btn type="submit" class="update-btn" @click="handleUpdate()"
        >Update Information</v-btn
      >
    </v-form>
    <div v-if="!editMode">
      <div class="form-con">
        <v-row class="form-opt">
          <strong>Email: </strong> &nbsp;
          <p>{{ user.email }}</p>
        </v-row>
        <v-row class="form-opt">
          <strong>ID: </strong> &nbsp;
          <p>{{ user.id }}</p>
        </v-row>
        <v-row class="form-opt">
          <strong>Account Name: </strong> &nbsp;
          <p>{{ user.account_name }}</p>
        </v-row>
      </div>
      <br>
      <h4>Purchases</h4>
      <v-expansion-panels
        style="max-width: 50%"
        class="my-4"
        variant="inset"
      >
        <v-expansion-panel
          v-for="purchase in getPurchases()"
          :key="purchase.invoice"
          :title="purchase.game"
        >
          <v-expansion-panel-text>
            <strong>Details</strong>
              <p>{{ purchase.game }} - {{ purchase.store }}</p>
              <v-spacer></v-spacer>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>
  
  <script>
  import axios from 'axios';
export default {
  data: () => ({
    editMode: false,
    newUserData: {
      email: "",
      id: 0,
      account_name: "",
      first_name: "",
      last_name: ""
    },
    email: null,
    id: null,
    rules: [(value) => !!value || "Field cannot be empty!"],
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    purchase_items(){
      return this.$store.state.purchase_items;
    }
  },
  mounted(){
    this.newUserData = this.user;
    this.$store
      .dispatch("getPurchases")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    editUser() {
      this.newUserData = {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        account_name: this.user.account_name,
      };
      this.editMode = !this.editMode;
    },

    handleUpdate(){
      axios
        .put("http://localhost:3030/Customers", null, {
          params: this.newUserData,
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("update_user", this.newUserData);
          this.$store
            .dispatch("getCustomers")
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          this.editMode = !this.editMode;
        })
        .catch((err) => {
          console.log(err.toJSON());
        });
    },

    getPurchases(){
      let holdPurchases = [];
      for (let i = 0; i < this.purchase_items.length; i++) {
        if (
          String(this.user.account_name).toLowerCase() ===
          this.purchase_items[i].account.toLowerCase()
        )
          holdPurchases.push(this.purchase_items[i]);
      }
      return holdPurchases;
    },

    logoutUser() {
      if (confirm("Would you like to logout?")) {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/LoginView");
        });
      }
    },
  },
};
</script>
  
  <style scoped>
.header-con {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
}
.form-con {
  max-width: 25%;
}
.account-con {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 10%;
  height: 50vh;
  justify-content: space-evenly;
}
.form-opt {
  padding-bottom: 15px;
  min-width: 20rem;
}
.update-btn,
.back-btn {
  margin-top: 10px;
  width: min-content;
}
.account-view {
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
}
</style>
  
  
  