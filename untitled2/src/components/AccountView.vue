<template>
  <div class="account-view">
    <h2>Account Information</h2>
    <form @submit.prevent="handleUpdate">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="userInfo.username" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="userInfo.email" id="email" required />
      </div>
      <button type="submit">Update Info</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['userInfo']);
const emit = defineEmits(['onUpdate']);

function handleUpdate() {
  emit('onUpdate', { username: props.userInfo.username, email: props.userInfo.email });
}
</script>

<style scoped>
.account-view {
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
}
</style>
