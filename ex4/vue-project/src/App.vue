<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Maryam's Vue.js App"/>
    <LesComments/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import LesComments from './components/LesComments.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    LesComments
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
