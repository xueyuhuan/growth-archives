<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components: {
    Navigation
  },
  data(){
    return{
      token:''
    }
  },
  computed:{
    user() {//用户信息
      return this.$store.state.user;
    },
  },
  created(){
    this.$ajax.post('/api/desktop/getToken')
      .then(res=>{
        if (res.data.errcode === '0') {
          this.$store.commit('setToken', res.data.data.CZDA_TOKEN);//在store.js中设置token
        }
        else {
          this.$message.error(res.data.errmsg);
        }
      });
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      this.$ajax.post('/api/desktop/getInfo')
        .then(res => {
          this.$store.commit('setData',{
            name:'user',
            data:res.data.data
          });
        });
    },
    //获取cookie
    getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
      else
        return false;
    },
  }
}
</script>

<style>

</style>
