import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Register from '@/views/Register.vue'
import CreatePost from '@/views/CreatePost.vue'
import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresLogin: true
    },
    component: Home
  },
  {
    path: '/post/create',
    name: 'CreatePost',
    meta: {
      requiresLogin: true
    },
    component: CreatePost
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      requiresLogin: true
    },
    component: Profile
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    meta: {
      requiresLogin: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/PostDetail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
