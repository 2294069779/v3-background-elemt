import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey='admin-token'
const cookies= useCookies()

// 设置token
export function setToken(token){
   return cookies.set(TokenKey, token)
}
// 获取token
export function getToken(){
   return cookies.get(TokenKey)
}
// 删除otken
export function removeToken(){
   return cookies.remove(TokenKey)
}

