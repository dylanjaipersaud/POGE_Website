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
      <v-col v-for="game in isActive()" :key="game" cols="4">
  <router-link class="game-link" :to="`/GameView/${game.game}`">
    <v-card>
      <v-img class="bg-grey-lighten-2 game-image" :src="getImg(game.game)">

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
    // activeGames: [],
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

   async mounted() {
    await this.$store.dispatch("getGames");
    // this.activeGames = this.$store.getters.game_items;
    console.log("Active games", this.$store.getters.game_items)
    this.setToday();
  },

  methods: {
    setToday() {
      this.todayDate = moment();
      console.log(this.todayDate)
    },

    getImg(name) {
      return gameImages.find(img => img.name === name)?.img || '';
    },

    isActive() {
      let holdArr =[];
      for(let i = 0; i < this.game_items.length; i++){
        if(moment(this.game_items[i].release_date).isBefore(this.todayDate))
          holdArr.push(this.game_items[i])
      }
      return holdArr;
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
.v-card .game-image {
  width: auto;  
  height: auto;
  margin-bottom: 1rem; 
  transition: transform 0.3s ease; }

.v-card .game-image:hover {
  transform: scale(1.1); }
.v-card-title {
  transition: transform 0.3s ease;   font-size: 1rem; }

.v-card:hover .v-card-title {
  transform: scale(1.1); }



.game-link{
  text-decoration: none;
}
</style>
