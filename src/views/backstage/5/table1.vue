<template>
    <el-card class="page">
        <header slot="header">
            奖章授予
        </header>
        <el-form class="search" size="medium" label-width="60px" :inline="true">
            <el-form-item label="班级">
                <el-select v-model="classId" placeholder="选择班级">
                    <el-option v-for="i in classList" :label="i.class_name" :value="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-model="studentName" placeholder="输入学生姓名"></el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="getTableData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table class="table" :data="tableData" border stripe>
            <el-table-column align="center" prop="studentnmae" label="学生姓名" min-width="100" sortable></el-table-column>
            <el-table-column align="center" prop="xb" label="性别" min-width="60" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.xb==='1'">男</span>
                    <span v-else-if="scope.row.xb==='2'">女</span>
                    <span v-else>未设置</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="counts" label="获得奖章数" min-width="80" sortable></el-table-column>
            <el-table-column align="center" label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button icon="el-icon-news" size="mini" type="primary"
                               @click="handleAward(scope.row)">授予</el-button>
                    <el-button icon="el-icon-view" size="mini"
                               @click="handleView(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" v-show="total>pageSize"
                       @current-change="handleCurrentChange"
                       :current-page=pageNum
                       :page-size=pageSize
                       layout="total, prev, pager, next, jumper"
                       :total=total>
        </el-pagination>
        <el-dialog :visible.sync="dialogVisible">
            <header slot="title">{{dialogName}}</header>
            <el-form label-width="100px" v-show="dialogName==='授予'">
                <el-form-item label="成长奖章">
                    <el-select v-model="medal_id" placeholder="选择成长奖章">
                        <el-option v-for="i in medalList" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授予原因">
                    <el-input type="textarea" :autosize="{ minRows: 3}" v-model="remark"></el-input>
                </el-form-item>
            </el-form>
            <p class="info" v-show="dialogName==='查看'">{{viewInfo.classname}} {{viewInfo.studentname}}</p>
            <el-table class="table" :data="tableDataMedal" border stripe v-show="dialogName==='查看'">
                <el-table-column align="center" prop="jzname" label="奖章名称" min-width="100" sortable></el-table-column>
                <el-table-column align="center" prop="syrname" label="授予人" min-width="60" sortable></el-table-column>
                <el-table-column align="center" prop="givetime" label="授予时间" min-width="80" sortable></el-table-column>
                <el-table-column align="center" prop="remark" label="授予原因" min-width="80" sortable></el-table-column>
            </el-table>
            <footer slot="footer" v-show="dialogName==='授予'">
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
        classList:[],//班级
        classId:'',
        studentName:'',//学生名
        tableData: [],
        pageSize:10,//
        pageNum:1,//当前页
        total:1,//总页数

        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名

        studentid:'',//操作时选中学生id
        medalList:[],//奖章列表
        medal_id:'',
        remark:'',//授予原因

        viewInfo:'',//查看奖章详情的学生信息
        tableDataMedal:[],//查看奖章详情表格
      }
    },
    created(){
      this.$ajax.post('/api/archives/getClassInfoList')
        .then(res=>{
          this.classList=res.data.data;
          this.classId=res.data.data[0].id;
        })
        .then(()=>{
          this.getTableData();
        })
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/api/medalStudent/getPage ',
          {pageSize:this.pageSize,pageNum:this.pageNum,classId:this.classId,studentName:this.studentName})
          .then(res=>{
            this.total=res.data.data.records;
            this.tableData=res.data.data.rows;
          })
      },
      //授予
      handleAward(row){
        this.medal_id='';
        this.remark='';
        this.studentid=row.studentid;
        this.dialogVisible=true;
        this.dialogName='授予';
        this.getMedalList();
      },
      //获取评价列表
      getMedalList(){
        this.$ajax.post('/api/medalStudent/toAddStudent')
          .then(res=>{
            this.medalList=res.data.data;
          })
      },
      //提交
      submitForm() {
        this.$ajax.post('/api/medalStudent/addStudent',{remark:this.remark,medal_id:this.medal_id,student_id:this.studentid})
          .then(res=>{
            this.handleCurrentChange(1);
            this.dialogVisible=false;
            this.$message.success(res.data.errmsg);
          })
      },
      //查看
      handleView(row){
        this.studentid=row.studentid;
        this.dialogVisible=true;
        this.dialogName='查看';
        this.$ajax.post('/api/medalStudent/viewStudent',{student_id:this.studentid})
          .then(res=>{
            this.viewInfo=res.data.data.info;
            this.tableDataMedal=res.data.data.viewList;
          })
      },
      //分页
      handleCurrentChange(val) {
        this.pageNum=val;
        this.getTableData();
      },
    }
  }
</script>

<style lang="scss">
    p.info{
        background: #F0F0F0;
        padding: 10px;
        margin-top: 0;
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