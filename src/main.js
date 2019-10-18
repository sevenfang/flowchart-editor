import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './lang' // Internationalization
import * as Cookies from 'js-cookie'
import utils from '@/components/FlowchartEditor/global/utils'
import components from '@/components/FlowchartEditor/global/components'
import config from './config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/main.scss'
Vue.config.productionTip = false
let isDev = process && process.env.NODE_ENV !== 'production'
// 挂载 $X 命名空间
Vue.prototype.$X = {
  isDev,
  utils,
  config,
  Cookies
}
// i18n实例
const i18nInstance = i18n(Vue)
Vue.use(ElementUI, {
    size: Cookies.get('size') || 'small', // set element-ui default size
    i18n: (key, value) => i18nInstance.t(key, value)
})
new Vue({
  render: h => h(App),
  store,
  i18n: i18nInstance
}).$mount('#app')
