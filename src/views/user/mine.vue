<template>
<div class="flex">
  <div>
    <el-image
        style="width: 200px; height: 220px"
        :src="BASE_URL_AdminImg+(admin.photo||'admin_default.jpg')"
        fit="cover"></el-image>
  </div>
  <div class="content">
    <p>账号：{{admin.roleId}}</p>
    <p>姓名：{{admin.name}}</p>
    <p>电话：{{admin.phone}}</p>
    <p>角色：{{admin.role.roleName}}</p>
  </div>
</div>
</template>

<script>
//导入账户的照片路径
import {BASE_URL_AdminImg} from '../../config'
//导入vuex的映射函数
import {mapState} from 'vuex'
export default {
  name: "mine",
  data(){
    return{
      BASE_URL_AdminImg
    }
  },
computed:{
    ...mapState('admin',['admin'])
}
}
</script>

<style scoped lang="scss">
.content{
  margin-left: 10px;
  p{
    line-height: 50px;
  }
}
</style>