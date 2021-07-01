//主题模块
export default {
    //设置为私有命名空间
    namespaced:true,
    state: {
        // theme: {
        //     blue: "#101f30",
        //     gley: "#2b333e",
        //     red: "#d13c74",
        //     black: "#482522",
        //     green: "#41b349"
        // }
        theme:[
            {
                name:"蓝色主题",
                value:"#0f59a4"
            },
            {
                name:"灰色主题",
                value:"#2b333e"
            },
            {
                name:"红色主题",
                value:"#d13c74"
            },
            {
                name:"黑色主题",
                value:"#482522"
            },
            {
                name:"绿色主题",
                value:"#41b349"
            },
        ]
    }
}