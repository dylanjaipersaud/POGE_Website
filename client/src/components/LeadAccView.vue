<template>
  <v-container>
    <h3>Tech Lead Account Information</h3>
    <div class="header-con">
      <h2>Welcome {{ user.first_name }}</h2>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="editUser">Edit</v-btn>
        <v-btn @click="logoutUser">Logout</v-btn>
      </div>
    </div>
    <v-form ref="form" class="form-con" v-if="editMode">
      <v-text-field
        class="form-opt"
        label="Email"
        prepend-icon="mdi-account"
        hint="Edit your email address"
        :rules="rules"
        clearable
        disabled
        v-model="user.email"
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Account ID"
        prepend-icon="mdi-lock"
        hint="Edit your account ID"
        :rules="rules"
        clearable
        disabled
        v-model="newUserData.id"
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Team"
        prepend-icon="mdi-account-group"
        hint="Edit your team"
        :rules="rules"
        clearable
        disabled
        v-model="newUserData.team_name"
        required
      >
      </v-text-field>

      <v-text-field
        class="form-opt"
        label="Role"
        prepend-icon="mdi-pencil"
        hint="Edit your role"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.role"
        required
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
        required
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
        required
      >
      </v-text-field>
      <v-text-field
        class="form-opt"
        label="Phone Number"
        prepend-icon="mdi-pencil"
        hint="Edit your phone number"
        :rules="rules"
        persistent-hint
        clearable
        v-model="newUserData.phone"
        required
      >
      </v-text-field>
      <v-row class="btn-list" justify="space-evenly">
        <v-btn type="submit" @click="updateUser()">Update Information</v-btn>
        <!-- <v-btn>Cancel</v-btn> -->
      </v-row>
    </v-form>
    <div v-if="!editMode">
      <div class="form-con">
        <v-row class="form-opt">
          <strong>ID: </strong> &nbsp;
          <p>{{ user.id }}</p>
        </v-row>
        <v-row class="form-opt">
          <strong>Role: </strong> &nbsp;
          <p>{{ user.role }}</p>
        </v-row>
        <v-row class="form-opt">
          <strong>Team: </strong> &nbsp;
          <p>{{ user.team_name }}</p>
        </v-row>
      </div>
      <br />
      <h4>Teams</h4>
      <v-expansion-panels
        v-model="selectedTeam"
        style="max-width: 50%"
        class="my-4"
        variant="inset"
      >
        <v-expansion-panel
          v-for="team in team_items"
          :key="team.team_name"
          :title="team.team_name"
          :value="team.team_name"
        >
          <v-expansion-panel-text>
            <strong>Members</strong>
            <v-row
              v-for="emp in getEmployees(team.team_name)"
              :key="emp.id"
              align="center"
              class="emp-row"
            >
              <p>{{ emp.first_name }} {{ emp.last_name }}</p>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="team.manager == emp.id ? true : false"
                size="small"
                @click="reassignEmp(emp)"
                >Re-Assign</v-btn
              >
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card v-if="editTeam">
        <v-card-title
          >Re-assign {{ selectedEmp.first_name }}
          {{ selectedEmp.last_name }}</v-card-title
        >
        <v-card-text>
          <h4>New Team</h4>
          <v-col>
            <v-select
              :items="team_items"
              item-title="team_name"
              item-value="team_name"
              v-model="newTeam"
            ></v-select>
            <v-row>
              <v-btn @click="updateEmpTeam()">Confirm</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
  
  <script>
import axios from "axios";
export default {
  data: () => ({
    editMode: false,
    editTeam: false,
    newUserData: {
      email: "",
      id: 0,
      account_name: "",
      first_name: "",
      last_name: "",
    },
    selectedTeam: "",
    newTeam: "",
    selectedEmp: { first_name: "jess", last_name: "matt" },
    email: null,
    id: null,
    rules: [(value) => !!value || "Field cannot be empty!"],
  }),
  computed: {
    team_items() {
      return this.$store.getters.team_items;
    },
    employee_items() {
      return this.$store.getters.employee_items;
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
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
    this.newUserData = this.user;
  },
  methods: {
    getEmployees(teamName) {
      let holdEmp = [];
      for (let i = 0; i < this.employee_items.length; i++) {
        if (
          String(teamName).toLowerCase() ===
          this.employee_items[i].team_name.toLowerCase()
        )
          holdEmp.push(this.employee_items[i]);
      }
      return holdEmp;
    },

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

    editUser() {
      this.newUserData = {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        phone: this.user.phone,
        role: this.user.role,
        salary: this.user.salary,
        team_name: this.user.team_name,
      };
      this.editMode = !this.editMode;
    },

    updateUser() {
      axios
        .put("http://localhost:3030/Employees", null, {
          params: this.newUserData,
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("update_user", this.newUserData);
          this.$store
            .dispatch("getEmployees")
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
    reassignEmp(empInfo) {
      this.selectedEmp = empInfo;
      if (!this.editTeam) this.editTeam = !this.editTeam;
    },

    updateEmpTeam() {
      this.selectedEmp.team_name = this.newTeam;
      axios
        .put("http://localhost:3030/Employees", null, {
          params: this.selectedEmp,
        })
        .then((res) => {
          console.log(res);
          this.$store
            .dispatch("getEmployees")
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          this.editTeam = !this.editTeam;
          this.selectedEmp = {};
        })
        .catch((err) => {
          console.log(err.toJSON());
        });
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
  max-width: 50%;
}
.form-opt {
  max-width: 25%;
  padding-bottom: 15px;
  min-width: 20rem;
}
.btn-list {
  padding: 20px;
}
/* .update-btn,
.back-btn {
  width: min-content;
} */
.emp-row {
  padding: 15px;
}
</style>
  
  
  