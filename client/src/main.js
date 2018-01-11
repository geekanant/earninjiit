import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueNoty from "vuejs-noty";
import wysiwyg from "vue-wysiwyg";
import firebase from "firebase";

import "vuejs-noty/dist/vuejs-noty.css";
import "vue-wysiwyg/dist/vueWysiwyg.css";
//import GAuth from 'vue-google-oauth2'

import VueTimeago from "vue-timeago";

Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "en",
  locales: {
    "zh-CN": require("date-fns/locale/zh_cn"),
    ja: require("date-fns/locale/ja"),
  },
});

Vue.use(VueNoty);
Vue.use(wysiwyg, {
  hideModules: {
    table: true,
    image: true,
    removeFormat: true,
    link: true,
    code: true,
    orderedList: true,
    separator: true,
  },
});

Vue.config.productionTip = false;

const authData = localStorage.getItem("auth");
new Vue({
  router,
  el: "#app",

  data: {
    auth: authData ? JSON.parse(authData) : {},
    modeofcontact: "",
  },
  methods: {
    initFirebase() {
      const firebaseApp = firebase.initializeApp({
        xxx,
      });
    },
  },
  created() {
    this.initFirebase();
  },
  render: (h) => h(App),
}).$mount("#app");
