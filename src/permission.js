// 权限
import router from './router'
import { getToken} from '~/utility/auth'
import { message } from '~/utility/utill'
import NProgress from 'nprogress'
import store from './store'

// 前置守卫
router.beforeEach(async(to, from,next) => {
    NProgress.start();
    // ...
    const token= getToken()
    // 返回 false 以取消导航

    if(token){
     
      await store.dispatch('user/getUserInfo')
        if(to.path == '/login'){
            message('请不要重复登入','waring')
            return next({path:from.path?from.path :'/'})
        } 
    }else{
        if(to.path != '/login'){
            // to.path = '/login'
            return next({path:'/login'})
        }
    }
    let title = (to.meta.title ? to.meta.title : ' 未知')+'--后台管理系统'
    document.title= title
   
    next()
  })

  // 后置守卫
  
  router.afterEach((to, from) => {
    NProgress.done();
  })