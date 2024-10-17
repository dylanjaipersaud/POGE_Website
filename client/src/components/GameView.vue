<template>
  <v-container>
    <h1>{{ game }}</h1>
    <!-- <v-img :src="getImg(game.game)" />
      <p><strong>Price:</strong> {{ game.price }}</p>
      <p><strong>Description:</strong> {{ game.description }}</p> -->

    <!-- Add to Cart Button -->
    <v-btn @click="addToCart">Add to Cart</v-btn>

    <!-- Discussion Forum -->
    <div>
      <h2>Discussion Forum</h2>
      <v-textarea label="Share your thoughts..." rows="3"></v-textarea>
      <v-btn @click="postComment">Post Comment</v-btn>

      <div class="forum-comments">
        <h3>Comments:</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            {{ comment.text }}
          </li>
        </ul>
      </div>
    </div>
  </v-container>
</template>
  
  <script>
import gameImages from "../assets/covers/imageImport";
export default {
  data: () => ({
    game: null,
    comments: [],
  }),

  // props: (route) => ({ game: route.query.q }),

  computed: {
    game_items() {
      return this.$store.getters.game_items;
    },
  },

  mounted() {
    this.$store.dispatch("getGames");
    this.game = this.getGame(this.$route.params.name);
    // this.gameObj = this.getGame()
      // .then(() => {
        
      // })
      // .catch(err){ console.log(err)};
  },

  async beforeRouteUpdate(to) {
    // react to route changes...
    this.game = await this.getGame(to.params.id)
  },

  methods: {
    getImg(name) {
      return gameImages.find((img) => img.name === name)?.img || "";
    },

    getGame(gameName){
      for(let i = 0; i < this.game_items.length; i++){
        console.log("comparing ", gameName, " to ", this.game_items[i].game)
        if(String(this.game_items[i].game) == String(gameName)) return this.game_items[i]
      }
      return null;
    },
    addToCart() {},
    postComment() {},
  },
};
</script>
  