import { createApp } from 'vue'
import './style.css'
import 'virtual:windi.css'
import App from './App.vue'
import router from './router'

  // 导入windicss框架
createApp(App).use(router).mount('#app')
