<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="title">table--案例</div>
    <Example/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Example from "./components/Example";
export default {
  name: "App",
  components: {
    Example
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
