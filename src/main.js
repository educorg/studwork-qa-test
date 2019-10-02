import Vue from 'vue'
import App from './App.vue'

import './directives/click-outside.js'
import './filters/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
