(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-664bd9a1"],{"08ab":function(a,t,e){"use strict";var s=e("1fe7"),l=e.n(s);l.a},"1fe7":function(a,t,e){},"2aa2":function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("el-card",{staticClass:"page"},[e("header",{attrs:{slot:"header"},slot:"header"},[a._v("\n        成长奖励\n    ")]),e("el-form",{staticClass:"search",attrs:{size:"medium","label-width":"60px",inline:!0}},[e("el-form-item",{attrs:{label:"班级"}},[e("el-select",{attrs:{placeholder:"选择班级"},model:{value:a.search.classId,callback:function(t){a.$set(a.search,"classId",t)},expression:"search.classId"}},a._l(a.classList,function(a){return e("el-option",{attrs:{label:a.class_name,value:a.id}})}))],1),e("el-form-item",{attrs:{label:"日期"}},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:a.search.date,callback:function(t){a.$set(a.search,"date",t)},expression:"search.date"}})],1),e("el-form-item",[e("el-button",{attrs:{size:"medium",type:"primary"},on:{click:a.getTableData}},[a._v("查询")])],1)],1),e("div",{staticClass:"btn"},[e("el-button-group",[e("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-star-off"},on:{click:a.save}},[a._v("保存")])],1)],1),e("el-table",{staticClass:"table",attrs:{data:a.tableData,border:"",stripe:""}},[e("el-table-column",{attrs:{align:"center",prop:"studentname",label:"学生姓名","min-width":"100"}}),a._l(a.tableHeader,function(t){return e("el-table-column",{attrs:{align:"center",prop:"a"+t.bh,label:t.name,"min-width":"100"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:t.row[t.column.property],callback:function(e){a.$set(t.row,t.column.property,e)},expression:"scope.row[scope.column.property]"}})]}}])})})],2)],1)},l=[],r=(e("386d"),e("cadf"),e("551c"),e("097d"),{data:function(){return{classList:[],search:{classId:"",date:new Date},tableHeader:[],tableData:[]}},created:function(){var a=this;this.$ajax.post("/api/archives/getClassInfoList").then(function(t){a.classList=t.data.data,a.search.classId=t.data.data[0].id}).then(function(){a.getTableData()}),this.$ajax.post("/api/archives/getbtList").then(function(t){a.tableHeader=t.data.data})},methods:{getTableData:function(){var a=this;console.log(this.search),this.$ajax.post("/api/archives/getRewardList",this.search).then(function(t){a.tableData=t.data.data})},save:function(){var a=this,t=JSON.stringify(this.tableData);console.log(t),this.$ajax.post("/api/archives/addReward",{table:t,classId:this.search.classId,date:this.search.date}).then(function(t){a.$message.success(t.data.errmsg)})}}}),n=r,c=(e("08ab"),e("2877")),i=Object(c["a"])(n,s,l,!1,null,null,null);i.options.__file="table.vue";t["default"]=i.exports},"386d":function(a,t,e){e("214f")("search",1,function(a,t,e){return[function(e){"use strict";var s=a(this),l=void 0==e?void 0:e[t];return void 0!==l?l.call(e,s):new RegExp(e)[t](String(s))},e]})}}]);
//# sourceMappingURL=chunk-664bd9a1.ddedc566.js.map