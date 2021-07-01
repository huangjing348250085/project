//当前登录账户模块
export default {
    //设置为私有命名空间
    namespaced:true,
    state: {
        admin: {
            role:{

            }
        },
    },
    mutations: {
        //该方法用于对admin对象赋值
        setadmin(state, val) {
            state.admin = val
        }
    }
}