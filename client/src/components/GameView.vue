<template>
  <v-container>
    <h1>{{ game.game }}</h1>
    <!-- <v-img :src="getImg(game.game)" />
      <p><strong>Price:</strong> {{ game.price }}</p>
      <p><strong>Description:</strong> {{ game.description }}</p> -->

    <!-- Add to Cart Button -->
    <v-card class="game-card">
      <v-img :src="getImg(game.game)" height="500" width="500"></v-img>
      <v-col class="game-desc">
        <div>
          <h3>${{ game.price }}</h3>
          <br>
          <p>Rated {{ game.maturity_rating }}</p>
          <p><span>Released &nbsp; {{ formatDate(game.release_date) }}</span></p>
        </div>
        <v-btn class="purchase-btn" @click="addToCart">Add to Cart</v-btn>
      </v-col>
    </v-card>

    <br />
    <br />

    <!-- Discussion Forum -->
    <div>
      <h2>Discussions</h2>
      <br />
      <v-row v-for="post in getForums()" :key="post.date">
        <v-card class="post-card">
        <v-card-title>[{{ post.reason }}] &nbsp; {{ post.description }}</v-card-title>
        <v-card-text class="post-card-text">
          <v-row>
            {{ post.account }} 
          <v-spacer></v-spacer>
          {{ formatDateTime(post.date) }}
          </v-row>
        </v-card-text>
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>
  
  <script>
import gameImages from "../assets/covers/imageImport";
import moment from 'moment';
export default {
  data: () => ({
    game: {},
    comments: [],
  }),

  // props: (route) => ({ game: route.query.q }),

  computed: {
    game_items() {
      return this.$store.getters.game_items;
    },
    forum_items() {
      return this.$store.getters.forum_items;
    },
  },

  async mounted() {
    await this.$store.dispatch("getGames");
    this.$store.dispatch("getForums");
    // this.game = "Cola El Machbros";
    // this.getGame(this.$route.params.name);
    this.game = this.getGame(this.$route.params.name);
    // this.gameObj = this.getGame()
    // .then(() => {

    // })
    // .catch(err){ console.log(err)};
  },

  async beforeRouteUpdate(to) {
    // react to route changes...
    console.log("name: ", this.$route.params.name)
    this.game = await this.getGame(to.params.name);
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

    formatDate(date){
      return moment(date).format("MM[/]DD[/]YYYY")
    },
    formatDateTime(dateTime){
      return moment(dateTime).format("MM[/]DD[/]YYYY[ ]hh:mma")
    },
    addToCart() {},
    postComment() {},
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
}
.game-desc {
  justify-content: space-between;
  padding: 5%;
  display: flex;
  flex-direction: column;
}
.purchase-btn{
  background-color: white;
  color: black;
}
.post-card{
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
}
.post-card-text{
  margin-left: 10px;
}
</style>
  