<template>
  <v-container>
    <h1>POG Entertainment</h1>
    <h2>Top Games of the Week</h2>
    <v-carousel show-arrows="hover" continuous cycle interval="3000" hide-delimiter-background>
      <v-carousel-item v-for="game in top_games" :key="game" class="transparent-carousel-item">
        <v-sheet class="transparent-sheet">
          <v-img :src="game.image" height="500px" alt="Game Image" class="game-image"></v-img>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <br>
    <h2>All Games</h2>
    <br>

    <v-row>
      <v-col v-for="game in activeGames" :key="game" cols="12" md="4">
        <router-link :to="{ name: 'GameDetails', params: { id: game.id } }" style="text-decoration: none;">
          <v-card class="d-flex align-center" height="200px" dark>
            <div class="text-h3 flex-grow-1 text-center">
              {{ game.game }}
            </div>
            <v-btn color="primary">View Details</v-btn>
          </v-card>
        </router-link>
      </v-col>
    </v-row>

    <v-row align="start" >
      <v-col v-for="game in game_items" :key="game" cols="3">
        <router-link :to="`/GameView/${game.game}`">
        <v-card>
          <v-img class="bg-grey-lighten-2" :src="getImg(game.game)" cover>
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
          <v-card-title>{{ game.game }}</v-card-title>
        </v-card>
      </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import gameImages from "../assets/covers/imageImport";

export default {
  data: () => ({
    todayDate: null,
    activeGames: [],
    top_games: [
      { id: 1, game: "BunkerNite", image: gameImages[0].img},
      { id: 2, game: "Squirrel Brawl", image: gameImages[5].img},
      { id: 3, game: "Golf With Robots", image: gameImages[6].img},
    ],
  }),

  computed: {
    game_items() {
      return this.$store.getters.game_items;
    },
  },

  mounted() {
    this.$store.dispatch("getGames")
      .then(() => {
        this.activeGames = this.isActive();
        console.log(this.activeGames); 
      })
      .catch(console.log);
    this.setToday();
  },

  methods: {
    setToday() {
      this.todayDate = moment();
    },

    getImg(name) {
      return gameImages.find(img => img.name === name)?.img || '';
    },

    isActive() {
      return this.game_items.filter(game => moment(game.release_date).isBefore(this.todayDate));
    },

    navigateToGameDetails(gameObj) {
      console.log(gameObj.game)
      this.$router.push({ name: 'GameView', state: { game: gameObj } });
    },
  },
}
</script>

<style>
.transparent-carousel-item {
  background-color: transparent; 
}

.transparent-sheet {
  background-color: transparent; 
}

.game-image {
  max-width: 100%; 
  height: auto;
  margin-bottom: 1rem; 
}
</style>
