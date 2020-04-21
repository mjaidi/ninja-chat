// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase";
import VueChatScroll from "vue-chat-scroll";
import "materialize-css/dist/css/materialize.min.css";

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

let app = null;
// wait for firebase auth to initialize before creating the app
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created (on first load)
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      components: { App },
      template: "<App/>"
    });
  }
});
