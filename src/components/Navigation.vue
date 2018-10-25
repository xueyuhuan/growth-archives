<template>
  <div id="nav">
    <div class="content">
      <div class="title"><i class="fa fa-address-book-o"></i>学生成长档案</div>
      <el-menu class="menu"
               router
              default-active="backstage/1"
              mode="horizontal"
              background-color="#009688"
              text-color="#fff"
              active-text-color="#ffd04b">
        <el-menu-item index="/backstage/1">学校维度</el-menu-item>
        <el-menu-item index="2">档案管理</el-menu-item>
        <el-menu-item index="3">过程评价</el-menu-item>
        <el-menu-item index="4">记录方式</el-menu-item>
        <el-menu-item index="5">成长奖章</el-menu-item>
        <el-menu-item index="6">管理员设置</el-menu-item>
        <el-submenu index="7">
          <template slot="title">用户名</template>
          <el-menu-item index="7-1">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
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
