import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/page/index.vue'
import NotFound from '~/page/404.vue'
import login from '~/page/login.vue'
import layout from '~/layout/admin.vue'

import UserList from '~/page/user/list.vue'
import GoodsList from '~/page/goods/list.vue'
import CategoryList from '~/page/category/list.vue'
import OrderList from '~/page/order/list.vue'
import CommentList from '~/page/comment/list.vue'
import ImageList from '~/page/image/list.vue'
import NoticeList from '~/page/notice/list.vue'
import SettingBase from '~/page/setting/base.vue'
import CouponList from '~/page/coupon/list.vue'
import ManagerList from '~/page/manager/list.vue'
import AccessList from '~/page/access/list.vue'
import RoleList from '~/page/role/list.vue'
import SkusList from '~/page/skus/list.vue'
import LevelList from '~/page/level/list.vue'
import SettingBuy from '~/page/setting/buy.vue'
import SettingShip from '~/page/setting/ship.vue'
import DistributionIndex from '~/page/distribution/index.vue'
import DistributionSetting from '~/page/distribution/setting.vue'

const routes = [
  {
    path: '/',name:'admin', component: layout,
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', component: login, meta: { title: '登录' } }

]

// 动态路由，用于匹配菜单动态添加路由
const asyncRouters = [
  // 子路由
  {
    path: '/',
    name: '/',
    component: Index,
    meta: { title: '后台首页' }
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: UserList,
    meta: { title: '用户列表' }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodsList,
    meta: { title: '商品列表' }
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: CategoryList,
    meta: { title: '分类列表' }
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: OrderList,
    meta: { title: '订单列表' }
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: CommentList,
    meta: { title: '评价列表' }
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: ImageList,
    meta: { title: '图库列表' }
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: NoticeList,
    meta: { title: '公告列表' }
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: SettingBase,
    meta: { title: '配置' }
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: CouponList,
    meta: { title: '优惠券' }
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: ManagerList,
    meta: { title: '管理员管理' }
  },
  {
    path: '/access/list',
    name: '/access/list',
    component: AccessList,
    meta: { title: '权限管理' }
  },
  {
    path: '/role/list',
    name: '/role/list',
    component: RoleList,
    meta: { title: '角色管理' }
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: SkusList,
    meta: { title: '规格管理' }
  },
  {
    path: '/level/list',
    name: '/level/list',
    component: LevelList,
    meta: { title: '会员等级' }
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    component: SettingBuy,
    meta: { title: '支付设置' }
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    component: SettingShip,
    meta: { title: '支付设置' }
  },
  {
    path: '/distribution/index',
    name: '/distribution/index',
    component: DistributionIndex,
    meta: { title: '分销管理员' }
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    component: DistributionSetting,
    meta: { title: '分销设置' }
  }
]


// 
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export function addRouters(menus){
  let hasNewRouters= false
  const findAddrouters = (arr)=>{
    arr.forEach((e)=>{
      let item=asyncRouters.find((o)=>o.path == e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin',item)
        hasNewRouters= true
      }
      if (e.child && e.child.length > 0) {
        findAddrouters(e.child)
      }
    })
  }
  findAddrouters(menus)
  return hasNewRouters
}

// import { createRouter, createWebHashHistory } from 'vue-router'
// import Index from '~/page/index.vue'
// import NotFound from '~/page/404.vue'
// import login from '~/page/login.vue'
// import layout from '~/layout/admin.vue'
// const routes = [
//   {
//     path: '/', component: layout,
//     children: [
//       { path: '/', component:Index , meta: { title: '主页' }},
//       {
//             path: '/user/list',
//             // name: '/user/list',
//             component: UserList,
//             meta: { title: '用户列表' }
//       },
//           {
//             path: '/goods/list',
//             name: '/goods/list',
//             component: GoodsList,
//             meta: { title: '商品列表' }
//           },
//     ]
//   },

//   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
//   { path: '/login', component: login, meta: { title: '登录' } }

// ]

// // 
// const router = createRouter({
//   // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//   history: createWebHashHistory(),
//   routes, // `routes: routes` 的缩写
// })


// export default router