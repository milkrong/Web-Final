import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueParticles from 'vue-particles'

import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'
import store from './store'

import axios from './http'

/* connect host (socket) */
import VueSocketIo from 'vue-socket.io'
import io from 'socket.io-client'
/** *	Connect to server	***/

Vue.use(VueSocketIo, io('http://localhost:5000', {
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionDelayMax': 5000,
  'reconnectionAttempts': 5000000000000000000000000
}))
Vue.use(ElementUI)
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
