
import axios from "axios";
import { getToken } from '~/utility/auth';
import { message } from '~/utility/utill'
import store from "../store";


const instance=axios.create({
    baseURL: '/api',
  timeout: 5000,
//   headers: {'X-Custom-Header': 'foobar'}
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  
  const token=getToken()
  if (token) { 
    config.headers['token']=token
  }
  
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  
  return response.data.data || response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error)
   
    const msg = error.response.data.msg
   
    if (msg == '非法token，请先登录！') {
      store.dispatch('user/loginOut').finally(()=>location.reload())
    }
   
      
       message(msg || '请求失败','error')
       return Promise.reject(error);
  
});
export default instance