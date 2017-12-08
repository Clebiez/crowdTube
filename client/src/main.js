// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueMaterial from 'vue-material'
import VueResource from 'vue-resource';
import VueYoutube from 'vue-youtube-embed';
import 'vue-material/dist/vue-material.css'

Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.use(VueYoutube)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})