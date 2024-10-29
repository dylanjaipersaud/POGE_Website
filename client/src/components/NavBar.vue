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
        <v-btn>
      <v-badge
        @click="overlay = !overlay"
        v-if="role == 3"
        :content="cart_items.length > 0 ? cart_items.length : null"
        :color="
          cart_items.length > 0
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(255, 255, 255, 0)'
            "
        >
        <v-icon icon="mdi-cart-outline"></v-icon>
    </v-badge>
    </v-btn>
        <router-link v-if="role == 0" to="/LoginView" class="router-link-deco">
            <v-btn>Login</v-btn>
        </router-link>
        <router-link v-else :to="getView()" class="router-link-deco">
            <v-btn><v-icon icon="mdi-account-box-outline"></v-icon></v-btn>
        </router-link>
    </v-toolbar>
    <v-overlay v-model="overlay" transition="slide-x-reverse-transition">
    <v-card class="cart-card">
      <v-card-title><h2>Cart</h2></v-card-title>
      <h2 v-if="cart_items.length === 0">No games added</h2>
      <v-list v-else v-for="game in cart_items" :key="game.game" class="cart-card-item">
        <v-list-item>
          <v-row>
            <v-img :src="getImg(game.game)"></v-img>
            <v-col class="cart-col">
              <strong><p>{{ game.game }}</p></strong>
              <p>{{ game.platform }}</p>
              <p v-if="game.price > 0">${{ game.price }}</p>
              <p v-else>Free</p>
              <v-spacer></v-spacer>
              <v-btn variant="text" class="remove-btn" @click="removeFromCart(game)">Remove</v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-row class="purchase-con">
        <h3>Total: ${{ getCartTotal() }}</h3>
        <v-spacer></v-spacer>
        <v-btn class="purchase-btn">Purchase</v-btn>
      </v-row>
    </v-card>
  </v-overlay>

  <v-container style="padding-top: 64px;">
    <!-- Main content goes here -->
  </v-container>
</template>

<script>
 import gameImages from "../assets/covers/imageImport";
export default {
  data: () => ({
    search: '',
    showSearch: false,
    overlay: false
  }),
  computed: {
    role() {
      return this.$store.state.role;
    },

    cart_items() {
      return this.$store.getters.cart_items;
    },
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
        },
getImg(name) {
      return gameImages.find((img) => img.name === name)?.img || "";
    },

    getCartTotal() {
      return this.cart_items.reduce((total, game) => total + game.price, 0);
    },

    removeFromCart(gameObj) {
      this.$store.dispatch("removeCart", gameObj);
    },
}};
</script>

<style scoped>
.toolbar {
    background-color: #43008b; 
    color: #FFFFFF; 
    width: 100vw;
    position: fixed;
    z-index: 1;
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
