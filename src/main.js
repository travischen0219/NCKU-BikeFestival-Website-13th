// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VShowSlide from 'v-show-slide'
import VueLoading from 'vue-loading-overlay'
import VePie from 'v-charts/lib/pie.common'
import VeLiquidfill from 'v-charts/lib/liquidfill.common'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'reset-css'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(VueAxios, axios)

Vue.use(VShowSlide, {
  customEasing: {
    exampleEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
})

Vue.use(VueLoading, {
  canCancel: false,
  color: '#942323',
  loader: 'spinner',
  width: 100,
  height: 100,
  backgroundColor: '#ffffff',
  isFullPage: true,
  opacity: 0.66
})

Vue.component(VePie.name, VePie)
Vue.component(VeLiquidfill.name, VeLiquidfill)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
