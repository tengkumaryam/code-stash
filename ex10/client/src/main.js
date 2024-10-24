import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';

import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const token = localStorage.getItem('token');
const socket = io('http://192.168.107.121:3000', {
  query: { token }
});

Vue.use(new VueSocketIO({
  connection: socket,
}));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
