import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/page/index.vue'
import NotFound from '~/page/404.vue'
import login from '~/page/login.vue'
import layout from '~/layout/admin.vue'
const routes = [
  {
    path: '/', component: layout,
    children: [
      { path: '/', component:Index , meta: { title: '主页' } },
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', component: login, meta: { title: '登录' } }

]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router