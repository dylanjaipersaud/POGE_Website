<template>
  <v-toolbar class="toolbar" elevation="5">
    <v-toolbar-title>POGE</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/" class="router-link-deco">
      <v-btn><v-icon icon="mdi-home-outline"></v-icon></v-btn>
    </router-link>
    <!-- <v-col v-if="showSearch">
        <v-text-field
      
      v-model="search"
      placeholder="Search..."
      prepend-icon="mdi-magnify"
      single-line
      hide-details
      class="search-bar"
    >
</v-text-field> -->
    <v-autocomplete
      v-if="showSearch"
      label="Search for a game"
      :items="isActive()"
      auto-select-first
      class="search-bar"
      v-model="searchedGame"
    >
      <template v-slot:append>
        <v-icon icon="mdi-magnify" @click="routeToGame()"></v-icon>
      </template>
    </v-autocomplete>

    <!-- <v-card class="search-bar">Hi</v-card>
    </v-col> -->

    <v-btn @click="toggleSearch">
      <v-icon icon="mdi-magnify" v-if="!showSearch"></v-icon>
      <v-icon icon="mdi-cancel" v-else></v-icon>
    </v-btn>

    <v-btn v-if="role == 3">
      <v-badge
        @click="overlay = !overlay"
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
      <h2 v-if="cart_items.length == 0 || cart_items.length == null">
        No games added
      </h2>
      <v-list
        v-else
        v-for="game in cart_items"
        :key="game.game"
        class="cart-card-item"
      >
        <v-list-item>
          <v-row>
            <v-img :src="getImg(game.game)"></v-img>
            <v-col class="cart-col">
              <strong
                ><p>{{ game.game }}</p></strong
              >
              <p>{{ game.store }}</p>
              <p v-if="game.price > 0">${{ game.price }}</p>
              <p v-else>Free</p>
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                class="remove-btn"
                @click="removeFromCart(game)"
                >Remove</v-btn
              >
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-row class="purchase-con">
        <h3>Total: ${{ getCartTotal() }}</h3>
        <v-spacer></v-spacer>
        <v-btn class="purchase-btn" @click="purchaseCart()">Purchase</v-btn>
      </v-row>
    </v-card>
  </v-overlay>

  <v-container style="padding-top: 64px">
    <!-- Main content goes here -->
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import gameImages from "../assets/covers/imageImport";
export default {
  data: () => ({
    search: "",
    showSearch: false,
    overlay: false,
    searchedGame: null,
  }),
  computed: {
    role() {
      return this.$store.state.role;
    },

    cart_items() {
      return this.$store.getters.cart_items;
    },

    purchase_items() {
      return this.$store.getters.purchase_items;
    },

    game_items() {
      return this.$store.getters.game_items;
    },
  },

  async mounted() {
    this.$store.dispatch("setCart");
    await this.$store.dispatch("getGames");
  },

  methods: {
    getImg(name) {
      return gameImages.find((img) => img.name === name)?.img || "";
    },

    toggleSearch() {
      this.showSearch = !this.showSearch; // Toggle search bar visibility
    },

    routeToGame() {
      this.$router.push("/GameView/" + this.searchedGame).then(() => {
        this.$router.go();
      });
    },

    isActive() {
      let holdArr = [];
      for (let i = 0; i < this.game_items.length; i++) {
        if (moment(this.game_items[i].release_date).isBefore(moment()))
          holdArr.push(this.game_items[i].game);
      }
      return holdArr;
    },

    getCartTotal() {
      let holdTotal = 0;
      for (let i = 0; i < this.cart_items.length; i++) {
        holdTotal += this.cart_items[i].price;
      }
      return holdTotal;
    },

    getView() {
      if (this.role == 3) return "/CustomerAccView";
      else if (this.role == 2) return "/EmployeeAccView";
      else if (this.role == 1) return "/LeadAccView";
      else return "/LoginView";
    },

    removeFromCart(gameObj) {
      this.$store.dispatch("removeCart", gameObj);
    },
    // "{"account":"failingaverage","store":"Epic Games Store","game":"Dims4","date":"2024-29-10 03:10:00","payment_method":"Gift Card","type":"Purchase","price":20}"
    purchaseCart() {
      if (this.cart_items.length > 0) {
        for (let i = 0; i < this.cart_items.length; i++) {
          axios
            .post(
              "http://localhost:3030/Purchases",
              {},
              { params: this.cart_items[i] }
            )
            .then((res) => {
              console.log("Purchased", this.cart_items[i]);
              console.log("res", res);
              this.$store.dispatch("removeCart", this.cart_items[i]);
            })
            .catch((err) => {
              alert("Something went wrong with your purchase");
              console.error(err);
            });
        }
        alert("All purchases have been made. Thank you!");
      }
    },
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #43008b;
  color: #ffffff;
  width: 100vw;
  position: fixed;
  z-index: 1;
}

.router-link-deco {
  text-decoration: none;
  color: #ffffff;
}

.search-bar {
  margin-top: 15px;
  max-width: 300px;
}
.cart-card {
  background-color: #421b69 !important;
  position: absolute;
  height: 100vh;
  width: 400px;
  /* top: 10; */
  left: 0;
  display: flex;
  flex-direction: column;
}
.cart-card-item {
  background-color: #421b69;
  border-top: 1px inset #fff;
  border-bottom: 1px inset #fff;
}
.cart-col {
  justify-content: center;
  align-content: center;
}
.remove-btn {
  margin-top: 20px;
}
.purchase-con {
  display: flex;
  align-items: flex-end;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
}
.purchase-btn {
  background-color: white;
  color: black;
}
</style>
