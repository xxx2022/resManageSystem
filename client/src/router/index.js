import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/home/home.vue"
import Index from '../views/home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '', component: Index },
      { path: '/index', name: 'Index', component: Index },
      { path: '/foods', name: 'Foods', component: () => import('../views/foods/editFoods.vue') },
      { path: '/order', name: 'Order', component: () => import('../views/orders/orders.vue') }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
