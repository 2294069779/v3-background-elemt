import { login, getinfo } from '~/api/manager'
import { setToken,removeToken } from '~/utility/auth'
const user = {
  namespaced: true,
  state: () => ({
    userinfo: {},
    asideWidth:'250px',
    menus:'',
    ruleNames:'',
  }),
  mutations: {
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo
    },
    setmenu(state,menus){
     state.menus=menus
    },
    setruleNames(state,ruleNames){
      state.ruleNames=ruleNames
     },

    setasideWidth(state){
      state.asideWidth = state.asideWidth == '250px' ? '50px' :'250px'
    }
  },
  actions: {
    // 登录
    async login(context, pload) {
      const res = await login(pload.name, pload.passward)
      setToken(res.token)
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userinfo = await getinfo()
      context.commit('setmenu', userinfo.menus)
      context.commit('setruleNames', userinfo.ruleNames)
      context.commit('setUserInfo', userinfo)
    },
    // 退出登录
    loginOut(context){
      removeToken()
      context.commit('setUserInfo', {})
    }
  }
}

export default user