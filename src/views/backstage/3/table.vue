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
            <el-table-column align="center" prop="lrsj" label="录入时间" min-width="150" sortable></el-table-column>
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
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="获奖时间">
                    <el-date-picker v-model="ruleForm.archive_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="学校维度" prop="school">
                    <el-select v-model="ruleForm.dimensionality_school_id" placeholder="请选择学校维度" @change="schoolChange">
                        <el-option v-for="i in schoolList" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="ruleForm.grade_id" placeholder="请选择等级" @change="gradeChange">
                        <el-option v-for="i in gradeList" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成长值">
                    <el-input v-model="ruleForm.growth" disabled></el-input>
                </el-form-item>
                <el-form-item label="详细描述" prop="desc">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-success="handleSuccess">
                        <el-button size="mini" type="primary" icon="el-icon-upload">选择上传</el-button>
                    </el-upload>
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
        classList:[],//班级
        classId:'',
        studentList:[],//学生
        studentId:'',
        tableData: [],
        multipleSelection: [],//多选选择项目
        pageSize:10,//
        pageNum:1,//当前页
        total:1,//总页数
        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        schoolList:[],//学校维度列表
        gradeList:[],//等级列表
        ruleForm: {
          student_id:'',//学生id
          title: '',//标题
          archive_date:'',//获奖时间
          dimensionality_school_id: '',//学校维度id
          grade_id:'',//等级id
          growth: '',//成长值
          description:'',//详细描述
          archiveFile:'',//附件
          archiveFileList:[]
        },
        rules: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' },
          ],
          // school: [
          //   { required: true, message: '请选择学校维度', trigger: 'change' }
          // ],
          // desc: [
          //   { required: true, message: '请填写详细描述', trigger: 'blur' },
          // ],
        }
      }
    },
    created(){
      //获取班级
      this.$ajax.post('/api/archives/getClassInfoList')
        .then(res=>{
          this.classList=res.data.data;
        });
      this.getTableData();
    },
    methods: {
      //班级改变
      classChange(){
        this.studentList=[];
        this.studentId='';
        this.$ajax.post('/api/archives/getStudentInfoList',{classId:this.classId})
          .then(res=>{
            this.studentList=res.data.data;
          })
      },
      //获取表格数据
      getTableData(){
        this.$ajax.post('/api/archives/getArchivesPage', {studentId:this.studentId})
          .then(res=>{
            this.total=res.data.data.records;
            this.tableData=res.data.data.rows;
          })
      },
      //获取学校维度列表
      getSchoolList(){
        this.$ajax.post('/api/archives/getSchoolDimensionalityList')
          .then(res=>{
            this.schoolList=res.data.data;
          })
      },
      //学校维度改变
      schoolChange(){
        //置空等级列表和id
        this.gradeList=[];
        this.ruleForm.grade_id='';
        //获取成长值
        this.$ajax.post('/api/archives/getGrowth ',{dimensionality_school_id:this.ruleForm.dimensionality_school_id})
          .then(res=>{
            this.ruleForm.growth=res.data.data.growth;
          });
        //获取等级列表
        this.$ajax.post('/api/archives/getGradeList',{dimensionality_school_id:this.ruleForm.dimensionality_school_id})
          .then(res=>{
            this.gradeList=res.data.data;
          })
      },
      //等级改变
      gradeChange(){
        //获取成长值
        this.$ajax.post('/api/archives/getGrowth ',{grade_id:this.ruleForm.grade_id})
          .then(res=>{
            this.ruleForm.growth=res.data.data.growth;
          });
      },
      //清空数据
      clearForm(){
        this.ruleForm.student_id='';
        this.ruleForm.title='';
        this.ruleForm.archive_date='';
        this.ruleForm.dimensionality_school_id='';
        this.ruleForm.grade_id='';
        this.ruleForm.growth='';
        this.ruleForm.description='';
      },
      //添加
      add(){
        if(this.studentId!==''){
          this.clearForm();
          this.ruleForm.student_id=this.studentId;
          this.dialogVisible=true;
          this.dialogName='添加';
          this.getSchoolList();
        }
        else if(this.multipleSelection.length===1){
          this.clearForm();
          this.ruleForm.student_id=this.multipleSelection[0].student_id;
          this.dialogVisible=true;
          this.dialogName='添加';
          this.getSchoolList();
        }
        else this.$message.warning("请选择学生");
      },
      //图片上传
      handleSuccess(res){
        this.ruleForm.archiveFileList.push(res.path);
        console.log(this.ruleForm.archiveFileList);
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
        let url=this.dialogName==='添加'?'/api/archives/add':'/api/archives/update';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(url,this.ruleForm)
              .then(res=>{
                this.handleCurrentChange(1);
                this.dialogVisible=false;
                this.$message.success(res.data.errmsg);
              })
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除
      del(){
        if(this.multipleSelection.length===0){
          this.$message.warning('请选择数据');
        }
        else{
          let id=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            id.push(this.multipleSelection[i].id);
          }
          console.log(id);
          this.$ajax.post('/api/archives/remove',{id:id})
            .then(res=>{
              this.handleCurrentChange(1);
              this.$message.success(res.data.errmsg)
            })
        }
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
          this.$ajax.post('/api/dimensionalitySchool/toUpdateStatus',{dimensionalitySchoolIds:dimensionalitySchoolIds,status:status})
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