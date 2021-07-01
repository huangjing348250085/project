<template>
<div></div>
</template>
<script>
export default {
  async created() {
    let loginId = localStorage.getItem('loginId');
    let loginPwd = localStorage.getItem('loginPwd');
    if(!loginId || !loginPwd){
      //跳转到登录页面
      this.$router.push('/login')
    }else {
    let {success, token} = await this.$get(
        '/Admin/Login',
        {
          loginId,
          loginPwd
        }
    );
    if (success) {
      //保存token
      sessionStorage.setItem('token', token);
      //将token信息放到请求头中
      this.$settoken();
      //跳转到后台管理页面
      this.$router.push('/layout')
    }else {
      //跳转到登录页面
      this.$router.push('/login')
    }
  }
  },
}
</script>

<style scoped>

</style>