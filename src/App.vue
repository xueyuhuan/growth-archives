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

    }
  },
  computed:{
    user() {//用户信息
      return this.$store.state.user;
    },
  },
  created(){
    this.$ajax.post('/api/desktop/getInfo')
      .then(res => {
        this.$store.commit('setData',{
          name:'user',
          data:res.data.data
        });
      });
  }
}
</script>

<style>

</style>
