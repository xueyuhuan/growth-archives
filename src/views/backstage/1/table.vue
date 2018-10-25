<template>
    <el-card class="page">
        <header slot="header">
            学校维度
        </header>
        <!--<el-form class="search" size="medium" label-width="60px" :inline="true" :model="formInline">-->
            <!--<el-form-item label="名称">-->
                <!--<el-input v-model="formInline.name" placeholder="项目名称"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="类型">-->
                <!--<el-select v-model="formInline.type" placeholder="项目类型">-->
                    <!--<el-option label="出国交换生" value="shanghai"></el-option>-->
                    <!--<el-option label="出境交换生" value="beijing"></el-option>-->
                    <!--<el-option label="出国游学项目" value="shanghai"></el-option>-->
                    <!--<el-option label="出境游学项目" value="beijing"></el-option>-->
                    <!--<el-option label="国际会议" value="shanghai"></el-option>-->
                    <!--<el-option label="其他项目" value="beijing"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button size="medium" type="primary" @click="search">查询</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <div class="btn">
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-plus">添加</el-button>
                <el-button size="medium" type="primary" icon="el-icon-edit">编辑</el-button>
            </el-button-group>
            <el-button-group>
                <el-button size="medium" type="primary" icon="el-icon-check">启用</el-button>
                <el-button size="medium" type="primary" icon="el-icon-close">禁用</el-button>
            </el-button-group>
        </div>
        <el-table class="table" :data="tableData" border stripe>
            <el-table-column align="center" type="selection" width="40">
            </el-table-column>
            <el-table-column align="center" prop="number" label="编号" min-width="40" sortable></el-table-column>
            <el-table-column align="center" prop="sort" label="排序" min-width="40" sortable></el-table-column>
            <el-table-column align="center" prop="second" label="二级维度" min-width="40"></el-table-column>
            <el-table-column align="center" prop="first" label="一级维度" min-width="40"></el-table-column>
            <el-table-column align="center" prop="way" label="记录方式" min-width="50" sortable></el-table-column>
            <el-table-column align="center" prop="add" label="是否允许学生添加" min-width="40"></el-table-column>
            <el-table-column align="center" prop="value" label="成长值" min-width="40" sortable></el-table-column>
            <el-table-column align="center" prop="state" label="状态" min-width="40" sortable>
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.state === '使用中' ? 'success' : 'info'"
                            disable-transitions>{{scope.row.state}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="des" label="维度描述"></el-table-column>
            <el-table-column prop="reference" label="参考标准"></el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       @current-change="handleCurrentChange"
                       :current-page="1"
                       :page-size="20"
                       layout="total, prev, pager, next, jumper"
                       :total="40">
        </el-pagination>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          name: '',
          type: ''
        },
        tableData: [
          {
            number:'X001',//编号
            sort:1,//排序
            second:'吃饭没有浪费',//二级维度
            first:'思想品德',//一级维度
            way:'方式1',//记录方式
            add:'是',//是否允许学生添加
            value:1,//成长值
            state:'使用中',//状态
            des:'1.见到师长、同学主动问好，在公共场所不大声喧哗；\n2.走路时轻声慢步靠右行，废弃物分类放入垃圾箱；',//维度描述
            reference:'1.见到师长、同学主动问好，在公共场所不大声喧哗；\n2.走路时轻声慢步靠右行，废弃物分类放入垃圾箱；'//参考标准
          },
          {
            number:'X001',//编号
            sort:1,//排序
            second:'吃饭没有浪费',//二级维度
            first:'思想品德',//一级维度
            way:'方式1',//记录方式
            add:'是',//是否允许学生添加
            value:1,//成长值
            state:'使用中',//状态
            des:'1.见到师长、同学主动问好，在公共场所不大声喧哗；\n2.走路时轻声慢步靠右行，废弃物分类放入垃圾箱；',//维度描述
            reference:'1.见到师长、同学主动问好，在公共场所不大声喧哗；\n2.走路时轻声慢步靠右行，废弃物分类放入垃圾箱；'//参考标准
          },
          {
            number:'X001',//编号
            sort:1,//排序
            second:'吃饭没有浪费',//二级维度
            first:'思想品德',//一级维度
            way:'方式1',//记录方式
            add:'是',//是否允许学生添加
            value:1,//成长值
            state:'使用中',//状态
            des:'1.见到师长、同学主动问好，在公共场所不大声喧哗；\n2.走路时轻声慢步靠右行，废弃物分类放入垃圾箱；',//维度描述
            reference:'1.见到师长、同学主动问好，在公共场所不大声喧哗；\n2.走路时轻声慢步靠右行，废弃物分类放入垃圾箱；'//参考标准
          }
        ]
      }
    },
    methods: {
      //搜索
      search() {
        console.log('search!');
      },
      //分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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