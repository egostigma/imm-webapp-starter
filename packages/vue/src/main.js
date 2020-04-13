import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount("#app");
