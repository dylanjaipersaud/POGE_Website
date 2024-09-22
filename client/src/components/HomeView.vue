<template>
  <v-container>
    <h1>POG Entertainment</h1>
    <h2>Top Games of the Week</h2>
    <v-carousel
    height="400"
    show-arrows="hover"
    cycle
    interval="2000"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="game in top_games"
      :key="game.id"
    >
      <v-sheet
        :color="game.color"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ game.name }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    top_games: [
      {
        id: 1,
        name: "Game 1",
        color: "#ff0000"
      },
      {
        id: 2,
        name: "Game 2",
        color: "#00ff00"
      },
      {
        id: 3,
        name: "Game 3",
        color: "#0000ff"
      },
    ]
  })
}
</script>

<style>

</style>