<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
      
    
  </div>
</template>

<style scoped>
html,
body,
#app {
  background-color: #e8e8e8;
  font-family: "Pangolin", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%
}
</style>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    'nav-bar': Navbar
  }
}
</script>

