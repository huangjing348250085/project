<template>
  <div>
    <div class="main">
      <!--      左侧导航-->
      <div class="left" :style="{backgroundColor:themecolor,width:(!isCollapse)?'200px':'auto'}">
        <div class="logo">Bing</div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :background-color="themecolor"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item v-if="$store.state.admin.admin.roleId===1" index="/layout/role">角色管理</el-menu-item>
            <el-menu-item index="/layout/admin">账号管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>客房管理</span>
            </template>
            <el-menu-item v-if="$store.state.admin.admin.roleId===1" index="/layout/roomtype">类型管理</el-menu-item>
            <el-menu-item index="/layout/room">客房管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item index="/layout/guest">客户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4" v-if="$store.state.admin.admin.roleId===1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/layout/permission">权限管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!--      左侧导航end-->
      <!--右侧内容-->
      <div class="right">
        <!--        顶部导航-->
        <div class="nav" :style="{backgroundColor:themecolor}">
          <div class="icon" @click="isCollapse=!isCollapse">
            <i :class="!isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"></i>
          </div>
<!--          router属性，设置导航栏，开启路由模式-->
          <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              :background-color="themecolor"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="min-width: 650px"
          router>
            <el-menu-item index="/layout"><i class="el-icon-s-home"></i>Home</el-menu-item>
            <el-menu-item index="/layout/message"><i class="el-icon-s-comment"></i>Message</el-menu-item>
            <el-menu-item index="/layout/email"><i class="el-icon-message"></i>Email</el-menu-item>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-help"></i>Theme</template>
              <el-menu-item @click="changetheme(item.value)" :index="item.value" v-for="(item,index) in theme"
                            :key="index">{{ item.name }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-user-solid"></i>{{admin.name}}</template>
              <el-menu-item index="/layout/mine">个人中心</el-menu-item>
              <el-menu-item index="/layout/resetpwd">修改密码</el-menu-item>
              <el-menu-item  @click="exit">退出系统</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <!--        顶部导航end-->
        <!--内容区域-->
        <div class="content">
          <!--          路由视图-->
          <router-view></router-view>
        </div>
        <!--内容区域end-->
      </div>
      <!--右侧内容end-->
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: "layout",
  data() {
    return {
      activeIndex2: '1',
      //主题颜色:先从浏览器缓存中获取颜色，若没有，给一个默认值
      themecolor: localStorage.getItem('theme') || '#101f30',
      //是否折叠左侧菜单
      isCollapse: false,
    };
  },
  created() {
    //获取当前登录用户的用户名
    let loginId = localStorage.getItem('loginId')
    //如果用户名为空，跳回登录页面
    if (!loginId){
      this.$router.push('/login')
    }
    //根据用户名获取用户信息
    let res =this.$get('/Admin/GetOne',{loginId}).then(
        res=>{
          this.setadmin(res)
          //在浏览器缓存中，保存当前登录用户的角色编号
          localStorage.setItem('roleId',res.roleId)
        }
    )
  },
  mounted() {
    // setTimeout(()=> {
    //       console.log(this.$store.state.admin.admin);
    //     },500)
  },
  //导入vuex主题数据
  computed: {
    ...mapState('theme', ['theme']),
    ...mapState('admin', ['admin']),
  },
  methods: {
    //导入vuex登录账户方法
    ...mapMutations('admin',['setadmin']),
    //切换主题
    changetheme(color) {
      //设置当前主题颜色
      this.themecolor = color;
      //将主题颜色保存到浏览器的缓存中
      localStorage.setItem('theme', color)
    },
    exit() {
      //清除浏览器缓存
      // sessionStorage.removeItem('token')
      // localStorage.removeItem('loginId')
      // localStorage.removeItem('loginPwd')
      //removeItem方法需要一个一个清除，clear方法清除所有
      sessionStorage.clear()
      localStorage.clear()
      //跳转到登录页面
      this.$router.push('/login');
    },
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  //左侧样式
  .left {

    //logo样式
    .logo {
      font-size: 18px;
      text-align: center;
      margin: 10px auto;
      color: white;
      width: 90%;
      border: 1px solid white;
      padding: 8px 0;
    }
  }

  //右侧样式
  .right {
    flex: 1;
    //顶部导航样式
    .nav {
      height: 60px;
      display: flex;
      justify-content: space-between;

      .icon {
        padding: 15px 5px;

        i {
          color: white;
          font-size: 30px;
        }
      }
    }

    .content {
      padding: 8px;
    }
  }
}
</style>