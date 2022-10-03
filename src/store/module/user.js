import { login, getinfo } from '~/api/manager'
import { setToken,removeToken } from '~/utility/auth'
const user = {
  namespaced: true,
  state: () => ({
    userinfo: {}
  }),
  mutations: {
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo
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