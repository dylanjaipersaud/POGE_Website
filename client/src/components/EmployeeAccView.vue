<template>
  <v-container>
    <h3>Employee Account Information</h3>
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
      {{ newUserData }}
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
      <v-row class="post-card">
        <h2>Discussions</h2>
        <v-spacer></v-spacer>
        <v-btn class="post-btn" @click="setPosting = !setPosting">
          <p v-if="!setPosting">Add Post</p>
          <p v-else>Cancel</p>
        </v-btn>
      </v-row>
      <v-card v-if="setPosting" class="post-card">
        <v-card-title>Create a New Post</v-card-title>
        <v-card-text>
          <v-form ref="discussion">
            <v-select
              label="Select the game"
              :items="getGameOptions()"
              clearable
              v-model="game"
            ></v-select>
            <v-text-field label="Patch No" v-model="patch"></v-text-field>
            <v-select
              label="Select the development status"
              :items="status_options"
              clearable
              v-model="status"
            ></v-select>
            <v-text-field
              label="Write the reason"
              clearable
              v-model="reason"
              counter
              :rules="[textRules.lengthRules(30)]"
            ></v-text-field>
            <v-btn class="post-btn" @click="submitUpdate()">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-expansion-panels
        v-model="selectedTeam"
        style="max-width: 50%"
        class="my-4"
        variant="inset"
      >
        <v-expansion-panel
          v-for="update in getUpdateTeam()"
          :key="update.patch"
          :title="update.game"
        >
          <v-expansion-panel-text>
            <p>Patch No: {{ update.patch }}</p>
            <p>Reason: {{ update.reason }}</p>
            <p>Status: {{ update.status }}</p>
            <!-- <v-row
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
            </v-row> -->
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <v-card v-if="editTeam">
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
      </v-card> -->
    </div>
  </v-container>
</template>
  
  <script>
import axios from "axios";
export default {
  data: () => ({
    editMode: false,
    editTeam: false,
    setPosting: false,
    newUserData: {
      email: "",
      id: 0,
      account_name: "",
      first_name: "",
      last_name: "",
    },
    selectedTeam: "",
    update_items: [],
    newTeam: "",
    selectedEmp: { first_name: "jess", last_name: "matt" },
    email: null,
    id: null,
    rules: [(value) => !!value || "Field cannot be empty!"],
    reason: null,
    status: null,
    game: null,
    patch: null,
    status_options: ["In-progress", "Completed", "Delayed", "Stopped"],
    textRules: {
      lengthRules: (len) => (v) =>
        (v || "").length <= len || `Invalid character length, required ${len}`,
    },
  }),
  computed: {
    team_items() {
      return this.$store.getters.team_items;
    },
    employee_items() {
      return this.$store.getters.employee_items;
    },
    update_items() {
      return this.$store.getters.update_items;
    },
    development_items() {
      return this.$store.getters.development_items;
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
      .dispatch("getDevelopments")
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
      .dispatch("getUpdates")
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

    getUpdateTeam() {
      let holdUpdates = [];
      for (let i = 0; i < this.update_items.length; i++) {
        if (this.update_items[i].team_name == this.user.team_name)
          holdUpdates.push(this.update_items[i]);
      }
      return holdUpdates;
    },

    handleUpdate() {
      if (this.email && this.id) {
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

    getGameOptions() {
      let holdGames = [];
      for (let i = 0; i < this.development_items.length; i++) {
        if (this.development_items[i].team_name == this.user.team_name) {
          holdGames.push(this.development_items[i].game);
        }
      }
      return holdGames;
    },

    submitUpdate() {
      if (
        this.patch == null ||
        this.reason == null ||
        this.game == null ||
        this.status == null
      ) {
        alert("Please set all fields");
        return;
      }
      axios.post("http://localhost:3030/Updates", null, {
          params: {
            patch: this.patch,
            game: this.game,
            team_name: this.user.team_name,
            reason: this.reason,
            status: this.status
          },
        })
        .then((res) => {
          console.log(res);
          this.setPosting = false;
          this.patch = null;
          this.reason = null;
          this.status = null;
          this.$store.dispatch("getUpdates");
        })
    },

   async logoutUser() {
    console.log("Logout initiated");
    if (confirm("Would you like to logout?")) {
        console.log("User confirmed logout");
        try {
            await this.$store.dispatch("logout");
            
            console.log("Dispatch successful, redirecting");
            this.$router.push("/LoginView");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    } else {
        console.log("User cancelled logout");
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
.post-btn {
  background-color: white;
  color: black;
}
.post-card {
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
}
.post-card-text {
  margin-left: 10px;
}
</style>
  
  
  