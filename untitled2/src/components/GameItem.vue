<template>
  <div class="game-item">
    <img :src="game.image" alt="Game Image" class="game-image" />
    <h3 class="game-title">{{ game.title }}</h3>
    <p class="game-price">${{ game.price.toFixed(2) }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});

const addToCart = () => {

  console.log(`${props.game.title} added to cart!`);
};
</script>

<style scoped>
.game-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  margin: 1rem;
}

.game-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.game-title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.game-price {
  color: #007BFF;
  font-weight: bold;
}
</style>
