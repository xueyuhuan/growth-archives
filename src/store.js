import Vue from 'vue'
import Vuex from 'vuex'
import axios from "./axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    role:[],//角色简表
    roleList:[],//角色全表
    user:{},//学生用户排行信息
  },
  getters:{
    token:state=>{return state.token},
    role:state=>{return state.role;}
  },
  mutations: {
    setData(state,data){
      state[data.name]=data.data;
    },
    setToken(state,token){
      state.token=token;
      sessionStorage['token']=token;
    },
    setRole(state,role){
      state.role=role;
      sessionStorage['role']=JSON.stringify(role);
    }
  },
  actions: {
    getToken(context){
      return new Promise((resolve, reject)=>{
        axios.post('/api/desktop/getToken')
          .then(res=>{
            context.commit('setToken', res.data.data.CZDA_TOKEN);//在store.js中设置token
            resolve(res.data.data.CZDA_TOKEN)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getInfo(context){
      return new Promise((resolve, reject) => {
        console.log(context.state.token);
        axios.post('/api/user/getInfo')
          .then(res=>{
            context.commit('setData',{
              name:'roleList',
              data:res.data.data.rolelist
            });
            let temp=[];
            for(let i=0;i<res.data.data.rolelist.length;i++){
              temp.push(res.data.data.rolelist[i].code);
            }
            context.commit('setRole',temp);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})
