// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import storeOptions from './stores/index'

import Notifications from 'vue-notification'
import Security from './directives/security'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(Notifications)

Vue.directive('has-privilege', Security);

const store = new Vuex.Store({
  modules: storeOptions,
})




Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */

var auth = function(to, from, next, accessPrivileges){

  if (!to.matched.length) {
    next('/404');
  }
  else if(to.meta.requeiresAuthentication  && !accessPrivileges.includes(to.meta.privilege)){
    next('/401');
  }
  else {

    next();
  }

}

router.beforeEach((to, from, next) => {

  var accessPrivileges = store.state.authentication.authenticatedUser.accessPrivileges; // get privileges

  if((to.meta.requeiresAuthentication && accessPrivileges.length == 0)){ // this works if page is refreshed
    store.dispatch('getMe')
    .then(response => {
      if(response.status){ // if ok
        accessPrivileges = store.state.authentication.authenticatedUser.accessPrivileges; // get access privileges again
        auth(to, from, next, accessPrivileges) // redirect by new privileges
      } 
    });
  }
  else{
    auth(to, from, next, accessPrivileges); // if privileges exis, redirect
  }
  
});




new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

