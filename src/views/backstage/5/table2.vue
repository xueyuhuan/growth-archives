<template>
    <el-card class="page">
        <header slot="header">
            成长奖章
        </header>
        <div class="btn">
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
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
            <el-table-column align="center" prop="name" label="奖章名称" min-width="100"></el-table-column>
            <el-table-column align="center" prop="rolename" label="使用人员" min-width="80"></el-table-column>
            <el-table-column align="center" prop="jzsl" label="奖章示例" min-width="50">
                <template slot-scope="scope">
                    <img style="width: 40px" :src="$proxy+scope.row.jzsl"/>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="奖励描述" min-width="150"></el-table-column>
            <el-table-column align="center" prop="status" label="状态" min-width="40" sortable>
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === '1' ? 'success' : 'info'"
                            disable-transitions>{{scope.row.status==='1'?'使用':'禁用'}}</el-tag>
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
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="奖章名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="name">
                    <el-input-number v-model="ruleForm.order_on" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="使用人员" prop="name">
                    <el-select v-model="ruleForm.role_id" placeholder="请选择使用人员">
                        <el-option v-for="i in roleList" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="name">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio label="1">使用</el-radio>
                        <el-radio label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="奖章示例">
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-success="handleSuccess">
                        <el-button size="mini" type="primary" icon="el-icon-upload">选择上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="奖励描述" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="ruleForm.remark"></el-input>
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
        tableData: [],
        multipleSelection: [],//多选选择项目
        pageSize:10,//
        pageNum:1,//当前页
        total:1,//总页数
        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        roleList:[],//使用人员列表
        ruleForm: {
          name: '',//奖章名
          role_id:'',//使用人员
          order_on: 1,//排序
          status: '1',//状态
          jzsl: '',//奖章图片地址
          remark:'',//奖励描述
        },
        rules: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    created(){
      this.$ajax.post('/api/medal/toAddMedal')
        .then(res=>{
          this.roleList=res.data.roleList;
        });
      this.getTableData();
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/api/medal/getPage', {pageSize:this.pageSize,pageNum:this.pageNum})
          .then(res=>{
            this.total=res.data.data.records;
            this.tableData=res.data.data.rows;
          })
      },
      //清空数据
      clearForm(){
        this.ruleForm.name='';
        this.ruleForm.role_id='';
        this.ruleForm.jzsl='';
        this.ruleForm.remark='';
      },
      //添加
      add(){
        this.clearForm();
        this.dialogVisible=true;
        this.dialogName='添加';
      },
      //图片上传
      handleSuccess(res){
        this.ruleForm.jzsl=res.path;
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
      },//提交
      submitForm(formName) {
        let url=this.dialogName==='添加'?'/api/medal/addMedal':'/api/medal/update';
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
      startOrClose(status){
        if(this.multipleSelection.length===0){
          this.$message.warning('请选择数据');
        }
        else{
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          this.$ajax.post('/api/medal/setMedalStatus',{ids:ids,status:status})
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