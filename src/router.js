import Vue from "vue"
import VueRouter from "vue-router"

import Calender from "./components/calender/Calender";
import Register from "./components/auths/Register"
import Login from "./components/auths/Login";
import {store} from "./store/store"


Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Calender,
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/login",
      component: Login,

    },
  ],
  mode: "history"
})
