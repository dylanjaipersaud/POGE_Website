<template>
    <v-container>
      <h1>{{ game.game }}</h1>
      <v-img :src="game.image" />
      <p><strong>Price:</strong> {{ game.price }}</p>
      <p><strong>Description:</strong> {{ game.description }}</p>
      
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
            <li v-for="comment in comments" :key="comment.id">{{ comment.text }}</li>
          </ul>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        game: {},
        comments: [], 
      };
    },
    mounted() {
      const gameId = this.$route.params.id;
      this.fetchGameDetails(gameId);
    },
    methods: {
      fetchGameDetails(id) {
        const games = this.$store.getters.game_items;
        this.game = games.find(game => game.id === Number(id)) || {};
      },
      addToCart() {
        
      },
      postComment() {
        
      },
    },
  };
  </script>
  