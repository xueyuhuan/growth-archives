<template>
    <el-card class="page">
        <header slot="header" class="header">
            过程评价
            <el-select size="small" v-model="roleId" placeholder="请选择" @change="roleChange">
                <el-option v-for="i in roleList" :label="i.name" :value="i.id"></el-option>
            </el-select>
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
            <el-table-column align="center" prop="weeklyname" label="周次" min-width="60" sortable></el-table-column>
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
                <el-table-column v-for="i in evaluationHeader" align="center" :prop="'w'+i.id" :label="i.itemName" min-width="100">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row[scope.column.property]" true-label="1" false-label="0"></el-checkbox>
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
        roleId:'',

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
        evaluationList:[],//评价列表
        evaluationHeader:[],//评价列表头
        weeklyid:''
      }
    },
    computed:{
      roleList() {//用户角色
        return this.$store.state.roleList;
      },
    },
    created(){
      this.roleId=this.roleList[0].id;
      this.getClassList()
        .then(()=>{
          this.getCurrent();
        })
    },
    methods: {
      roleChange(){
        this.getClassList();
        this.getTableData();
      },
      //获取班级列表
      getClassList(){
        return new Promise((resolve, reject) => {
          this.$ajax.post('/api/processEvaluate/getClassList',{roleId:this.roleId})
            .then(res=>{
              this.classList=res.data.data;
              this.classId=res.data.data[0].classid;
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      //获取当前学年学期
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
      //点击评价操作按钮
      handle(row){
        this.dialogVisible=true;
        this.dialogName='评价';
        this.weeklyid=row.weeklyid;
        this.getEvaluationList();
      },
      //获取评价列表
      getEvaluationList(){
        this.$ajax.post('/api/processEvaluate/getEvaluationList',
          {weekly:this.weeklyid,classId:this.classId,roleId:this.roleId})
          .then(res=>{
            this.evaluationList=res.data.data.data;
            this.evaluationHeader=res.data.data.codeList;
          })
      },
      //提交
      submitForm() {
        let temp=JSON.stringify(this.evaluationList);
        this.$ajax.post('/api/processEvaluate/addEvaluation',
          {evaluation:temp,weekly:this.weeklyid,classId:this.classId,roleId:this.roleId})
          .then(res=>{
            this.getTableData();
            this.dialogVisible=false;
            this.$message.success(res.data.errmsg);
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
    .header{
        @include flex(space-between)
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