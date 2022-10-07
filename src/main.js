import { createApp } from 'vue'
import 'virtual:windi.css'
import App from './App.vue'
import {router} from './router'
import store from './store'


// 权限拦截
import './permission.js'
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app =createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
  // 导入windicss框架
app.use(router).use(store).mount('#app')
