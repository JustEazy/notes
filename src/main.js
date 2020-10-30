import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";


Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD5uEdaT2o_55Go3zC_Iev_PUvLuDKTl78",
  authDomain: "notes-908b5.firebaseapp.com",
  databaseURL: "https://notes-908b5.firebaseio.com",
  projectId: "notes-908b5",
  storageBucket: "notes-908b5.appspot.com",
  messagingSenderId: "515248206106",
  appId: "1:515248206106:web:fe2a810316c9045c8afca3"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
