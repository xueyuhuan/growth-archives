import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    user:{},//用户信息
  },
  mutations: {
    setData(state,data){
      state[data.name]=data.data;
    },
    setToken(state,token){
      state.token=token;
      sessionStorage.token=token;
    }
  },
  actions: {

  }
})
