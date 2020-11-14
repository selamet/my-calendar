import Vue from "vue"
import VueRouter from "vue-router"

import { store } from "./store/store"
import Calender from "./components/calender/Calender";
import Register from "./components/auths/Register"
import Login from "./components/auths/Login";

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Calender,
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
