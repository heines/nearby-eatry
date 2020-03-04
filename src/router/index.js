import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/views/Home.vue';
import About from '@/components/views/About.vue';
import Result from '@/components/views/Result.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/result/:inputs',
    name: 'address',
    component: Result,
    props: true,
  },
  {
    path: '/result',
    name: 'result',
    component: Result,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
