import Vue from 'vue'
import './plugins/axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
