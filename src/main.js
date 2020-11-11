import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from "./store/store"

import * as uiv from 'uiv'

new Vue({
  el: '#app',
  VueRouter,
  uiv,
  render: h => h(App),
  store
})
