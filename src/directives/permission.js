
import store from '~/store'

function hasPermission(value,el=false){
    if(!Array.isArray(value)){
        throw new Error(`权限赋予失败，不是数组形式`)
    }
   const hasAuto = value.findIndex(v => (store.state.user.ruleNames).includes(v)) != -1
   if (el && !hasAuto) {
    el.parentNode.removeChild(el)
  }
  return hasAuto
}
export default{
    install(app){
        app.directive('permission',{
            mounted(el,binding) {
                hasPermission(binding.value,el)
                
            },
        })
    }
}