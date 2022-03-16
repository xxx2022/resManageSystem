import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '../public/css/global.css'
// import axios from "axios"
import http from './http'
import store from './store'



Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.prototype.$axios =http
// Vue.prototype.$http =http


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
