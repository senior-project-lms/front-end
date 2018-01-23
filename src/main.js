// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import storeOptions from './stores/index'
import Uploader from 'vue-simple-uploader'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(Uploader)

const store = new Vuex.Store({
  modules: storeOptions,
})


Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
