<template>
    <el-card class="page">
        <header slot="header">
            评价设置
        </header>
        <div class="btn">
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
            </el-button-group>
            <!--<el-button-group>-->
                <!--<el-button size="medium" type="primary" icon="el-icon-check" @click="startOrClose(1)">启用</el-button>-->
                <!--<el-button size="medium" type="primary" icon="el-icon-close" @click="startOrClose(2)">禁用</el-button>-->
            <!--</el-button-group>-->
        </div>
        <el-table class="table" :data="tableData" border stripe>
            <el-table-column align="center" prop="xn" label="学年" min-width="120" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.xn}}学年</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="xq" label="学期" min-width="80" sortable>
                <template slot-scope="scope">
                    <span>第{{scope.row.xq}}学期</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="weekly" label="总周次数" min-width="40"></el-table-column>
            <el-table-column align="center" prop="per" label="评价频率" min-width="80">
                <template slot-scope="scope">
                    <span>每{{scope.row.per}}周</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="startdate" label="学期开始日期" min-width="120"></el-table-column>
            <el-table-column align="center" prop="status" label="状态" min-width="40" sortable>
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === '1' ? 'success' : 'info'"
                            disable-transitions>{{scope.row.status==='1'?'使用':'停用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="120">
                <template slot-scope="scope">
                    <el-button icon="el-icon-check" size="mini"
                               @click="handleStart(scope.row)">使用</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"
                               @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible">
            <header slot="title">{{dialogName}}</header>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="学年" required>
                    <el-col :span="11">
                        <el-form-item prop="xn1">
                            <el-date-picker type="year" value-format="yyyy" placeholder="选择学年" v-model="ruleForm.xn1"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="xn2">
                            <el-date-picker type="year" value-format="yyyy" placeholder="选择学年" v-model="ruleForm.xn2"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="学期" prop="xq">
                    <el-radio-group v-model="ruleForm.xq">
                        <el-radio label="1">第1学期</el-radio>
                        <el-radio label="2">第2学期</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="总周次数">
                    <el-input-number v-model="ruleForm.weekly" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="评价频率">
                    <el-input-number v-model="ruleForm.per" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="学期开始日" prop="startdate">
                    <el-date-picker v-model="ruleForm.startdate" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio label="1">使用</el-radio>
                        <el-radio label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-alert
                    title="选择为使用后，其他学期将均为停用状态"
                    type="success">
            </el-alert>
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
          xn: '',//学年
          xn1:'',
          xn2:'',
          xq:'1',//学期
          weekly: 1,//总周次数
          per:1,//评价频率
          startdate: '',//学期开始日期
          status: '1',//状态
        },
        rules: {
          xn1: [
            { required: true, message: '请选择开始学年', trigger: 'change' },
          ],
          xn2: [
            { required: true, message: '请选择结束学年', trigger: 'change' },
          ],
          startdate:[
            { required: true, message: '请选择学期开始日期', trigger: 'change' },
          ]
        }
      }
    },
    created(){
      this.getTableData();
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/api/processPc/main')
          .then(res=>{
            this.tableData=res.data.data;
          })
      },
      //清空数据
      clearForm(){
        this.ruleForm.xn='';
        this.ruleForm.xn1='';
        this.ruleForm.xn2='';
        this.ruleForm.startdate='';
      },
      //添加
      add(){
        this.clearForm();
        this.dialogVisible=true;
        this.dialogName='添加';
      },
      //提交
      submitForm(formName) {
        let url=this.dialogName==='添加'?'/api/processPc/add':'/api/processPc/update';
        this.ruleForm.xn=this.ruleForm.xn1+'-'+this.ruleForm.xn2;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(url,this.ruleForm)
              .then(res=>{
                this.getTableData();
                this.dialogVisible=false;
                this.$message.success(res.data.errmsg);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //启用或停用
      handleStart(row){
        this.$ajax.post('/api/processPc/updateStatus',{id:row.id})
          .then(res=>{
            this.getTableData();
            this.$message.success(res.data.errmsg);
          })
      },
      //删除
      handleDel(row){
        console.log(row);
        this.$ajax.post('/api/processPc/remove',{id:row.id})
          .then(res=>{
            this.getTableData();
            this.$message.success(res.data.errmsg);
          })
      }
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