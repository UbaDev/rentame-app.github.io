import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from "firebase/app"
import "firebase/auth";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB0f6SSHpxvgM_b2BuWkfHeNy9ML8pDdGs',
  },
  installComponents: true
})

Vue.use(BootstrapVue) 

Vue.use(IconsPlugin)

Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app;
//morado
//#8b3dff


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");


  }
})

