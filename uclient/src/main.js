import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.$axios =axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
