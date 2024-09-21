<template>
    <v-toolbar class="toolbar">
        <v-toolbar-title>POGE</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-icon type="mdi" size="small" color="green-darken-2" icon="mdi-account-circle-outline" ></v-icon>
        <v-icon
      color="green-darken-2"
      icon="mdi-domain"
      size="large"
    ></v-icon>
        <v-btn icon size="small"><v-icon
      color="green-darken-2"
      icon="mdi-domain"
      size="large"
    ></v-icon></v-btn>
        <v-btn icon="mdi-account" size="small"></v-btn> -->
        <router-link to="/" class="router-link-deco">
            <v-btn>Search</v-btn>
        </router-link>
        <router-link to="./LoginView" class="router-link-deco">
            <v-btn>Login</v-btn>
        </router-link>
    </v-toolbar>
</template>
<script>
export default {
    data: () =>({

    })
}
</script>
<style scoped>
    .toolbar{
        /* background-color: aqua; */
    }
    .icon{
        background-color: red;
        color: black;
    }
    .router-link-deco{
        text-decoration: none;
        color: black;
    }
</style>