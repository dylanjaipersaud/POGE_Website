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
        <v-btn @click="overlay = !overlay">
            <v-icon icon="mdi-cancel"></v-icon>
        </v-btn>
        <router-link v-if="role == 0" to="/LoginView" class="router-link-deco">
            <v-btn>Login</v-btn>
        </router-link>
        <router-link v-else :to="getView()" class="router-link-deco">
            <v-btn><v-icon icon="mdi-account-box-outline"></v-icon></v-btn>
        </router-link>
    </v-toolbar>
    <v-overlay v-model="overlay" transition="slide-x-reverse-transition">
        <v-card class="cart-card" >
            <v-card-title>Hello</v-card-title>
        </v-card>
    </v-overlay>
</template>

<script>
export default {
    data: () => ({
        search: '',
        showSearch: false,
        overlay: false
    }),
    computed: {
        role() {
            return this.$store.state.role;
        }
    },
    methods: {
        toggleSearch() {
            this.showSearch = !this.showSearch; // Toggle search bar visibility
        },
        getView() {
            if (this.role == 3) return "/CustomerAccView";
            else if (this.role == 2) return "/EmployeeAccView";
            else if (this.role == 1) return "/LeadAccView";
            else return "/LoginView";
        }
    }
}
</script>

<style scoped>
.toolbar {
    background-color: #43008b; 
    color: #FFFFFF; 
    width: 100vw;
}

.router-link-deco {
    text-decoration: none;
    color: #FFFFFF; 
}

.search-bar {
    max-width: 300px; 
    background-color: #1E1E1E; 
    color: #FFFFFF; 
}
.cart-card{
    position: absolute;
    height: 100vh;
    width: 400px;
    /* top: 10; */
    left: 0;
}
</style>
