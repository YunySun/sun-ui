import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/popover',
    name: 'popover',
    component: () => import('../views/Popover/index.vue')
  },
  {
    path: '/picker',
    name: 'picker',
    component: () => import('../views/Picker/index.vue')
  },
  {
    path: '/overlay',
    name: 'overlay',
    component: () => import('../views/Overlay/index.vue')
  },
  {
    path: '/popup',
    name: 'popup',
    component: () => import('../views/Popup/index.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
