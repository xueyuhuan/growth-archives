<template>
    <el-card class="page">
        <header slot="header">
            学校维度
        </header>
        <el-form class="search" size="medium" label-width="60px" :inline="true">
            <el-form-item label="名称">
                <el-input v-model="xxName" placeholder="学校维度名称"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="dimensionalityId" placeholder="国家维度">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in type" :label="i.name" :value="i.id"></el-option>
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
            </el-button-group>
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-check" @click="startOrClose(1)">启用</el-button>
                <el-button size="medium" type="primary" icon="el-icon-close" @click="startOrClose(2)">禁用</el-button>
            </el-button-group>
        </div>
        <el-table class="table" :data="tableData" border stripe @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="40"></el-table-column>
            <el-table-column align="center" prop="bh" label="编号" min-width="40" sortable></el-table-column>
            <el-table-column align="center" prop="order_on" label="排序" min-width="40" sortable></el-table-column>
            <el-table-column align="center" prop="name" label="学校维度" min-width="50"></el-table-column>
            <el-table-column align="center" prop="gjname" label="国家维度" min-width="50"></el-table-column>
            <el-table-column align="center" prop="jlfs" label="记录方式" min-width="40">
                <template slot-scope="scope">{{scope.row.jlfs==='1'?'点选':'录入'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="is_student_add" label="是否允许学生添加" min-width="40">
                <template slot-scope="scope">{{scope.row.is_student_add==='1'?'是':'否'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="growth" label="成长值" min-width="40" sortable></el-table-column>
            <el-table-column align="center" prop="gradelist" label="等级" min-width="100">
                <template slot-scope="scope">
                    <el-table :data="scope.row.gradelist" border size="mini">
                        <el-table-column prop="name" label="等级"></el-table-column>
                        <el-table-column prop="growth" label="成长值"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="status" label="状态" min-width="40" sortable>
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === '1' ? 'success' : 'info'"
                            disable-transitions>{{scope.row.status==='1'?'使用':'禁用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="ms" label="维度描述"></el-table-column>
            <el-table-column prop="ckbz" label="参考标准"></el-table-column>
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
                <el-form-item label="维度名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order_on">
                    <el-input-number v-model="ruleForm.order_on" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="允许学生添加">
                    <el-switch v-model="ruleForm.is_student_add" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="国家维度" prop="dimensionality_id">
                    <el-select v-model="ruleForm.dimensionality_id" placeholder="请选择国家维度">
                        <el-option v-for="i in type" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="记录方式">
                    <el-radio-group v-model="ruleForm.jlfs">
                        <el-radio label="1">点选</el-radio>
                        <el-radio label="2">录入</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template v-if="ruleForm.jlfs==='2'">
                    <el-form-item label="等级设置">
                        <el-button type="primary" plain @click="addGrade" icon="el-icon-plus">新增等级</el-button>
                    </el-form-item>
                    <el-form-item class="grade" v-for="i in ruleForm.gradelist">
                        <el-input class="name" v-model="i.name" placeholder="请输入等级名称"></el-input>
                        <el-input-number class="growth" v-model="i.growth"></el-input-number>
                        <el-button type="danger" icon="el-icon-delete" circle @click.prevent="removeGrade(i)"></el-button>
                    </el-form-item>
                </template>
                <el-form-item label="默认成长分">
                    <el-input-number v-model="ruleForm.growth"></el-input-number>
                </el-form-item>
                <el-form-item label="维度描述" prop="ms">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="ruleForm.ms"></el-input>
                </el-form-item>
                <el-form-item label="参考标准">
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
        dimensionalityId:'',//搜索国家id
        xxName:'',//搜索学校名
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
          grade:'',
          gradelist:[],//等级
          isStudentAdd: '1',//是否允许学生添加
          jlfs: '1',//记录方式
          ms: '',//维度描述
          ckbz:'',//参考
        },
        rules: {
          name: [
            { required: true, message: '维度名称不能为空', trigger: 'blur' },
          ],
          order_on: [
            { required: true, message: '排序不能为空', trigger: 'blur' },
          ],
          dimensionality_id: [
            { required: true, message: '请选择国家维度', trigger: 'change' },
          ],
          growth: [
            { required: true, message: '请输入成长分值', trigger: 'blur' },
          ],
          ms: [
            { required: true, message: '请填写维度描述', trigger: 'blur' },
          ]
        },
      }
    },
    created(){
      this.$ajax.post('/api/dimensionality/main')
        .then(res=>{
          this.type=res.data.data;
        });
      this.getTableData();
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/api/dimensionalitySchool/main',
          {pageSize:this.pageSize,pageNum:this.pageNum,dimensionalityId:this.dimensionalityId,xxName:this.xxName})
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
        this.ruleForm.gradelist=[];
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
          this.ruleForm={...this.multipleSelection[0]};
        }
      },
      addGrade() {
        this.ruleForm.gradelist.push({name: '', growth: ''});
      },
      removeGrade(item) {
        let index = this.ruleForm.gradelist.indexOf(item);
        if (index !== -1) {
          this.ruleForm.gradelist.splice(index, 1)
        }
      },
      //提交
      submitForm(formName) {
        let url=this.dialogName==='添加'?'/api/dimensionalitySchool/add':'/api/dimensionalitySchool/update';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.jlfs==='1'){
              this.ruleForm.grade='';
            }
            else{
              this.ruleForm.grade=JSON.stringify(this.ruleForm.gradelist);
            }
            this.$ajax.post(url,this.ruleForm)
              .then(res=>{
                this.handleCurrentChange(1);
                this.dialogVisible=false;
                this.$message.success(res.data.errmsg);
              })
          } else {
            return false;
          }
        });
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
    .grade .el-form-item__content{
        @include flex;
        .name{
            margin-right: 20px;
            width: 60%;
        }
        .growth{
            margin-right: 20px;
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