<template>
  <div class="footer-nav">
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="profile" icon="friends-o">订单</van-tabbar-item>
    <van-tabbar-item name="personal" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
data(){
  return {
    active:'home'
  }
},
methods:{
  onChange(name){
    this.$router.push({
      name:name
    })
  }
}
}
</script>

<style>

</style>