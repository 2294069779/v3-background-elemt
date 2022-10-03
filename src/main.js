import { createApp } from 'vue'
import 'virtual:windi.css'
import App from './App.vue'
import router from './router'
import store from './store'

// 权限拦截
import './permission.js'
import 'nprogress/nprogress.css'
  // 导入windicss框架
createApp(App).use(router).use(store).mount('#app')
