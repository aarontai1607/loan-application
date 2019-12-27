import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueResource from 'vue-resource'

import VueCookie from 'vue-cookie'

import router from './routes'
Vue.use(VueCookie)
Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
