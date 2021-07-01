import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'


Vue.use(VueRouter)

// 导入NProgress加载进度条
import NProgress from  'nprogress'
import 'nprogress/nprogress.css'

const routes = [
    //首页
    {
        path: '/',
        //设置路由元信息
        meta:{title:"Bing酒店管理系统"},
        component: Index
    },
    //登录页面
    {
        path: '/login',
        meta:{title:"登录页"},
        component: () => import('../views/login')
    },
    //后台管理布局页面
    {
        path: '/layout',
        meta:{title:"Bing酒店管理系统"},
        component: () => import('../views/layout'),
        //配置嵌套路由
        children:[
            //首页
            {
              path:'',
              meta:{title: "首页"},
                component:()=>import('../views/user/home')
            },
            //系统消息
            {
                path:'message',
                meta:{title: "系统消息"},
                component:()=>import('../views/user/message')
            },
            //电子邮件
            {
                path:'email',
                meta:{title: "电子邮件"},
                component:()=>import('../views/user/email')
            },
            //个人中心
            {
                path:'mine',
                meta:{title: "个人中心"},
                component:()=>import('../views/user/mine')
            },
            //修改密码
            {
                path:'resetpwd',
                meta:{title: "修改密码"},
                component:()=>import('../views/user/resetpwd')
            },
            //角色
            {
                path:'role',
                meta:{title:"角色管理",permission:[1]},
                component:()=>import('../views/role/role')
            },
            //账号
            {
                path:'admin',
                meta:{title:"账号管理"},
                component:()=>import('../views/admin/admin')
            },
            //客房类型
            {
              path:'roomtype',
                meta:{title:"客房类型管理",permission:[1]},
                component:()=>import('../views/roomtype/roomtype')
            },
            //客房管理
            {
                path:'room',
                meta:{title:"客房管理"},
                component:()=>import('../views/room/room')
            },
            //客户管理
            {
                path:'guest',
                meta:{title:"客户管理"},
                component:()=>import('../views/guest/guest')
            },
            //权限管理
            {
                path:'permission',
                meta:{title:"权限管理",permission:[1]},
                component:()=>import('../views/permission/permission')
            },
        ]
    },
    {
        //*号，表示剩余的全部情况
        path: '*',
        component: ()=>import('../views/error404')
    }
]
//创建路由对象
const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})
//路由全局前置守卫
router.beforeEach((to, from, next) => {
    //显示加载进度条
    NProgress.start();
    //设置网页title属性值
    if (to.meta&&to.meta.title){
        document.title=to.meta.title
    }
    //表示验证权限
    if (to.meta&&to.meta.permission){
        if (to.meta.permission.includes(parseInt(localStorage.getItem('roleId')))){
            next()
        }else {
            router.push("/layout")
        }
    }else {
        //调用next方法，表示路由继续往下走
        next()
    }

})
//路由后置守卫
router.afterEach((to, from) => {
    NProgress.done();
})
//导出路由对象
export default router
