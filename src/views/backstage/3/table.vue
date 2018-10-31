<template>
    <el-card class="page">
        <header slot="header">
            档案管理
        </header>
        <el-form class="search" size="medium" label-width="60px" :inline="true">
            <el-form-item label="班级">
                <el-select v-model="classId" placeholder="请选择班级" @change="classChange">
                    <el-option v-for="i in classList" :label="i.class_name" :value="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学生">
                <el-select v-model="studentId" placeholder="请选择学生">
                    <el-option v-for="i in studentList" :label="i.userName" :value="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="getTableData">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
                <el-button size="medium" type="primary" icon="el-icon-edit" @click="editor">编辑</el-button>
                <el-button size="medium" type="primary" icon="el-icon-delete" @click="del">删除</el-button>
            </el-button-group>
            <!--<el-button-group>-->
                <!--<el-button size="medium" type="primary" icon="el-icon-check" @click="startOrClose(1)">启用</el-button>-->
                <!--<el-button size="medium" type="primary" icon="el-icon-close" @click="startOrClose(2)">禁用</el-button>-->
            <!--</el-button-group>-->
        </div>
        <el-table class="table" :data="tableData" border stripe @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column align="center" prop="studentname" label="学生" min-width="60"></el-table-column>
            <el-table-column align="center" prop="xxwdname" label="学校维度" min-width="100" sortable></el-table-column>
            <el-table-column align="center" prop="title" label="标题" min-width="180"></el-table-column>
            <el-table-column align="center" prop="lrsname" label="录入人" min-width="80"></el-table-column>
            <el-table-column align="center" prop="growth" label="成长值" min-width="50" sortable></el-table-column>
            <el-table-column align="center" prop="archive_date" label="录入时间" min-width="150" sortable></el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       @current-change="handleCurrentChange"
                       :current-page=pageNum
                       :page-size=pageSize
                       layout="total, prev, pager, next, jumper"
                       :total=total>
        </el-pagination>
        <el-dialog :visible.sync="dialogVisible">
            <header slot="title">{{dialogName}}</header>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="维度名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="name">
                    <el-input-number v-model="ruleForm.order_on" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="允许学生添加">
                    <el-switch v-model="ruleForm.is_student_add" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="国家维度" prop="name">
                    <el-select v-model="ruleForm.dimensionality_id" placeholder="请选择国家维度">
                        <el-option v-for="i in type" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="记录方式" prop="name">
                    <el-radio-group v-model="ruleForm.jlfs">
                        <el-radio label="1">点选</el-radio>
                        <el-radio label="2">录入</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="默认成长分" prop="name">
                    <el-input-number v-model="ruleForm.growth"></el-input-number>
                </el-form-item>
                <el-form-item label="维度描述" prop="name">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="ruleForm.ms"></el-input>
                </el-form-item>
                <el-form-item label="参考标准" prop="name">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="ruleForm.ckbz"></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </footer>
        </el-dialog>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
            classId:'',
        studentList:[],//学生
        studentId:'',
        type:[],//国家维度列表
        tableData: [],
        multipleSelection: [],//多选选择项目
        pageSize:10,//
        pageNum:1,//当前页
        total:1,//总页数
        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        ruleForm: {
          name: '',//学校维度名
          dimensionality_id:'',//国家维度名
          order_on: 1,//排序
          growth: 0,//成长值
          isStudentAdd: false,//是否允许学生添加
          jlfs: '1',//记录方式
          ms: '',//维度描述
          ckbz:'',//参考
        },
        rules: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    created(){
      this.$ajax.post('/archives/getClassInfoList')
        .then(res=>{
          console.log(res.data.data);
          this.classList=res.data.data;
        });
      this.getTableData();
    },
    methods: {
      //班级改变
      classChange(){
        this.studentList=[];
        this.studentId='';
        this.$ajax.post('/archives/getStudentInfoList',{classId:this.classId})
          .then(res=>{
            this.studentList=res.data.data;
          })
      },
      //获取表格数据
      getTableData(){
        this.$ajax.post('/archives/getArchivesPage ', {studentId:this.studentId})
          .then(res=>{
            this.total=res.data.data.records;
            this.tableData=res.data.data.rows;
          })
      },
      //清空数据
      clearForm(){
        this.ruleForm.name='';
        this.ruleForm.dimensionality_id='';
        this.ruleForm.ms='';
        this.ruleForm.ckbz='';
      },
      //添加
      add(){
        this.clearForm();
        this.dialogVisible=true;
        this.dialogName='添加';
      },
      //编辑
      editor(){
        if(this.multipleSelection.length===0){
          this.$message.warning('请选择数据');
        }
        else if(this.multipleSelection.length>1){
          this.$message.warning('只能选择一项编辑');
        }
        else {
          this.dialogVisible=true;
          this.dialogName='编辑';
          this.ruleForm=this.multipleSelection[0];
        }
      },
      //提交
      submitForm(formName) {
        let url=this.dialogName==='添加'?'/dimensionalitySchool/add':'/dimensionalitySchool/update';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            this.$ajax.post(url,this.ruleForm)
              .then(res=>{
                this.handleCurrentChange(1);
                this.dialogVisible=false;
                this.$message.success(res.data.errmsg);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      del(){

      },
      startOrClose(status){
        if(this.multipleSelection.length===0){
          this.$message.warning('请选择数据');
        }
        else{
          let dimensionalitySchoolIds=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            dimensionalitySchoolIds.push(this.multipleSelection[i].id);
          }
          this.$ajax.post('/dimensionalitySchool/toUpdateStatus',{dimensionalitySchoolIds:dimensionalitySchoolIds,status:status})
            .then(res=>{
              this.handleCurrentChange(1);
              this.$message.success(res.data.errmsg)
            })
        }
      },
      //多选
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection=val;
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