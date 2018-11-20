<template>
    <div class="class">
        <el-card shadow="hover" class="header">
            我的班级
            <el-select size="small" v-model="classId" placeholder="选择班级" @change="classChange">
                <el-option v-for="i in classList" :label="i.class_name" :value="i.id"></el-option>
            </el-select>
        </el-card>
        <el-card shadow="hover" class="pie">
            <div id="sex"></div>
            <div id="growth"></div>
        </el-card>
        <div class="content">
            <el-card shadow="hover" class="left">
                <header slot="header">今日成长</header>
                <ul>
                    <li v-for="i in todayList">【{{i.name}}】{{i.title}}，成长值+{{i.growth}}</li>
                </ul>
            </el-card>
            <el-card shadow="hover" class="right">
                <header slot="header">整体排名</header>
                <el-tabs v-model="countryId" tab-position="left" @tab-click="handleTab">
                    <el-tab-pane label="全部" name="-1">
                        <ul class="rank-list">
                            <li v-for="(i,index) in classRankList">
                                <div class="main">
                                    <em :style="{'background':i.color}">{{index+1}}</em>
                                    <span>{{i.user_name}}<br/>{{i.classname}}</span>
                                </div>
                                <div class="value" :style="{'color':i.color}">+{{i.growths}}</div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane v-for="i in countryList" :label="i.name" :name="i.id">
                        <ul class="rank-list">
                            <li v-for="(i,index) in classRankList">
                                <div class="main">
                                    <em :style="{'background':i.color}">{{index+1}}</em>
                                    <span>{{i.user_name}}<br/>{{i.classname}}</span>
                                </div>
                                <div class="value" :style="{'color':i.color}">+{{i.growths}}</div>
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<script>
  export default {
    name: "class",
    data(){
      return{
        classList:[],//班级
        classId:'',
        sex:'',
        growth:'',
        todayList:[],//今日成长
        countryList:[],//国家维度列表
        countryId:'-1',//国家维度id
        classRankList:[],//班级列表
      }
    },
    created(){
      //获取班级列表
      this.$ajax.post('/api/archives/getClassInfoList')
        .then(res=>{
          this.classList=res.data.data;
          this.classId=res.data.data[0].id;
        })
        .then(()=>{
          this.getSex();
          this.getGrowth();
          this.getToday();
          this.getClassRank();
        })
      //国家维度列表
      this.$ajax.post('/api/dimensionality/main')
        .then(res=>{
          this.countryList=res.data.data;
        });
    },
    methods:{
      classChange(val){
        this.classId=val;
        this.getSex();
        this.getGrowth();
        this.getToday();
        this.getClassRank();
      },
      //获取学生男女比例
      getSex(){
        this.$ajax.post('/api/myClass/getstudentBL',{classId:this.classId})
          .then(res => {
            this.sex=res.data.data;
          })
          .then(()=>{
            this.drawSex();
          });
      },
      //获取学生成长值比例
      getGrowth(){
        this.$ajax.post('/api/myClass/getRankingBL',{classId:this.classId})
          .then(res => {
            this.growth=res.data.data;
          })
          .then(()=>{
            this.drawGrowth();
          });
      },
      //获取今日成长列表
      getToday(){
        this.$ajax.post('/api/myClass/getstudentArchives',{classId:this.classId})
          .then(res=>{
            this.todayList=res.data.data;
          });
      },
      drawSex(){
        // 基于准备好的dom，初始化echarts实例
        let sexChart = this.$echarts.init(document.getElementById('sex'))
        // 绘制图表
        sexChart.setOption({
          title : {
            text: '学生比例',
            x:'center'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['男生','女生']
          },
          series : [
            {
              name: '学生比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:this.sex.boycount, name:'男生'},
                {value:this.sex.girlcount, name:'女生'},
              ],
              color:['#01AAED', '#5FB878'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      drawGrowth(){
        // 基于准备好的dom，初始化echarts实例
        let sexChart = this.$echarts.init(document.getElementById('growth'))
        // 绘制图表
        sexChart.setOption({
          title : {
            text: '学生成长值',
            x:'center'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['500及以上','400-499','300-399','200-299','199及以下']
          },
          series : [
            {
              name: '学生比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:this.growth.growth1, name:'500及以上'},
                {value:this.growth.growth2, name:'400-499'},
                {value:this.growth.growth3, name:'300-399'},
                {value:this.growth.growth4, name:'200-299'},
                {value:this.growth.growth5, name:'199及以下'}
              ],
              color:['#009688', '#5FB878','#1E9FFF','#FFB800','#FF5722'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      getClassRank(){
        //获取班级排行榜
        // if(this.countryId==='0'){this.countryId='';}
        this.$ajax.post('/api/myClass/getBjRank',{dimensionalityId:this.countryId,classId:this.classId})
          .then(res => {
            this.classRankList=res.data.data;
          });
      },
      handleTab(){
        this.getClassRank();
      }
    }
  }
</script>

<style lang="scss">
    .class{
        @extend %width;
        .header{
            .el-card__body{
                @include flex(space-between)
            }
        }
        .pie{
            margin: 5px 0 0 0;
            .el-card__body{
                @include flex(space-between,flex-start);
                div{
                    flex: 1;
                    height: 300px;
                }
                #growth{
                    border-left: 1px #eee solid;
                    padding-left: 20px;
                }
            }
        }
        .content{
            @include flex(space-between,flex-start);
            .left{
                flex:500px 0 0;
                margin: 5px 5px 0 0;
                li{
                    font-size: 14px;
                    padding: 10px 0;
                    border-bottom: 1px #eee solid;
                }
            }
            .right{
                flex: 1;
                margin: 5px 0 0 0;
            }
        }
    }
</style>