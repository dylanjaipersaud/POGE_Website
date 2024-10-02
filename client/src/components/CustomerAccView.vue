<template>
  <v-container>
    <h3>Customer Account Information</h3>
    <div class="header-con">
      <h2>Welcome {{ user.first_name }}</h2>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="editUser">Edit</v-btn>
        <v-btn @click="logoutUser">Logout</v-btn>
      </div>
    </div>
    <v-form ref="form" class="form-con" v-if="!editMode">
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
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Account ID"
        prepend-icon="mdi-lock"
        hint="Edit your account ID"
        :rules="rules"
        persistent-hint
        clearable
        disabled
        v-model="newUserData.id"
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Account ID"
        prepend-icon="mdi-pencil"
        hint="Edit your account name"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.account_name"
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Account ID"
        prepend-icon="mdi-pencil"
        hint="Edit your first name"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.first_name"
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Account ID"
        prepend-icon="mdi-pencil"
        hint="Edit your last name"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.last_name"
        required
      >
      </v-text-field>

      <v-row justify="center">
        <v-btn type="submit" class="update-btn" @click="handleUpdate"
        >Update Information</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="back-btn">Cancel</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
  
  <script>
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
  },
  mounted(){
    this.newUserData = this.user;
  },
  methods: {
    handleUpdate() {
      if (this.email && this.id) {
        // Process the update here, e.g., API call
        console.log(
          "Updated Information - Email:",
          this.email,
          ", ID:",
          this.id
        );
        alert("Information updated successfully!");
      } else {
        alert("Please fill in all fields.");
      }
    },
    editUser() {},
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
  
  
  