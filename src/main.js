import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// fontawesome 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fontawesome icon
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

library.add(
  faListUl,
  faPlus,
  faCamera,
  faImage,
  faSmile,
  faMicrophone
)
// 註冊後可全域使用 <font-awesome-icon />
Vue.component('font-awesome-icon', FontAwesomeIcon)

//import Konva for canvas
import VueKonva from 'vue-konva'
Vue.use(VueKonva)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
