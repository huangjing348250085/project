(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dddedc3c"],{8302:function(e,t,r){"use strict";r("fd84")},"8b28":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"search"},[r("label",{staticStyle:{color:"#666","font-size":"12px"}},[e._v("角色：")]),r("el-select",{staticStyle:{"margin-right":"10px"},attrs:{size:"mini",placeholder:"请选择角色",clearable:""},model:{value:e.roleId,callback:function(t){e.roleId=t},expression:"roleId"}},e._l(e.roleListToSearch,(function(e){return r("el-option",{key:e.roleId,attrs:{label:e.roleName,value:e.roleId}})})),1),r("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.searchClick}},[e._v("查询")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.addclick}},[e._v("添加")])],1),r("el-table",{staticStyle:{width:"99%"},attrs:{data:e.tableData,size:"mini"}},[r("el-table-column",{attrs:{label:"编号",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.id)+" ")]}}])}),r("el-table-column",{attrs:{label:"账号",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.loginId)+" ")]}}])}),r("el-table-column",{attrs:{label:"姓名",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.name)+" ")]}}])}),r("el-table-column",{attrs:{label:"电话",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.phone)+" ")]}}])}),r("el-table-column",{attrs:{label:"头像",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e.BASE_URL_AdminImg+(t.row.photo||"admin_default.jpg"),fit:"cover"}})]}}])}),r("el-table-column",{attrs:{label:"角色",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.role.roleName)+" ")]}}])}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(r){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑 ")]),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.handleDelete(t.$index,t.row)}}},[e._v("删除 ")])]}}])})],1),r("div",{staticClass:"flex j-c",staticStyle:{"margin-top":"5px"}},[r("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.count,"page-size":8},on:{"current-change":e.currentChange}})],1),r("el-drawer",{attrs:{title:e.isadd?"添加账号":"修改账号",visible:e.drawer,direction:"rtl","before-close":e.drawerClose},on:{"update:visible":function(t){e.drawer=t}}},[r("div",{staticStyle:{padding:"0 10px"}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"头像",prop:"photo"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.Upload_AdminImg_URL,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.ruleForm.photo?r("img",{staticClass:"avatar",attrs:{src:e.BASE_URL_AdminImg+e.ruleForm.photo}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),r("el-form-item",{attrs:{label:"账号",prop:"loginId"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.ruleForm.loginId,callback:function(t){e.$set(e.ruleForm,"loginId",t)},expression:"ruleForm.loginId"}})],1),e.isadd?r("el-form-item",{attrs:{label:"密码",prop:"loginPwd"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.loginPwd,callback:function(t){e.$set(e.ruleForm,"loginPwd",t)},expression:"ruleForm.loginPwd"}})],1):e._e(),e.isadd?r("el-form-item",{attrs:{label:"确认密码",prop:"loginPwd2"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.loginPwd2,callback:function(t){e.$set(e.ruleForm,"loginPwd2",t)},expression:"ruleForm.loginPwd2"}})],1):e._e(),r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"电话",prop:"phone"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1),r("el-form-item",{attrs:{label:"角色",prop:"roleId"}},[r("el-select",{attrs:{placeholder:"请选择角色",clearable:""},model:{value:e.ruleForm.roleId,callback:function(t){e.$set(e.ruleForm,"roleId",t)},expression:"ruleForm.roleId"}},e._l(e.roleList,(function(e){return r("el-option",{key:e.roleId,attrs:{label:e.roleName,value:e.roleId}})})),1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v(e._s(e.isadd?"添加":"修改"))]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1)])],1)},a=[],o=r("1da1"),l=(r("caad"),r("96cf"),r("f121")),i=r("907f"),s={name:"role",data:function(){var e=this,t=function(e,t,r){""===t?r(new Error("请输入账号")):r()},r=function(e,t,r){""===t?r(new Error("请输入密码")):r()},n=function(t,r,n){""===r?n(new Error("请输入确认密码")):r!==e.ruleForm.loginPwd?n(new Error("两次密码输入不一致")):n()},a=function(e,t,r){""===t?r(new Error("请输入姓名")):r()},o=function(e,t,r){""===t?r(new Error("请输入手机")):r()},i=function(e,t,r){""===t?r(new Error("请输入角色")):r()};return{tableData:[],count:0,roleId:"",roleListToSearch:[],pageIndex:1,roleList:[],BASE_URL_AdminImg:l["b"],Upload_AdminImg_URL:l["d"],drawer:!1,isadd:!0,ruleForm:{loginId:"",loginPwd:"",loginPwd2:"",name:"",phone:"",roleId:"",photo:""},rules:{loginId:[{validator:t,trigger:"blur"}],loginPwd:[{validator:r,trigger:"blur"}],loginPwd2:[{validator:n,trigger:"blur"}],name:[{validator:a,trigger:"blur"}],phone:[{validator:o,trigger:"blur"}],roleId:[{validator:i,trigger:"change"}]}}},created:function(){this.getTableData(),this.getRoleList()},methods:{getTableData:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$get("/Admin/List",{roleId:e.roleId||0,pageIndex:e.pageIndex,pageSize:8});case 2:r=t.sent,n=r.data,a=r.count,e.tableData=n,e.count=a;case 7:case"end":return t.stop()}}),t)})))()},currentChange:function(e){this.pageIndex=e,this.getTableData()},searchClick:function(){this.getTableData()},getRoleList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$get("/Role/List");case 2:r=t.sent,e.roleList=r,e.roleListToSearch=r;case 5:case"end":return t.stop()}}),t)})))()},handleDelete:function(e,t){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,a,o,l,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.$con_f("是否确定删除？");case 2:return n=t.id,a=t.photo,e.next=6,r.$post("/Admin/Delete",{id:n,photo:a});case 6:o=e.sent,l=o.success,i=o.message,l?(r.$msg_s(i),r.getTableData()):r.$msg_e(i);case 10:case"end":return e.stop()}}),e)})))()},addclick:function(){this.drawer=!0},drawerClose:function(e){this.resetForm("ruleForm"),this.isadd=!0,e()},submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(r){var n,a,o,l,s,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=19;break}if(!t.isadd){e.next=11;break}return t.ruleForm.loginPwd=Object(i["a"])(t.ruleForm.loginPwd),e.next=5,t.$post("/Admin/Add",t.ruleForm);case 5:n=e.sent,a=n.success,o=n.message,a?(t.$msg_s(o),t.getTableData(),t.resetForm("ruleForm")):t.$msg_e(o),e.next=17;break;case 11:return e.next=13,t.$post("/Admin/Update",t.ruleForm);case 13:l=e.sent,s=l.success,u=l.message,s?(t.$msg_s(u),t.getTableData()):t.$msg_e(u);case 17:e.next=20;break;case 19:return e.abrupt("return",!1);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields(),this.ruleForm={loginId:"",loginPwd:"",loginPwd2:"",name:"",phone:"",roleId:"",photo:""}},handleEdit:function(e,t){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.loginId,e.next=3,r.$get("/Admin/GetOne",{loginId:n});case 3:a=e.sent,r.ruleorm=a,r.isadd=!1,r.drawer=!0;case 7:case"end":return e.stop()}}),e)})))()},handleAvatarSuccess:function(e){var t=e.success,r=e.filename;t&&(this.ruleForm.photo=r)},beforeAvatarUpload:function(e){var t=["image/jpeg","image/png","image/gif"],r=t.includes(e.type),n=e.size/1024/1024<1;return r||this.$message.error("上传头像图片只能是 JPG,PNG,GIF 格式!"),n||this.$message.error("上传头像图片大小不能超过 1MB!"),r&&n}}},u=s,c=(r("8302"),r("0c7c")),d=Object(c["a"])(u,n,a,!1,null,"26c1eea1",null);t["default"]=d.exports},fd84:function(e,t,r){}}]);