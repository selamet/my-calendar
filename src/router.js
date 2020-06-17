import Vue from "vue";
import VueRouter from "vue-router";
import Calender from "./components/calender/Calender";
import EventList from "./components/calender/EventList";
import EventCreate from "./components/calender/EventCreate"

Vue.use(VueRouter);

const routes = [
  {path: "/", component: Calender},
  {path: "/event-list", component: EventList},
  {path: "/event-create", component: EventCreate},

  {path: "*", redirect: "/"}

];

export const router = new VueRouter({
  mode: "history",
  routes
});
