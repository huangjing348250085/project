import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入插件
import './plugin'

//执行mockjs
// import './mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
