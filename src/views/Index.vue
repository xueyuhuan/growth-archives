<template>
    <div class="index">
        <el-card shadow="hover">成长圈</el-card>
        <div class="content">
            <el-card shadow="hover" class="left">
                <ul class="list">
                    <li>
                        <div class="user">
                            <img src="../assets/img/demo1.png"/>
                            <p>
                                <strong>同学a</strong><br/>
                                <span>三年级2班</span><br/>
                                <time>35分钟前</time>
                            </p>
                        </div>
                        <div class="text">
                            <p>校级绘画比赛一等奖的活动。</p>
                            <img src="../assets/img/demo1.png"/>
                        </div>
                    </li>
                    <li>
                        <div class="user">
                            <img src="../assets/img/demo1.png"/>
                            <p>
                                <strong>同学a</strong><br/>
                                <span>三年级2班</span><br/>
                                <time>35分钟前</time>
                            </p>
                        </div>
                        <div class="text">
                            <p>校级绘画比赛一等奖的活动。</p>
                        </div>
                    </li>
                </ul>
                <el-pagination background
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
            </el-card>
            <div class="right">
                <el-card shadow="hover" class="user-card">
                    <div class="user">
                        <img src="../assets/img/demo1.png"/>
                        <p>
                            <strong>{{user.studentName}}</strong><br/>
                            <span>{{user.className}}</span>
                        </p>
                    </div>
                    <div class="growth">我的成长值：<em>{{user.growths}}</em></div>
                    <div class="rank">
                        <span>
                            <em>{{user.bjRank}}名</em><br/>
                            班级排名
                        </span>
                        <span>
                            <em>{{user.bjRank}}名</em><br/>
                            年级排名
                        </span>
                    </div>
                </el-card>
                <el-card shadow="hover" class="rank-list">
                    <header slot="header">本周成长排名</header>
                    <ul>
                        <li v-for="(i,index) in gradeRankList">
                            <div class="main">
                                <em :style="{'background':i.color}">{{index+1}}</em>
                                <span>{{i.user_name}}<br/>{{i.classname}}</span>
                            </div>
                            <div class="value" :style="{'color':i.color}">+{{i.growths}}</div>
                        </li>
                    </ul>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Index",
    data(){
      return{
        gradeRankList:[],//年级排行榜列表
      }
    },
    computed:{
      user() {//用户信息
        return this.$store.state.user;
      }
    },
    created(){
      //获取年级排行榜
      this.$ajax.post('/api/myClass/getNjRank ')
        .then(res => {
          this.gradeRankList=res.data.data;
        });
    }
  }
</script>

<style lang="scss">
    .index{
        @extend %width;
        .content{
            @include flex(space-between,flex-start);
            .el-card{
                width: 100%;
                margin-top: 5px;
            }
            .left{
                flex: 1;
                ul.list{
                    margin-bottom: 20px;
                    li{
                        padding: 20px 0;
                        border-bottom: 1px solid #e0e0e0;
                        .text{
                            font-size: 14px;
                            p{
                                margin: 14px 0 0 0;
                            }
                            img{
                                margin: 14px 0 0 0;
                            }
                        }
                    }
                }
            }
            .right{
                width: 270px;
                margin-left: 5px;
            }
        }

    }
</style>