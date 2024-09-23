<template>
  <v-container class="account-con">
    <h2>Employee Account Information</h2>
    <v-form ref="form">
      <v-text-field
        class="form-opt"
        label="Email"
        prepend-icon="mdi-account"
        hint="Edit your email address"
        :rules="rules"
        persistent-hint
        clearable
        v-model="email"
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
        v-model="id"
        required
      >
      </v-text-field>

      <v-btn type="submit" class="update-btn" @click="handleUpdate">Update Information</v-btn>
    </v-form>
    <router-link to="/">
      <v-btn class="back-btn">Cancel</v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: null,
    id: null,
    rules: [
      (value) => !!value || "Field cannot be empty!",
    ],
  }),
  methods: {
    handleUpdate() {
      if (this.email && this.id) {
        // Process the update here, e.g., API call
        console.log("Updated Information - Email:", this.email, ", ID:", this.id);
        alert("Information updated successfully!");
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
};
</script>

<style scoped>
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
.update-btn, .back-btn {
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


