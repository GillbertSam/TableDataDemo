<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="title">table--案例</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.title {
  font-size: 32px;
  font-weight: bold;
  margin: 30px auto;
}
</style>
