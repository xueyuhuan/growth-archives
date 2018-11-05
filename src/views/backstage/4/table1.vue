<template>
    <el-card class="page">
        <header slot="header">
            过程评价
        </header>
        <el-form class="search" size="medium" label-width="60px" :inline="true">
            <el-form-item label="学年">
                <el-select v-model="yearId" placeholder="选择学年">
                    <el-option v-for="i in yearList" :label="i.xn" :value="i.xn"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学期">
                <el-select v-model="termId" placeholder="选择学期">
                    <el-option v-for="i in termList" :label="i.name" :value="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="classId" placeholder="选择班级">
                    <el-option v-for="i in classList" :label="i.classname" :value="i.classid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="getTableData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table class="table" :data="tableData" border stripe>
            <el-table-column align="center" prop="zrs" label="周次" min-width="60" sortable></el-table-column>
            <el-table-column align="center" prop="stuedenttxs" label="学生自评/应评总数" min-width="100" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.stuedenttxs}}/{{scope.row.zrs}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="bzrtxs" label="班主任评价/应评总数" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.bzrtxs}}/{{scope.row.zrs}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="chinesetxs" label="语文教师评价/应评总数" min-width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.chinesetxs}}/{{scope.row.zrs}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sxtxs" label="数学教师评价/应评总数" min-width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.sxtxs}}/{{scope.row.zrs}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="120">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit-outline" size="mini"
                               @click="handle(scope.row)">评价</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog class="table-edit" :visible.sync="dialogVisible">
            <header slot="title">{{dialogName}}</header>
            <el-table class="table" :data="evaluationList" border stripe>
                <el-table-column align="center" prop="studentname" label="学生姓名" min-width="100"></el-table-column>
                <el-table-column align="center" prop="studentname" label="认真完成老师布置的作业" min-width="100">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.temp1"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="temp2" label="学习态度认真">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.temp2"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="temp3" label="积极参与班级组织的活动">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.temp3"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="other" label="其他表现" min-width="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.other"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <footer slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </footer>
        </el-dialog>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        yearList:[],//学年
        yearId:'',
        termList:[{id:'1',name:'第1学期'},{id:'2',name:'第2学期'}],//学期
        termId:'',
        classList:[],//班级
        classId:'',
        tableData: [],
        pageSize:10,//
        pageNum:1,//当前页
        total:1,//总页数

        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        evaluationList:[]//评价列表
      }
    },
    created(){
      this.$ajax.post('/api/processEvaluate/getClassList')
        .then(res=>{
          this.classList=res.data.data;
          this.classId=res.data.data[0].classid;
        })
        .then(()=>{
          this.getCurrent();
        })
      this.$ajax.post('/api/processEvaluate/addEvaluation',{temp0:[false,false,true,false]})
    },
    methods: {
      getCurrent(){
        this.$ajax.post('/api/processEvaluate/getCurrent')
          .then(res=>{
            this.yearList=res.data.xnList;
            this.yearId=res.data.data.xn;
            this.termId=res.data.data.xq;
          })
          .then(()=>{
            this.getTableData();
          })
      },
      //获取表格数据
      getTableData(){
        this.$ajax.post('/api/processEvaluate/main',
          {pageSize:this.pageSize,pageNum:this.pageNum,classId:this.classId,xn:this.yearId,xq:this.termId})
          .then(res=>{
            this.total=res.data.data.records;
            this.tableData=res.data.data.rows;
          })
      },
      handle(){
        this.dialogVisible=true;
        this.dialogName='评价';
        this.getEvaluationList();
      },
      //获取评价列表
      getEvaluationList(){
        this.$ajax.post('/api/processEvaluate/getEvaluationList',
          {classId:this.classId,userType:'teacher'})
          .then(res=>{
            this.evaluationList=res.data.data;
          })
      },
      //提交
      submitForm() {
        console.log(this.evaluationList);
        this.$ajax.post('/api/processEvaluate/addEvaluation',this.evaluationList)
          .then(res=>{

          })
      },
    }
  }
</script>

<style lang="scss">
    .table-edit{
        .el-dialog{
            width: 1000px;
        }
        input{
            border: none;
        }
    }
    .el-card{
        @extend %width;
        .search{
            background: #f2f2f2;
            padding-top: 20px;
            margin-bottom: 20px;
        }
        .btn{
            margin-bottom: 15px;
            .el-button-group{
                margin-right: 10px;
            }
        }
        .table{
            .cell {
                white-space: pre-line;
            }
        }
        .pagination{
            margin-top: 10px;
        }
    }
</style>