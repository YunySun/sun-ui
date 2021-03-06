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
  },
  {
    path: '/datetimePicker',
    name: 'datetimePicker',
    component: () => import('../views/DatetimePicker/index.vue')
  },
  {
    path: '/magnifier',
    name: 'magnifier',
    component: () => import('../views/Magnifier/index.vue')
  },
  {
    path: '/navigationbar',
    name: 'navigationBar',
    component: () => import('../views/NavigationBar')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
