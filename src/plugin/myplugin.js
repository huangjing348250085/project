import {get, post, settoken} from "../util/request";
//定义一个插件
export default {
    //插件中必须包含一个install方法
    install: function (Vue) {
        //给Vue混入成员
        Vue.mixin({
            methods: {
                //get请求方法
                $get(url, params) {
                    return get(url, params)
                },
                //post请求方法
                $post(url, params) {
                    return post(url, params)
                },
                $settoken() {
                    //执行该方法，就会将浏览器缓存里面的token信息保存到ajax的请求头中
                    settoken()
                },
                //成功消息框
                $msg_s(message, duration = 3000) {
                    this.$message({
                        //显示关闭图标
                        showClose: true,
                        message,
                        type: 'success',
                        duration
                    });
                },
                //警告消息框
                $msg_w(message, duration = 3000) {
                    this.$message({
                        //显示关闭图标
                        showClose: true,
                        message,
                        type: 'warning',
                        duration
                    });
                },
                //错误消息框
                $msg_e(message, duration = 3000) {
                    this.$message({
                        //显示关闭图标
                        showClose: true,
                        message,
                        type: 'error',
                        duration
                    });
                },
            //确认框
            $con_f(message)
            {
                return new Promise ((resolve,reject)=>{
                    this.$confirm(message)
                    .then(res => {
                        resolve()
                    })
                    .catch(_ => {})
                })
            },
    },
    })
    }
}