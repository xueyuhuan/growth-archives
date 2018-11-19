<template>
  <div id="nav">
    <div class="content">
      <router-link to="/class" class="title"><i class="fa fa-address-book-o"></i>学生成长档案</router-link>
      <el-menu class="menu"
              :default-active="$route.path"
              mode="horizontal"
              background-color="#009688"
              text-color="#fff"
              active-text-color="#ffd04b">
        <el-menu-item index="/circle" v-if="this.student"><router-link to="/circle">成长圈</router-link></el-menu-item>
        <el-menu-item index="/class"><router-link to="/class">我的班级</router-link></el-menu-item>
        <el-menu-item index="/archives" v-if="this.student"><router-link to="/archives">我的档案</router-link></el-menu-item>
        <el-menu-item index="/backstage/1" v-if="this.admin"><router-link to="/backstage/1">国家维度</router-link></el-menu-item>
        <el-menu-item index="/backstage/2" v-if="this.admin"><router-link to="/backstage/2">学校维度</router-link></el-menu-item>
        <el-menu-item index="/backstage/3" v-if="this.teacher"><router-link to="/backstage/3">档案管理</router-link></el-menu-item>
        <el-submenu index="/backstage/4-1" v-if="!this.student">
          <template slot="title">评价</template>
          <el-menu-item index="/backstage/4-1" v-if="this.teacher"><router-link to="/backstage/4-1">过程评价</router-link></el-menu-item>
          <el-menu-item index="/backstage/4-2" v-if="this.admin"><router-link to="/backstage/4-2">评价设置</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="/backstage/5-1" v-if="!this.student">
          <template slot="title">成长奖章</template>
          <el-menu-item index="/backstage/5-1" v-if="this.teacher||this.admin"><router-link to="/backstage/5-1">奖章授予</router-link></el-menu-item>
          <el-menu-item index="/backstage/5-2" v-if="this.admin"><router-link to="/backstage/5-2">奖章设置</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="6" v-if="this.teacher||this.admin"><router-link to="/backstage/6" >成长奖励</router-link></el-menu-item>
        <el-submenu index="7">
          <template slot="title">{{navname}}</template>
          <el-menu-item index="7-1" @click="logout">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    computed:{
      role() {//用户角色
        return this.$store.state.role;
      },
      navname(){
        return this.$store.state.navname;
      },
      student(){
        return this.role.includes('SYS_STUDENT')
      },
      teacher(){
        return this.role.includes('SYS_BZR')
      },
      admin(){
        return this.role.includes('SYS_ADMIN')
      },
    },
    methods:{
      logout(){
        this.$ajax.post('/logoutApi')
          .then(res=>{
            sessionStorage.clear();
            window.location.href=res.data.url;
          })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #nav{
    background: #009688;
    margin-bottom: 15px;
    .content{
      @include flex(space-between);
      @extend %width;
      .title{
        @include flex;
        font-size: 18px;
        color: #fff;
        i{
          margin-right: 10px;
        }
      }
      .menu{
        &.el-menu--horizontal{
          border-bottom: none;
        }
        .el-submenu__title i{
          color: #e6e6e6;
        }
      }
    }
  }
</style>
