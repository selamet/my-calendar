import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store"
import {router} from "./router"

import * as uiv from 'uiv'
import Vuelidate from "vuelidate";

Vue.use(Vuelidate)

Vue.filter('addZero', function (value) {
  value = value.toString();
  if (value.length === 1) {
    return '0' + value
  } else {
    return value
  }
});

new Vue({
  el: '#app',
  router,
  uiv,
  render: h => h(App),
  store
})
