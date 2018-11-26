import Vue from 'vue'
import Vuex from 'vuex'
import axios from "./axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie:'',
    token:'',
    role:[],//角色简表
    roleList:[],//角色全表
    navname:'',//导航显示的用户名
    user:{},//学生用户排行信息
  },
  getters:{
    cookie:state=>{return state.cookie},
    token:state=>{return state.token},
    role:state=>{return state.role},
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
    //通过cookie获取token
    getToken(context){
      return new Promise((resolve, reject)=>{
        axios.post('/gettoken',{uuid:context.getters.cookie})
        // axios.post('/api/desktop/getToken')
          .then(res=>{
            context.commit('setToken', res.data.token);//在store.js中设置token
            // context.commit('setToken', res.data.data.CZDA_TOKEN);//在store.js中设置token
            resolve(res.data.token)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //通过token获取角色权限信息
    getInfo(context){
      return new Promise((resolve, reject) => {
        axios.post('/api/user/getInfo')
          .then(res=>{
            context.commit('setData',{
              name:'roleList',
              data:res.data.data.rolelist
            });
            context.commit('setData',{
              name:'navname',
              data:res.data.data.name
            })
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
