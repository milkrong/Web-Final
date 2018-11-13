import Vue from 'vue'
import Router from 'vue-router'
import Profile from './views/Profile'
import Register from './views/Register'
import Register1 from '@/components/Register1'
import Register2 from '@/components/Register2'
import Register3 from '@/components/Register3'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        login_require: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      children: [
        {
          path: '',
          redirect: 'step1'
        },
        {
          path: 'step1',
          name: 'register1',
          component: Register1
        },
        {
          path: 'step2',
          name: 'register2',
          component: Register2
        },
        {
          path: 'step3',
          name: 'register3',
          component: Register3
        }
      ]
    },
    {
      path: '*',
      name: '/404',
      component: () => import('./views/404.vue')
    }
  ]
})

// routes guradiance
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.postifyToken
  if (to.matched.some(function (item) {
    return item.meta.login_require
  })) {
    isLogin ? next() : next('/login')
  } else {
    next()
  }
})

export default router
