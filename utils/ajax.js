/* =====================================================================
 * @desc 封装请求接口
 * @param uri {string}
 * @param data {object} post直接传值，get添加params字段{params:{字段1:值}}
 * @param config {object} 配置文件
 * @autor zhangweidong
 * =====================================================================
 * 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 组件里面使用this.$axios.get/post(url,data,config)
 * 4 config参数如有需要可以参照https://www.kancloud.cn/yunye/axios/234845，或axios官网自己配置
 * 5 前置登录请在config里配置 isCheckLogin:true
 * 6 请求数据序列化，如果需要请在config传入{isForm:true}
 *----------------------------------------------------------------------
 * （1）post/get 例子
    this.$ajax.post("/user/checkLogin.htm", {id:2222}
    ).then((res)=>{
        console.log(res.data)
    })
 *---------------------------------------------------------------------
 */

import axios from 'axios'
import { DeviceEventEmitter } from 'react-native';
import { loading, getHeader, getEnv, toast } from './common'
const axiosIns = axios.create({
  timeout: 10000,
})

// 设置默认返回数据类型

axiosIns.defaults.responseType = 'json'


// 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
axiosIns.defaults.validateStatus = function (status) {
  return true
}

// 前置序列化表单默认为false
axiosIns.defaults.isForm = false;
// axios 请求拦截器，前置登录
axiosIns.interceptors.request.use(async (config) => {
  // 配置config

  if (!global.HEADER) {
    const HEADER = await getHeader();
    if (HEADER.resultCode == 0) {
      global.HEADER = HEADER.data;
    }
  }
  config.headers = { saikemobilehead: JSON.stringify(global.HEADER) };
  config.headers.Accept = 'application/json';
  const configs = config.data || {};
  if (config.isForm || configs.isForm) {
    config.transformRequest = [function (data) {
      return JSON.stringify(data)
    }]
  }
  config.loading = true;
  return config
})

// axios 响应拦截器，状态码判断
axiosIns.interceptors.response.use(function (response) {
  const status = response.status;
  if(status===200){
    return Promise.resolve(response)
  }else if(status>=400&& status<=600){
    toast({ text: "服务器内部错误" })
  }
  return Promise.reject(response)
})

/*
 * @desc 封装请求接口
 * @param url {string}
 * @param data {object}
 * @param config {object} 配置文件
 */
let loadingCount = 0;
const ajaxMethod = ['get', 'post'];
const api = {}
let requestInfo = {
  requestName: "",
  requestDate: ""
};
ajaxMethod.forEach((method) => {
  // 数组取值的两种方式
  api[method] = async (url, data = {}, config = {}) => {
    let _requestName = url + JSON.stringify(data) + JSON.stringify(config);
    var _requestDate = new Date().getTime();
    // if(requestInfo.requestName===_requestName){
    //   let time_ =  _requestDate - requestInfo.requestDate;
    //   requestInfo.requestDate = _requestDate
    //   if(time_<800){
    //     return Promise.resolve({name:1});

    //   }
    // }else{
    //   requestInfo.requestName = _requestName;
    //   requestInfo.requestDate = _requestDate;
    // }

    if (!global.ENV) {
      ENV = await getEnv();
      global.ENV = ENV
    }
    if (config.loading !== false) {
      loadingCount++;
      if (loadingCount === 1) {
        loading({ show: true });
      }

    }
    let data_ = {}; method === 'get' ? data_.params = data : data_ = data
    if (url.indexOf("http") === -1) url = global.ENV.data.host + "/" + url;
    return ajax_(method, url, data_, config)

  }
})
function ajax_(method, url, data_, config) {
  return axiosIns[method](url, data_, config).then((response) => {
    loadingCount--;
    setTimeout(() => {
      if (loadingCount === 0) {
        loading({ show: false })
      }
    }, 200)
    if (config.showErrorToast === undefined) {
      config.showErrorToast = true;
    }
    if (response.data.errorCode*1 !== 0 && config.showErrorToast) {
      toast({ text: response.data.errorMessage || "接口数据异常" })
    }
    if (global.NETWORK_ERROR) {
      global.NETWORK_ERROR = false;
      DeviceEventEmitter.emit("globalHeight","100%");
    }
    return Promise.resolve(response.data)
  }).catch((err) => {
    loading({ show: false })
    if (err.toString().indexOf("timeout") > -1) toast({ text: "对不起,接口请求超时" })
    if (err.toString().indexOf("Network Error") > -1) {
      if (!global.NETWORK_ERROR) {
        global.NETWORK_ERROR = true;
        DeviceEventEmitter.emit("globalHeight", global.APPBAR_HEIGHT);
      }
    }
    return Promise.reject(err)

  })
}
export default api
