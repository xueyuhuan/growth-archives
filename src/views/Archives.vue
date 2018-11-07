<template>
    <div class="archives">
        <el-card shadow="hover">我的档案</el-card>
        <div class="content">
            <div class="left">
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
                <el-card shadow="hover" class="data-card">
                    <header slot="header">我的资料
                        <el-button type="text" class="editor" @click="editor">{{dataBtnName}}</el-button>
                    </header>
                    <el-form label-width="70px" size="mini" disabled>
                        <el-form-item label="班主任">
                            <el-input v-model="dataForm.teachername+'老师'"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="dataForm" label-width="70px" size="mini" :disabled="dataFormDisabled">
                        <el-form-item label="我的理想">
                            <el-input v-model="dataForm.wdlx"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好">
                            <el-input v-model="dataForm.xqah"></el-input>
                        </el-form-item>
                        <el-form-item label="我的特长">
                            <el-input v-model="dataForm.wdtc"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card shadow="hover" class="medal-card">
                    <header slot="header">我的奖章</header>
                    <ul>
                        <li v-for="i in medalList"><img :src="$proxy+imgUrl+i.jzsl"/><span>{{i.name}}</span></li>
                    </ul>
                </el-card>
            </div>
            <el-card shadow="hover" class="center">
                <header slot="header">
                    {{year}}学年
                    <div class="btn">
                        <el-button size="mini">新增</el-button>
                        <el-button size="mini">导出</el-button>
                        <el-button size="mini" @click="detailShow=!detailShow">{{detailShow?'成长详情':'成长之树'}}</el-button>
                    </div>
                </header>
                <ul v-show="detailShow">
                    <li>
                        <i class="fa fa-thumbs-up green"></i>
                        <div class="main">
                            <p>被王老师表扬，成长值+1；</p>
                            <time>09：38</time>
                        </div>
                    </li>
                    <li>
                        <i class="fa fa-book orange"></i>
                        <div class="main">
                            <p>被王老师表扬，成长值+1；</p>
                            <time>09：38</time>
                            <div class="img">
                                <img src="../assets/img/demo1.png"/>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="tree" v-show="!detailShow">
                    <img src="../assets/img/tree/5.png"/>
                    <div id="radar">

                    </div>
                </div>
            </el-card>
            <div class="right">
                <el-card shadow="hover" class="evaluate-list">
                    <header slot="header">我的评价</header>
                    <ul>
                        <li>
                            <el-button type="text" icon="el-icon-edit">xx年-xx年第五周评价</el-button>
                        </li>
                        <li>
                            <el-button type="text" icon="el-icon-edit">xx年-xx年第五周评价</el-button>
                        </li>
                        <li>
                            <el-button type="text" icon="el-icon-edit">xx年-xx年第五周评价</el-button>
                        </li>
                    </ul>
                </el-card>
                <el-card shadow="hover" class="rank-list">
                    <header slot="header">
                        <span :class="{notActive:!classRankShow}" @click="classRankShow=!classRankShow">班级排名</span>
                        <span :class="{notActive:classRankShow}" @click="classRankShow=!classRankShow">年级排名</span></header>
                    <ul v-show="classRankShow">
                        <li v-for="(i,index) in classRankList">
                            <div class="main">
                                <em :style="{'background':i.color}">{{index+1}}</em>
                                <span>{{i.user_name}}<br/>{{i.classname}}</span>
                            </div>
                            <div class="value" :style="{'color':i.color}">+{{i.growths}}</div>
                        </li>
                    </ul>
                    <ul v-show="!classRankShow">
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
    name: "Archives",
    data(){
      return{
        detailShow:false,//成长详情显示
        dataBtnName:'编辑',
        dataForm:{
          teachername:'',//班主任
          wdlx:'',//我的理想
          xqah:'',//兴趣爱好
          wdtc:''//我的特长
        },
        dataFormDisabled:true,
        year:'',//学年
        medalList:'',//奖章列表
        imgUrl:'/resource/showImg?path=',
        classRankList:[],//班级列表
        classRankShow:true,
        gradeRankList:[]
      }
    },
    computed:{
      user() {//用户信息
        return this.$store.state.user;
      }
    },
    mounted(){
      this.drawRadar();
    },
    created(){
      this.$ajax.post('/api/student/getInfo')
        .then(res => {
          this.dataForm=res.data.data;
        });
      //获取学年
      this.$ajax.post('/api/student/getXn')
        .then(res => {
          this.year=res.data.data.xn;
        });
      //获取奖章
      this.$ajax.post('/api/student/getstudentMedal')
        .then(res => {
          this.medalList=res.data.data;
        });
      //获取班级排行榜
      this.$ajax.post('/api/myClass/getBjRank')
        .then(res => {
          this.classRankList=res.data.data;
        });
      //获取年级排行榜
      this.$ajax.post('/api/myClass/getNjRank ')
        .then(res => {
          this.gradeRankList=res.data.data;
        });
    },
    methods:{
      editor(){
        if(this.dataBtnName==='编辑'){
          this.dataBtnName='保存';
          this.dataFormDisabled=false;
        }
        else if(this.dataBtnName==='保存'){
          //ajax
          this.$ajax.post('/api/student/updateStudent',this.dataForm)
            .then(res => {
              this.dataBtnName='编辑';
              this.dataFormDisabled=true;
              this.$message.success(res.data.errmsg);
            });
        }
      },
      drawRadar(){
        // 基于准备好的dom，初始化echarts实例
        let sexChart = this.$echarts.init(document.getElementById('radar'))
        // 绘制图表
        sexChart.setOption({
          // title: {
          //   text: '基础雷达图'
          // },
          radar: {
            name: {
              textStyle: {
                color: '#333',
                fontSize:'12px'
              },
            },
            nameGap:2,
            // 设置雷达图中间射线的颜色
            axisLine: {
              lineStyle: {
                color: 'rgba(131,141,158,.1)',
              },
            },
            indicator: [
              { name: '信息技术', max: 100},
              { name: '信息技术', max: 100},
              { name: '信息技术', max: 100},
              { name: '信息技术', max: 100},
              { name: '信息技术', max: 100},
            ],
            radius:50
          },
          series: [{
            type: 'radar',
            data : [
              {
                value : [80, 60, 20, 50, 78],
                name : '',
                itemStyle:{
                  normal:{
                    color: 'rgba(95,184,120,.3)',
                  }
                }
              },
            ],
          }]
        });
      },
    }
  }
</script>

<style lang="scss">
    .archives{
        @extend %width;
        .content{
            @include flex(space-between,flex-start);
            .el-card{
                width: 100%;
                margin-top: 5px;
            }
            .left{
                width: 270px;
                //资料卡
                .data-card{
                    .el-button{
                        float: right;
                        padding: 3px 0;
                    }
                    .el-input.is-disabled .el-input__inner{
                        background: #fff;
                        color: #999;
                    }
                }
                //奖章卡
                .medal-card{
                    li{
                        @include flex;
                        margin-bottom: 15px;
                        img{
                            height: 30px;
                        }
                        span{
                            flex: 1;
                            font-size: 14px;
                            color: #333;
                            text-align: center;
                        }
                    }
                    li:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            .center{
                flex: 1;
                margin: 5px 5px 0 5px;
                header{
                    @include flex(space-between);
                }
                ul{
                    li{
                        @include flex(flex-start,flex-start);
                        border-bottom: 1px #eee solid;
                        padding: 20px 0;
                        i{
                            font-size: 16px;
                            margin: 18px 20px 0 0;
                            &.green{
                                color:#67C23A;
                            }
                            &.orange{
                                color:#FFB800;
                            }
                        }
                        .main{
                            p{
                                font-size: 14px;
                                margin: 5px 0;
                            }
                            time{
                                font-size: 13px;
                                color: #666;
                            }
                            .img{
                                margin: 14px 0 0 0;
                            }
                        }
                    }
                    :first-child{
                        padding-top: 0;
                    }
                }
                .tree{
                    position: relative;
                    width: 600px;
                    font-size: 0;
                    margin: 0 auto;
                    background: url("../assets/img/tree/bg.jpg") no-repeat;
                    background-size: cover;
                    img{
                        width: 100%;
                    }
                    #radar{
                        position: absolute;
                        top: 160px;
                        right: 20px;
                        width: 180px;
                        height: 180px;
                    }
                }
            }
            .right{
                width: 270px;
                .evaluate-list{
                    li{
                        margin-bottom: 15px;
                        .el-button{
                            font-size: 14px;
                            padding: 0;
                        }
                    }
                    li:last-child{
                        margin-bottom: 0;
                    }
                }
                .rank-list{
                    header{
                        @include flex(space-between,flex-start);
                        span{
                            flex: 1;
                            cursor: pointer;
                            &.notActive{
                                color: #aaa;
                            }
                        }
                        :last-child{
                            text-align: right;
                            border-left:1px #eee solid;
                        }
                    }
                }
            }
        }
    }
</style>