(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e72a10a0"],{4012:function(e,t,a){"use strict";var l=a("677b"),r=a.n(l);r.a},"677b":function(e,t,a){},f9d9:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"page"},[a("header",{attrs:{slot:"header"},slot:"header"},[e._v("\n        成长奖章\n    ")]),a("div",{staticClass:"btn"},[a("el-button-group",[a("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-plus"},on:{click:e.add}},[e._v("添加")])],1),a("el-button-group",[a("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-check"},on:{click:function(t){e.startOrClose(1)}}},[e._v("启用")]),a("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-close"},on:{click:function(t){e.startOrClose(2)}}},[e._v("禁用")])],1)],1),a("el-table",{staticClass:"table",attrs:{data:e.tableData,border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"40"}}),a("el-table-column",{attrs:{align:"center",prop:"bh",label:"编号","min-width":"40",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"order_on",label:"排序","min-width":"40",sortable:""}}),a("el-table-column",{attrs:{align:"center",prop:"name",label:"奖章名称","min-width":"100"}}),a("el-table-column",{attrs:{align:"center",prop:"rolename",label:"使用人员","min-width":"80"}}),a("el-table-column",{attrs:{align:"center",prop:"jzsl",label:"奖章示例","min-width":"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"40px"},attrs:{src:e.$proxy+t.row.jzsl}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"remark",label:"奖励描述","min-width":"150"}}),a("el-table-column",{attrs:{align:"center",prop:"status",label:"状态","min-width":"40",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"1"===t.row.status?"success":"info","disable-transitions":""}},[e._v(e._s("1"===t.row.status?"使用":"禁用"))])]}}])})],1),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>e.pageSize,expression:"total>pageSize"}],staticClass:"pagination",attrs:{"current-page":e.pageNum,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange}}),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("header",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.dialogName))]),a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"奖章名称",prop:"name"}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),a("el-form-item",{attrs:{label:"排序",prop:"name"}},[a("el-input-number",{attrs:{min:1},model:{value:e.ruleForm.order_on,callback:function(t){e.$set(e.ruleForm,"order_on",t)},expression:"ruleForm.order_on"}})],1),a("el-form-item",{attrs:{label:"使用人员",prop:"name"}},[a("el-select",{attrs:{placeholder:"请选择使用人员"},model:{value:e.ruleForm.role_id,callback:function(t){e.$set(e.ruleForm,"role_id",t)},expression:"ruleForm.role_id"}},e._l(e.roleList,function(e){return a("el-option",{attrs:{label:e.name,value:e.id}})}))],1),a("el-form-item",{attrs:{label:"状态",prop:"name"}},[a("el-radio-group",{model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[a("el-radio",{attrs:{label:"1"}},[e._v("使用")]),a("el-radio",{attrs:{label:"2"}},[e._v("禁用")])],1)],1),a("el-form-item",{attrs:{label:"奖章示例"}},[a("el-upload",{attrs:{action:e.$proxy+"/upload/uploadFile","on-success":e.handleSuccess}},[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-upload"}},[e._v("选择上传")]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),a("el-form-item",{attrs:{label:"奖励描述",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2}},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),a("footer",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},r=[],i=a("c93e"),o=(a("cadf"),a("551c"),a("097d"),{data:function(){return{tableData:[],multipleSelection:[],pageSize:10,pageNum:1,total:1,dialogVisible:!1,dialogName:"",roleList:[],ruleForm:{name:"",role_id:"",order_on:1,status:"1",jzsl:"",remark:""},rules:{name:[{required:!0,message:"不能为空",trigger:"blur"}]}}},created:function(){var e=this;this.$ajax.post("/api/medal/toAddMedal").then(function(t){e.roleList=t.data.roleList}),this.getTableData()},methods:{getTableData:function(){var e=this;this.$ajax.post("/api/medal/getPage",{pageSize:this.pageSize,pageNum:this.pageNum}).then(function(t){e.total=t.data.data.records,e.tableData=t.data.data.rows})},clearForm:function(){this.ruleForm.name="",this.ruleForm.role_id="",this.ruleForm.jzsl="",this.ruleForm.remark=""},add:function(){this.clearForm(),this.dialogVisible=!0,this.dialogName="添加"},handleSuccess:function(e){this.ruleForm.jzsl=e.path},editor:function(){0===this.multipleSelection.length?this.$message.warning("请选择数据"):this.multipleSelection.length>1?this.$message.warning("只能选择一项编辑"):(this.dialogVisible=!0,this.dialogName="编辑",this.ruleForm=Object(i["a"])({},this.multipleSelection[0]))},submitForm:function(e){var t=this,a="添加"===this.dialogName?"/api/medal/addMedal":"/api/medal/update";this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$ajax.post(a,t.ruleForm).then(function(e){t.handleCurrentChange(1),t.dialogVisible=!1,t.$message.success(e.data.errmsg)})})},startOrClose:function(e){var t=this;if(0===this.multipleSelection.length)this.$message.warning("请选择数据");else{for(var a=[],l=0;l<this.multipleSelection.length;l++)a.push(this.multipleSelection[l].id);this.$ajax.post("/api/medal/setMedalStatus",{ids:a,status:e}).then(function(e){t.handleCurrentChange(1),t.$message.success(e.data.errmsg)})}},handleSelectionChange:function(e){console.log(e),this.multipleSelection=e},handleCurrentChange:function(e){this.pageNum=e,this.getTableData()}}}),s=o,n=(a("4012"),a("2877")),u=Object(n["a"])(s,l,r,!1,null,null,null);u.options.__file="table2.vue";t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-e72a10a0.43027b97.js.map