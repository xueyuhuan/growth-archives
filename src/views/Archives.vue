<template>
    <div class="archives">
        <el-card shadow="hover">我的档案</el-card>
        <div class="content">
            <div class="left">
                <el-card shadow="hover" class="user-card">
                    <div class="user">
                        <img src="../assets/img/demo1.png"/>
                        <p>
                            <strong>同学a</strong><br/>
                            <span>三年级2班</span>
                        </p>
                    </div>
                    <div class="growth">我的成长值：<em>234</em></div>
                    <div class="rank">
                        <span>
                            <em>12名</em><br/>
                            班级排名
                        </span>
                        <span>
                            <em>12名</em><br/>
                            年级排名
                        </span>
                    </div>
                </el-card>
                <el-card shadow="hover" class="data-card">
                    <header slot="header">我的资料
                        <el-button type="text" class="editor" @click="editor">{{dataBtnName}}</el-button>
                    </header>
                    <el-form :model="dataForm" label-width="70px" size="mini" :disabled="dataFormDisabled">
                        <el-form-item label="班主任">
                            <el-input v-model="dataForm.classTeacher"></el-input>
                        </el-form-item>
                        <el-form-item label="我的理想">
                            <el-input v-model="dataForm.ideal"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好">
                            <el-input v-model="dataForm.hobby"></el-input>
                        </el-form-item>
                        <el-form-item label="我的特长">
                            <el-input v-model="dataForm.speciality"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card shadow="hover" class="medal-card">
                    <header slot="header">我的奖章</header>
                    <ul>
                        <li><i class="fa fa-trophy" style="color: #FFB800"></i><span>校长奖章</span></li>
                        <li><i class="fa fa-star" style="color: #FF5722"></i><span>少先队员</span></li>
                    </ul>
                </el-card>
            </div>
            <el-card shadow="hover" class="center">
                <header slot="header">2017-2018学年</header>
                <div class="tree"></div>
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
                    <header slot="header"><span>班级排名</span><span>年级排名</span></header>
                    <ul>
                        <li>
                            <div class="main">
                                <em style="background: #FF5722">1</em>
                                <span>张三<br/>五年级3班</span>
                            </div>
                            <div class="value" style="color: #FF5722">+111</div>
                        </li>
                        <li>
                            <div class="main">
                                <em style="background: #FFB800">2</em>
                                <span>张三<br/>五年级3班</span>
                            </div>
                            <div class="value" style="color: #FFB800">+99</div>
                        </li>
                        <li>
                            <div class="main">
                                <em style="background: #01AAED">3</em>
                                <span>张三<br/>五年级3班</span>
                            </div>
                            <div class="value" style="color: #01AAED">+88</div>
                        </li>
                        <li>
                            <div class="main">
                                <em>4</em>
                                <span>张三<br/>五年级3班</span>
                            </div>
                            <div class="value">+77</div>
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
        dataBtnName:'编辑',
        dataForm:{
          classTeacher:'李老师',//班主任
          ideal:'医生',//理想
          hobby:'篮球，乒乓球',//爱好
          speciality:'篮球'//特长
        },
        dataFormDisabled:true,
      }
    },
    methods:{
      editor(){
        if(this.dataBtnName==='编辑'){
          this.dataBtnName='保存';
          this.dataFormDisabled=false;
        }
        else if(this.dataBtnName==='保存'){
          //ajax
          this.dataBtnName='编辑';
          this.dataFormDisabled=true;
        }
      }
    }
  }
</script>

<style lang="scss">
    @keyframes myfirst
    {
        0%   {background-image: url("../assets/img/1.png");}
        25%  {background-image: url("../assets/img/2.png");}
        50%  {background-image: url("../assets/img/3.png");}
        100% {background-image: url("../assets/img/1.png");}
    }
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
                        i{
                            font-size: 20px;
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
                .tree{
                    width: 100%;
                    height: 500px;
                    background: url("../assets/img/1.png") no-repeat center center;
                    background-size: 100%;
                    animation: myfirst 5s infinite;
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
            }
        }
    }
</style>