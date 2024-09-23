
<template>
    <v-toolbar class="toolbar" elevation="5">
        <v-toolbar-title>POGE</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/" class="router-link-deco">
            <v-btn>Home</v-btn>
        </router-link>
        <v-text-field
            v-if="showSearch"
            v-model="search"
            placeholder="Search..."
            append-icon="mdi-magnify"
            single-line
            hide-details
            class="search-bar"
        ></v-text-field>

        <!-- Buttons -->
        <v-btn @click="toggleSearch">Search</v-btn>
        <router-link to="/LoginView" class="router-link-deco">
            <v-btn>Login</v-btn>
        </router-link>
    </v-toolbar>
</template>

<script>
export default {
    data: () => ({
        search: '',
        showSearch: false // Initially set to false
    }),
    methods: {
        toggleSearch() {
            this.showSearch = !this.showSearch; // Toggle search bar visibility
        }
    }
}
</script>

<style scoped>
.toolbar {
    /* background-color: aqua; */
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