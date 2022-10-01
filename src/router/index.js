import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/page/index.vue'
import NotFound from '~/page/404.vue'
const routes=[
  {path:'/',component:Index},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

export default router