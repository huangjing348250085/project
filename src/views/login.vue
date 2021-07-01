<template>
  <div class="main">
    <!--    背景画布-->
    <canvas id="particle-canvas" width="870" height="571"></canvas>
    <div class="content">
      <div class="login">
        <h4 class="title">Bing酒店管理系统</h4>
        <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px"
                 class="demo-ruleForm">
          <el-form-item label="账号" prop="loginId">
            <el-input v-model="ruleForm.loginId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="loginPwd">
<!--            给密码文本框添加一个键盘按下事件（该事件只对enter键生效）-->
            <el-input type="password" v-model="ruleForm.loginPwd" autocomplete="off"
                      @keydown.native.enter="loginPwdEnter"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="ruleForm.checkedme"  @keydown.native.enter="loginPwdEnter">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//导入md5加密方法
import {strtomd5} from "../util/md5";
//导入背景画布动画方法
import {start} from '../assets/js/login'
export default {
  //DOM加载完毕
  mounted() {
    //调用背景动画方法
    start()
  },

  data() {
    //验证账号
    var validateLoginId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    //验证密码的方法
    var validateLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      //表单数据
      ruleForm: {
        //登录名字
        loginId: '',
        //登录密码
        loginPwd: '',
        //记住我
        checkedme:false,
      },
      //表单验证数据
      rules: {
        //验证账号
        loginId: [
          {validator: validateLoginId, trigger: 'blur'}
        ],
        //验证密码
        loginPwd: [
          {validator: validateLoginPwd, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    //密码框键盘按下回车事件
    loginPwdEnter(){
      this.submitForm('ruleForm')
    },
    //表单提交方法
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //判断表单是否验证成功
        if (valid) {
          //实现登录
          //对密码进行加密
          this.ruleForm.loginPwd = strtomd5(this.ruleForm.loginPwd)
          let {message, success, token} = await this.$get('/Admin/Login', this.ruleForm)
          //判断是否登录成功
          if (success) {
            //服务器会返回一个token令牌，令牌中是你的身份信息
            //保存该信息，通常保存在浏览器的缓存空间中
            //浏览器的缓存空间有两种，sessionstorage和localstorage
            //区别：localstorage中的信息一直存在，sessionstorage会随着浏览器的关闭而自动清空
            sessionStorage.setItem('token', token)
            //在浏览器中保存登录名
            localStorage.setItem('loginId',this.ruleForm.loginId)
            //判断是否需要记住密码
            if(this.ruleForm.checkedme){
              //保存密码
              localStorage.setItem('loginPwd',this.ruleForm.loginPwd)
            }
            //将token信息放到请求头中
            this.$settoken()
            //跳转到后台管理页面
            this.$router.push('/layout')
          }
        else {
            this.$msg_e(message,2000)
          }
        } else {
          return false;
        }
      });
    },
    //表单重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="scss">
//背景画布样式
#particle-canvas {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, rgb(10, 10, 50) 0%, rgb(60, 10, 60) 100%);
  vertical-align: middle;
}

.main {
  width: 100%;
  height: 100%;
  position: relative;
  .content{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    .login {
      width: 440px;
      border-radius: 20px;
      border: 1px solid #ccc;
      padding: 20px ;
      font-family: mwt;
      .title{
        color: white;
        text-align: center;
        font-size: 23px;
        margin-bottom: 26px;
        font-weight: 100;
      }
    }
  }
}
</style>