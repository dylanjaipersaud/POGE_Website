<template>
  <v-container>
    <h1>{{ game.game }}</h1>
    <!-- <v-img :src="getImg(game.game)" />
      <p><strong>Price:</strong> {{ game.price }}</p>
      <p><strong>Description:</strong> {{ game.description }}</p> -->

    <!-- Add to Cart Button -->
    <v-card class="game-card">
      <v-img :src="getImg(game.game)" height="500" width="500">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
      <v-col class="game-desc">
        <div>
          <h3 v-if="game.price > 0">${{ game.price }}</h3>
          <h3 v-else>Free</h3>
          <br />
          <p>Rated {{ game.maturity_rating }}</p>
          <p>
            <span>Released &nbsp; {{ formatDate(game.release_date) }}</span>
          </p>
          <br />
          <v-form ref="form">
            <v-select
              required
              :rules="rules"
              label="Select..."
              hint="Select a Platform"
              persistent-hint
              v-model="platform"
              :items="platform_options"
              clearable
              item-title="store"
              item-value="store"
            ></v-select>
            <br />
            <v-select
              required
              :rules="rules"
              label="Select..."
              hint="Select a Payment Method"
              persistent-hint
              clearable
              v-model="payment_method"
              :items="payment_options"
            ></v-select>
          </v-form>
        </div>
        <v-btn v-if="role == 3" class="purchase-btn" @click="addToCart(game)"
          >Add to Cart</v-btn
        >
      </v-col>
    </v-card>

    <br />
    <br />

    <!-- Discussion Forum -->
    <div>
      <v-row class="post-card">
        <h2>Discussions</h2>
        <v-spacer></v-spacer>
        <v-btn
          v-if="role == 3"
          class="purchase-btn"
          @click="setPosting = !setPosting"
        >
          <p v-if="!setPosting">Add Post</p>
          <p v-else>Cancel</p>
        </v-btn>
      </v-row>
      <v-card v-if="setPosting" class="post-card">
        <v-card-title>Create a New Post</v-card-title>
        <v-card-text>
          <v-form ref="discussion">
            <v-select
              label="Select the kind of post"
              :items="reason_options"
              clearable
              v-model="reason"
            ></v-select>
            <v-textarea
              label="Write your post"
              clearable
              v-model="description"
              counter
              :rules="[textRules.lengthRules(50)]"
            ></v-textarea>
            <v-btn class="purchase-btn" @click="submitPost()">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <br />
      <v-row v-for="post in getForums()" :key="post.date">
        <v-card class="post-card">
          <v-card-title
            >[{{ post.reason }}] &nbsp; {{ post.description }}</v-card-title
          >
          <v-card-text class="post-card-text">
            <v-row>
              {{ post.account }}
              <v-spacer></v-spacer>
              {{ formatDateTime(post.date) }}
            </v-row>
          </v-card-text>
        </v-card>
        <v-btn v-if="role == 2" icon class="post-card-text" @click="deletePost(post)">
          <v-icon icon="mdi-delete"></v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-container>
</template>
  
  <script>
import gameImages from "../assets/covers/imageImport";
import moment from "moment";
import axios from "axios";

export default {
  data: () => ({
    game: {},
    comments: [],
    platform: null,
    platform_options: [],
    payment_method: null,
    payment_options: ["Visa", "Gift Card", "Store Points"],
    reason_options: ["discussion", "feedback", "refund"],
    rules: [
      (value) => {
        if (value) return true;
        return "Field cannot be empty!";
      },
    ],
    textRules: {
      lengthRules: (len) => (v) =>
        (v || "").length <= len || `Invalid character length, required ${len}`,
    },
    setPosting: false,
    reason: null,
    description: null,
  }),

  // props: (route) => ({ game: route.query.q }),

  computed: {
    game_items() {
      return this.$store.getters.game_items;
    },
    forum_items() {
      return this.$store.getters.forum_items;
    },
    cart_items() {
      return this.$store.getters.cart_items;
    },
    purchase_items() {
      return this.$store.getters.purchase_items;
    },
    user() {
      return this.$store.state.user;
    },
    role() {
      return this.$store.state.role;
    },
  },

  async mounted() {
    await this.$store.dispatch("getGames");
    this.$store.dispatch("getForums");
    await this.$store.dispatch("getPurchases");
    // this.game = "Cola El Machbros";
    // this.getGame(this.$route.params.name);
    this.game = this.getGame(this.$route.params.name);
    console.log("cart items: ", this.cart_items);
    this.getPlatforms();
    console.log(this.platform_options);
    // this.gameObj = this.getGame()
    // .then(() => {

    // })
    // .catch(err){ console.log(err)};
  },

  methods: {
    getImg(name) {
      return gameImages.find((img) => img.name === name)?.img || "";
    },

    getGame(gameName) {
      for (let i = 0; i < this.game_items.length; i++) {
        console.log("comparing ", gameName, " to ", this.game_items[i].game);
        if (String(this.game_items[i].game) == String(gameName))
          return this.game_items[i];
      }
      return null;
    },

    getPurchases() {
      let holdPurchases = [];
      for (let i = 0; i < this.purchase_items.length; i++) {
        if (
          String(this.user.account_name).toLowerCase() ===
          this.purchase_items[i].account.toLowerCase()
        )
          holdPurchases.push(this.purchase_items[i]);
      }
      return holdPurchases;
    },

    formatDate(date) {
      return moment(date).format("MMMM[ ]D[, ]YYYY");
    },

    formatDateTime(dateTime) {
      return moment(dateTime).format("MM[/]DD[/]YYYY[ ]h:mma");
    },

    formatGame(gameObj) {
      console.log("now", moment().format("YYYY[-]DD[-]MM[ ]HH[:]MM[:]SS"));
      return {
        account: this.user.account_name,
        store: this.platform,
        game: gameObj.game,
        date: moment().format("YYYY[-]MM[-]DD[ ]hh[:]mm[:]ss"),
        payment_method: this.payment_method,
        type: "Purchase",
        price: gameObj.price,
      };
    },

    async getPlatforms() {
      await axios
        .get("http://localhost:3030/PlatformApps/" + this.game.game)
        .then((res) => {
          console.log("platforms", res.data);
          this.platform_options = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addToCart(gameObj) {
      let holdGame = this.formatGame(gameObj);
      let holdPurchases = this.getPurchases();

      if (holdGame.payment_method == null && holdGame.store == null) {
        alert("Please select a store and payment method");
        this.$refs.form.validate();
        return;
      } else if (holdGame.store == null) {
        alert("Please select a store");
        this.$refs.form.validate();
        return;
      } else if (holdGame.payment_method == null) {
        alert("Please select a payment method");
        this.$refs.form.validate();
        return;
      }

      for (let i = 0; i < holdPurchases.length; i++) {
        console.log(
          "Comparing",
          holdGame.store,
          "to",
          holdPurchases[i].store,
          ":",
          String(holdGame.store).trim() ===
            String(holdPurchases[i].store).trim()
        );
        if (
          holdGame.game === holdPurchases[i].game &&
          String(holdGame.store).trim() ===
            String(holdPurchases[i].store).trim()
        ) {
          alert("You already own this game for this platform");
          return;
        }
      }

      for (let i = 0; i < this.cart_items.length; i++) {
        if (
          this.cart_items[i].game === holdGame.game &&
          String(this.cart_items[i].store).trim() ===
            String(holdGame.store).trim()
        ) {
          alert(holdGame.game + " is already in your cart");
          return;
        }
      }
      this.$store.dispatch("addCart", holdGame);
      this.platform = null;
      this.payment_method = null;
    },

    getForums() {
      let holdPosts = [];
      for (let i = 0; i < this.forum_items.length; i++) {
        if (
          String(this.game.game).toLowerCase() ===
          this.forum_items[i].game.toLowerCase()
        )
          holdPosts.push(this.forum_items[i]);
      }
      return holdPosts;
    },

    submitPost() {
      if (this.reason == null || this.description == null) {
        alert("Please set the reason and description");
        return;
      }
      if (this.description.length > 50) {
        alert("Description is too long");
        return;
      }
      let holdArr = {
        game: this.game.game,
        account: this.user.account_name,
        date: moment().format("YYYY[-]MM[-]DD[ ]hh[:]mm[:]ss"),
        reason: this.reason,
        description: this.description,
      };

      axios
        .post("http://localhost:3030/Forums", {}, { params: holdArr })
        .then(async (res) => {
          console.log(res);
          await this.$store.dispatch("getForums");
          this.setPosting = false;
          this.reason = null;
          this.description = null;
        })
        .catch((err) => {
          alert("Something went wrong with your post");
          console.error(err);
        });
    },

    deletePost(post) {
      if (
        confirm("Would you like to delete this post by " + post.account + "?")
      ) {
        axios
          .delete(
            "http://localhost:3030/Forums",
            // null,
            {
              data: {
                game: post.game,
                account: post.account,
                description: post.description,
              },
            }
          )
          .then((res) => {
            console.log(res);
            this.$store.dispatch("getForums");
          });
      }
    },
  },
};
</script>
<style scoped>
.game-card {
  width: min-content;
  display: flex;
  justify-content: center;
  padding-left: 5%;
  padding-right: 5%;
  text-wrap: nowrap;
}
.game-desc {
  justify-content: space-between;
  padding: 5%;
  display: flex;
  flex-direction: column;
}
.purchase-btn {
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
  