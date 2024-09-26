
<template>
    <v-toolbar class="toolbar" elevation="5">
        <v-toolbar-title>POGE</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/" class="router-link-deco">
            <v-btn><v-icon icon="mdi-home-outline"></v-icon></v-btn>
        </router-link>
        <v-text-field
            v-if="showSearch"
            v-model="search"
            placeholder="Search..."
            prepend-icon="mdi-magnify"
            single-line
            hide-details
            class="search-bar"
        ></v-text-field>

        <!-- Buttons -->
        <v-btn @click="toggleSearch">
            <v-icon icon="mdi-magnify" v-if="!showSearch"></v-icon>
            <v-icon icon="mdi-cancel" v-else></v-icon>
        </v-btn>
        <router-link v-if="role == 0" to="/LoginView" class="router-link-deco">
            <v-btn>Login</v-btn>
        </router-link>
        <router-link v-else :to="getView()" class="router-link-deco">
            <v-btn><v-icon icon="mdi-account-box-outline"></v-icon></v-btn>
        </router-link>
    </v-toolbar>
</template>

<script>
export default {
    data: () => ({
        search: '',
        showSearch: false // Initially set to false
    }),
    computed: {
    role(){
      return this.$store.state.role;
    }
    },
    methods: {
        toggleSearch() {
            this.showSearch = !this.showSearch; // Toggle search bar visibility
        },
        getView(){
            if(this.role == 3) return "/CustomerAccView"
            else if(this.role == 2) return "/EmployeeAccView"
            else if(this.role == 1) return "/LeadAccView"
            else return "/LoginView"
        }
    }
}
</script>

<style scoped>
.toolbar {
    /* background-color: aqua; */
    width: 100vw;
}
.icon {
    background-color: red;
    color: black;
}
.router-link-deco {
    text-decoration: none;
    color: black;
}
.search-bar {
    max-width: 300px; /* Adjust as needed */
}
;

</style>