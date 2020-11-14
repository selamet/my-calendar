import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store"
import {router} from "./router"

import * as uiv from 'uiv'

new Vue({
  el: '#app',
  router,
  uiv,
  render: h => h(App),
  store
})
