import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},//用户信息
  },
  mutations: {
    setData(state,data){
      state[data.name]=data.data;
    },
  },
  actions: {

  }
})
