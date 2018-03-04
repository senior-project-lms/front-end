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
import course from './router/course/course';

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

var auth = function(to, from, next, accessPrivileges, coursePrivileges){

  if (!to.matched.length) {
    next('/404');
  }
  else if(to.meta.requeiresAuthentication  && (!accessPrivileges.includes(to.meta.privilege) && !coursePrivileges.includes(to.meta.privilege))){
    next('/401');
  }
  else {

    next();
  }

}


var courseRouting = function(to, from, next, accessPrivileges){
  const coursePublicKey = to.params.id; // get course public key
  store.dispatch("getCoursePrivileges", coursePublicKey) // then fetch privileges
  .then(response => {
    if(response.status){
        const coursePrivileges = store.state.authentication.authenticatedUser.coursePrivileges;
        auth(to, from, next, accessPrivileges, coursePrivileges); // redirect by all privileges
    }
    else{
      next('/401');
    }
  });

}

router.beforeEach((to, from, next) => {

  //console.log(to)
  
  var accessPrivileges = store.state.authentication.authenticatedUser.accessPrivileges; // get privileges
  var coursePrivileges = store.state.authentication.authenticatedUser.coursePrivileges;

  if((to.meta.requeiresAuthentication && accessPrivileges.length == 0)){ // this works if page is refreshed
    store.dispatch('getMe')
    .then(response => {
      if(response.status){ // if ok

        accessPrivileges = store.state.authentication.authenticatedUser.accessPrivileges; // get access privileges again
        coursePrivileges = store.state.authentication.authenticatedUser.coursePrivileges;

        if(to.name == 'Course'){ // if user wants to open course details page
          courseRouting(to, from, next, accessPrivileges); // first get users priviveleges for current course
        }
        else if(to.meta.base == 'Course' && coursePrivileges.length == 0){
          //console.log('buradan 2')
          courseRouting(to, from, next, accessPrivileges); // first get users priviveleges for current course
        }
        else{
          //console.log(console.log('buradan 3'))
          store.commit("setCoursePrivileges", []);
          auth(to, from, next, accessPrivileges, []) // redirect by new privileges
        }
      }
      else{
        next('/401');
      } 
    });
  }
  else{
    if(to.name == 'Courses'){
      store.state.authentication.authenticatedUser.coursePrivileges = [];
    }

    if(to.name == 'Course'){
      //console.log('worked')
      courseRouting(to, from, next, accessPrivileges);
    }
    else if(to.meta.base === 'Course' && coursePrivileges.length == 0){
      //console.log("buradan")
      courseRouting(to, from, next, accessPrivileges); // first get users priviveleges for current course
    }
    else if(to.meta.base === 'Course' && coursePrivileges.length > 0){
      //console.log('buradan 1')
      auth(to, from, next, accessPrivileges, coursePrivileges) // if privileges exis, redirect
    }
    else if(to.meta.base === 'Course' && to.params.id != from.params.id){
      //console.log("buradan 4")
      courseRouting(to, from, next, accessPrivileges); // first get users priviveleges for current course
    }
    else{
      //store.commit("setCoursePrivileges", []);
      auth(to, from, next, accessPrivileges, coursePrivileges) // if privileges exis, redirect
    }
  }
  
});




new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

