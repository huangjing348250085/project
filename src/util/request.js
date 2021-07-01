// 导入NProgress加载进度条
import NProgress from  'nprogress'
import 'nprogress/nprogress.css'

import axios from "axios";
import {BASE_URL} from '../config/index'

var instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start();
    return config;
}, function (error) {
    // 对请求错误做些什么
    NProgress.done();
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done();
    return response;
}, function (error) {
    // 对响应错误做点什么
    NProgress.done();
    return Promise.reject(error);
});

let get = async function (url, params) {
    let {data} = await instance.get(url, {params})
    return data;
}

let post = async function (url, params) {
    let {data} = await instance.post(url, params)
    return data;
}
//创建一个将token信息保存到请求头的方法
let settoken = function (){
    instance.defaults.headers.common['token'] = sessionStorage.getItem('token');
}
//导出get，post方法
export {
    get,
    post,
    settoken
}