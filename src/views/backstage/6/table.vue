<template>
    <el-card class="page">
        <header slot="header">
            成长奖励
        </header>
        <el-form class="search" size="medium" label-width="60px" :inline="true">
            <el-form-item label="班级">
                <el-select v-model="search.classId" placeholder="选择班级">
                    <el-option v-for="i in classList" :label="i.class_name" :value="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker v-model="search.date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="getTableData">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-star-off" @click="save">保存</el-button>
            </el-button-group>
        </div>
        <el-table class="table" :data="tableData" border stripe>
            <el-table-column align="center" prop="studentname" label="学生姓名" min-width="100"></el-table-column>
            <el-table-column v-for="i in tableHeader" align="center" :prop="'a'+i.bh" :label="i.name" min-width="100">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row[scope.column.property]" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        classList:[],
        search:{
          classId:'',
          date:new Date()
        },
        tableHeader:[],
        tableData:[]
      }
    },
    created(){
      //获得班级列表
      this.$ajax.post('/api/archives/getClassInfoList')
        .then(res=>{
          this.classList=res.data.data;
          this.search.classId=res.data.data[0].id;
        })
        .then(()=>{
          this.getTableData();
        });
      //获得表格头
      this.$ajax.post('/api/archives/getbtList')
        .then(res=>{
          this.tableHeader=res.data.data;
        });
    },
    methods: {
      getTableData(){
        console.log(this.search);
        this.$ajax.post('/api/archives/getRewardList',this.search)
          .then(res=>{
            this.tableData=res.data.data;
          });
      },
      save(){
        let temp=JSON.stringify(this.tableData);
        console.log(temp);
        this.$ajax.post('/api/archives/addReward',{table:temp,classId:this.search.classId,date:this.search.date})
          .then(res=>{
            this.$message.success(res.data.errmsg);
          });
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