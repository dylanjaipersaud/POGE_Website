<template>
  <v-container>
    <h1>POG Entertainment</h1>
    <h2>Top Games of the Week</h2>
    <v-carousel
      height="50%"
      show-arrows="hover"
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
          <v-col v-for="game in isActive()" :key="game.game" cols="12" md="4">
            <v-item>
              <v-card
                :class="['d-flex align-center']"
                height="200"
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
      <v-col v-for="game in isActive()" :key="game.game" cols="4">
        <v-card
          :class="['d-flex align-center', selectedClass]"
          height="200"
          dark
          color="red"
        >
          <template v-slot:text>
            {{ game.game }}
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import * as gameImages from "../assets/covers/imageImport";
export default {
  data: () => ({
    todayDate: null,
    top_games: [
      {
        game: "BunkerNite",
        image: gameImages.bunker_img,
      },
      {
        game: "Squirrel Brawl",
        image: "",
      },
      {
        game: "Golf With Robots",
        image: gameImages.golf_img,
      },
    ],
  }),

  computed: {
    game_items() {
      return this.$store.getters.game_items;
    },
  },

  mounted() {
    this.$store
      .dispatch("getGames")
      .then((res) => {
        console.log(res);
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

    isActive() {
      let activeGames = [];
      Array(this.game_items).forEach((game) => {
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
