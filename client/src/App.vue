<template>
  <v-container class="main-con">
    <NavBar />
    <router-view></router-view>
  </v-container>
</template>
<script >
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  data: () => ({}),
};
</script>

<style>
.main-con {
  padding: 0px !important;
  margin: 0px;
  height: 100%;
  min-width: 100%;
  background-color: #1a041b;
  min-height: 100vh;
}

.transparent-carousel-item {
  background-color:  #1a041b !important; 
  border: none !important; 
}

.v-card {
  background-color:  #38113b!important; 
  border: none !important; 
}

.v-img {
  background-color:  #1a041b!important; 
}
</style>