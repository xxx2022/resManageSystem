<template>
  <div id="app">
    <router-view/>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import FooterNav from "./views/TabBar/footer-nav.vue"
export default {
  data(){
    return{}
  },
  components:{
    FooterNav
  }
}
</script>
<style>
</style>
