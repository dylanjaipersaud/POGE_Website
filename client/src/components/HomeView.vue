<template>
  <v-container>
    <h1>POG Entertainment</h1>
    <h2>Top Games of the Week</h2>
    <v-carousel
      show-arrows="hover"
      continuous
      cycle
      interval="3000"
      hide-delimiter-background
    >
      <v-carousel-item v-for="game in top_games" :key="game.id">
        <v-sheet>
          <div>
            <v-img
              :src="game.image"
              height="500px"
              alt="Game Image"
              class="game-image"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-4"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </template>
            </v-img>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    {{ todayDate }}
    <v-item-group selected-class="bg-primary">
      <v-container>
        <v-row>
          <v-col v-for="game in activeGames" :key="game.game" cols="12" md="4">
            <v-item>
              <v-card
                :class="['d-flex align-center']"
                height="200px"
                dark
                @click="toggle"
              >
                <div class="text-h3 flex-grow-1 text-center">
                  {{ game.game }}
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-row align="start" style="height: 150px">
      <v-col v-for="game in game_items" :key="game.game" cols="4">
        <v-card >
          <v-img
            class="bg-grey-lighten-2"
            :src="getImg(game.game)"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
          <v-card-title>
            {{ game.game }}
          </v-card-title>
        </v-card>
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
      {
        game: "BunkerNite",
        image: gameImages[0].img,
      },
      {
        game: "Squirrel Brawl",
        image: gameImages[5].img,
      },
      {
        game: "Golf With Robots",
        image: gameImages[6].img,
      },
    ],
  }),

  computed: {
    game_items() {
      // let hold = this.$store.getters.game_items;
      // let activeGames = [];
      // Array(hold).forEach((game) => {
      //   if (moment(game.release_date).isBefore(this.todayDate))
      //     activeGames.push(game);
      // });
      // return activeGames;

      return this.$store.getters.game_items;
    },
  },

  mounted() {
    this.$store
      .dispatch("getGames")
      .then((res) => {
        console.log(res);

        this.activeGames = this.isActive();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setToday();
  },

  methods: {
    setToday() {
      this.todayDate = moment();
    },

    getImg(name){
      for(let i = 0; i < gameImages.length; i++){
        console.log("checking game")
        if(name === gameImages[i].name){
          console.log("found img for", gameImages[i].name)
          return gameImages[i].img
        }
      }
    },

    isActive() {
      let activeGames = [];
      Array(this.game_items).forEach((game) => {
        console.log(game.game);
        if (moment(game.release_date).isBefore(this.todayDate))
          activeGames.push(game);
      });
      return activeGames;
    },
  },
};
</script>

<style>
.game-image {
  max-width: 100%; /* Responsive image */
  height: auto;
  margin-bottom: 1rem; /* Space below the image */
}
</style>
