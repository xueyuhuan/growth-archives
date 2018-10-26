import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import './plugins/element.js'

import 'font-awesome/css/font-awesome.css'

Vue.prototype.$ajax=axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
