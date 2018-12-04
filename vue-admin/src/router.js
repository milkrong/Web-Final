import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        login_require: true
      },
      children: [
        {
          path: "",
          redirect: "dashboard"
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("./views/Dash")
        },
        {
          path: "users",
          name: "users",
          component: () => import("./views/Users")
        },
        {
          path: "admin",
          name: "admin"
        },
        {
          path: "upload",
          name: "upload",
          component: () => import("./views/Music")
        },
        {
          path: "location",
          name: "location",
          component: () => import("./views/Location")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login")
    }
  ]
});

// routes guradiance
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.adminToken;
  if (
    to.matched.some(function(item) {
      return item.meta.login_require;
    })
  ) {
    isLogin ? next() : next("/login");
  } else {
    next();
  }
});

export default router;
