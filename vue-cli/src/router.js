import Vue from 'vue'
import Router from 'vue-router'
import Profile from './views/Profile'
import Register from './views/Register'
import Register1 from '@/components/Register1'
import Register2 from '@/components/Register2'

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
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          redirect: 'concern'
        },
        {
          path: 'concern',
          name: 'concern',
          component: () => import('./views/Concern.vue')
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: () => import('./views/Recommend.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        login_require: true
      },
      children: [
        {
          path: '',
          redirect: 'feeds'
        },
        {
          path: 'feeds',
          name: 'feeds',
          component: () => import('./views/SelfFeed')
        },
        {
          path: 'followers',
          name: 'followers',
          component: () => import('./views/ProfileFollower')
        },
        {
          path: 'followings',
          name: 'followings',
          component: () => import('./views/ProfileFollowing')
        },
        {
          path: 'friends',
          name: 'friends',
          component: () => import('./views/ProfileFriend')
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        login_require: true
      },
      component: () => import('./views/Setting'),
      children: [
        {
          path: '',
          redirect: 'account'
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('./components/SettingAccount')
        },
        {
          path: 'pass',
          name: 'pass',
          component: () => import('./components/SettingPass')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('./components/SettingUser')
        }
      ]
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
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('./views/Music')
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
