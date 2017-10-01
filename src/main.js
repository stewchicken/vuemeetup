// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase' // import every exported function of firebase 
// import {initializeApp} from 'firebase' // only import initaliizeApp function exported from firebase
import router from './router'
import { store } from './store' //it is same as ./store/index.js
import DateFiler from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFiler)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAv1F9sVm8K9pOgRoPaDjW6rLJtJ50Epaw',
      authDomain: 'vuemeetup-9c7b5.firebaseapp.com',
      databaseURL: 'https://vuemeetup-9c7b5.firebaseio.com',
      projectId: 'vuemeetup-9c7b5',
      storageBucket: 'gs://vuemeetup-9c7b5.appspot.com',
      // storageBucket: 'vuemeetup-9c7b5.appspot.com',
      messagingSenderId: '788757867956'
    })
  }
})
