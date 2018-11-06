import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Register from "./views/Register";

import Register1 from "@/components/Register1";
import Register2 from "@/components/Register2";
import Register3 from "@/components/Register3";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      children: [
        {
          path: '',
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
    }
  ]
})
