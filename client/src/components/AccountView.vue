<template>
  <div class="account-view">
    <h2>Account Information</h2>
    <form @submit.prevent="handleUpdate">
      <div>
        <label for="username">Email</label>
        <input type="text" v-model="email" id="username" required />
      </div>
      <div>
        <label for="email">Account ID</label>
        <input type="email" v-model="id" id="email" required />
      </div>
      <button type="submit">Update Info</button>
    </form>
  </div>
</template>

<script>
// import { defineProps, defineEmits } from 'vue'

// const props = defineProps(['userInfo'])
// const emit = defineEmits(['onUpdate'])

// function handleUpdate () {
//   emit('onUpdate', { username: props.userInfo.username, email: props.userInfo.email })
// }

export default {
  data: () => ({
    email: null,
    id: 0
  }),

  props: []
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
