(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-482ec982"],{"764c":function(e,t,a){"use strict";var i=a("8388"),l=a.n(i);l.a},8388:function(e,t,a){},c978:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"page"},[a("header",{attrs:{slot:"header"},slot:"header"},[e._v("\n        奖章授予\n    ")]),a("el-form",{staticClass:"search",attrs:{size:"medium","label-width":"60px",inline:!0}},[a("el-form-item",{attrs:{label:"班级"}},[a("el-select",{attrs:{placeholder:"选择班级"},model:{value:e.classId,callback:function(t){e.classId=t},expression:"classId"}},e._l(e.classList,function(e){return a("el-option",{attrs:{label:e.class_name,value:e.id}})}))],1),a("el-form-item",{attrs:{placeholder:"输入学生姓名"},model:{value:e.studentName,callback:function(t){e.studentName=t},expression:"studentName"}}),a("el-form-item",[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.getTableData}},[e._v("查询")])],1)],1),a("el-table",{staticClass:"table",attrs:{data:e.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{align:"center",prop:"studentnmae",label:"学生姓名","min-width":"100",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"xb",label:"性别","min-width":"60",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return["1"===t.row.xb?a("span",[e._v("男")]):"2"===t.row.xb?a("span",[e._v("女")]):a("span",[e._v("未设置")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"counts",label:"获得奖章数","min-width":"80",sortable:""}}),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{icon:"el-icon-news",size:"mini",type:"primary"},on:{click:function(a){e.handleAward(t.row)}}},[e._v("授予")]),a("el-button",{attrs:{icon:"el-icon-view",size:"mini"},on:{click:function(a){e.handleView(t.row)}}},[e._v("查看")])]}}])})],1),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>e.pageSize,expression:"total>pageSize"}],staticClass:"pagination",attrs:{"current-page":e.pageNum,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange}}),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("header",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.dialogName))]),a("el-form",{directives:[{name:"show",rawName:"v-show",value:"授予"===e.dialogName,expression:"dialogName==='授予'"}],attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"成长奖章"}},[a("el-select",{attrs:{placeholder:"选择成长奖章"},model:{value:e.medal_id,callback:function(t){e.medal_id=t},expression:"medal_id"}},e._l(e.medalList,function(e){return a("el-option",{attrs:{label:e.name,value:e.id}})}))],1),a("el-form-item",{attrs:{label:"授予原因"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3}},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}})],1)],1),a("p",{directives:[{name:"show",rawName:"v-show",value:"查看"===e.dialogName,expression:"dialogName==='查看'"}],staticClass:"info"},[e._v(e._s(e.viewInfo.classname)+" "+e._s(e.viewInfo.studentname))]),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"查看"===e.dialogName,expression:"dialogName==='查看'"}],staticClass:"table",attrs:{data:e.tableDataMedal,border:"",stripe:""}},[a("el-table-column",{attrs:{align:"center",prop:"jzname",label:"奖章名称","min-width":"100",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"syrname",label:"授予人","min-width":"60",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"givetime",label:"授予时间","min-width":"80",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"授予原因","min-width":"80",sortable:""}})],1),a("footer",{directives:[{name:"show",rawName:"v-show",value:"授予"===e.dialogName,expression:"dialogName==='授予'"}],attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm()}}},[e._v("确 定")])],1)],1)],1)},l=[],s={data:function(){return{classList:[],classId:"",studentName:"",tableData:[],pageSize:10,pageNum:1,total:1,dialogVisible:!1,dialogName:"",studentid:"",medalList:[],medal_id:"",remark:"",viewInfo:"",tableDataMedal:[]}},created:function(){var e=this;this.$ajax.post("/api/archives/getClassInfoList").then(function(t){e.classList=t.data.data,e.classId=t.data.data[0].id}).then(function(){e.getTableData()})},methods:{getTableData:function(){var e=this;this.$ajax.post("/api/medalStudent/getPage ",{pageSize:this.pageSize,pageNum:this.pageNum,classId:this.classId,studentName:this.studentName}).then(function(t){e.total=t.data.data.records,e.tableData=t.data.data.rows})},handleAward:function(e){this.medal_id="",this.remark="",this.studentid=e.studentid,this.dialogVisible=!0,this.dialogName="授予",this.getMedalList()},getMedalList:function(){var e=this;this.$ajax.post("/api/medalStudent/toAddStudent").then(function(t){e.medalList=t.data.data})},submitForm:function(){var e=this;this.$ajax.post("/api/medalStudent/addStudent",{remark:this.remark,medal_id:this.medal_id,student_id:this.studentid}).then(function(t){e.dialogVisible=!1,e.$message.success(t.data.errmsg)})},handleView:function(e){var t=this;this.studentid=e.studentid,this.dialogVisible=!0,this.dialogName="查看",this.$ajax.post("/api/medalStudent/viewStudent",{student_id:this.studentid}).then(function(e){t.viewInfo=e.data.data.info,t.tableDataMedal=e.data.data.viewList})},handleCurrentChange:function(e){this.pageNum=e,this.getTableData()}}},n=s,o=(a("764c"),a("2877")),r=Object(o["a"])(n,i,l,!1,null,null,null);r.options.__file="table1.vue";t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-482ec982.fb506d34.js.map