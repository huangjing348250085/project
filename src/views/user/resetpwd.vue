<template>
<div style="width: 500px">
  <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
           class="demo-ruleForm">
    <el-form-item  label="原始密码" prop="oldloginPwd">
      <el-input type="password" v-model="ruleForm.oldloginPwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  label="最新密码" prop="newloginPwd">
      <el-input type="password" v-model="ruleForm.newloginPwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  label="确认密码" prop="loginPwd2">
      <el-input type="password" v-model="ruleForm.loginPwd2" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
//导入md5加密方法
import {strtomd5} from "../../util/md5";
export default {
  name: "resetpwd",
  data(){
    //验证原始密码
    var validateOldLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'));
      } else {
        callback();
      }
    };
    //验证最新密码
    var validateNewLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入最新密码'));
      } else {
        callback();
      }
    };
    //验证确认密码
    var validateLoginPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.ruleForm.newloginPwd) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    return{
      ruleForm:{
        //管理员编号
        id:this.$store.state.admin.admin.id,
        //原始密码
        oldloginPwd: "",
        //密码
        newloginPwd: "",
        //确认密码
        loginPwd2: "",
      },
      //表单验证数据
      rules: {
        //验证原始密码
        oldloginPwd: [
          {validator: validateOldLoginPwd, trigger: 'blur'}
        ],
        //验证最新密码
        newloginPwd: [
          {validator: validateNewLoginPwd, trigger: 'blur'}
        ],
        //验证确认密码
        loginPwd2: [
          {validator: validateLoginPwd2, trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    //表单提交方法
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //判断表单是否验证成功
        if (valid) {
          //对原始密码进行加密
          this.ruleForm.oldloginPwd = strtomd5(this.ruleForm.oldloginPwd)
          //对最新密码进行加密
          this.ruleForm.newloginPwd = strtomd5(this.ruleForm.newloginPwd)
          //执行添加功能
          let {success, message} = await this.$post('/Admin/ResetPwd', this.ruleForm)
          //判断是否添加成功
          if (success) {
            this.$msg_s(message)
            //获取最新的信息
            this.getTableData()
            //清空表单
            this.resetForm("ruleForm")
          } else {
            this.$msg_e(message)
          }
        } else {
          return false;
        }
      });
    },
    //表单重置方法
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
      //清空表单数据
      this.ruleForm = {
        //管理员编号
        id:this.$store.state.admin.admin.id,
        //原始密码
        oldloginPwd: "",
        //密码
        newloginPwd: "",
        //确认密码
        loginPwd2: "",
      }
    },
  }
}
</script>

<style scoped>

</style>