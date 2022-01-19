import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { debug } from 'script-ext-html-webpack-plugin/lib/common'

// 创建 axios 的实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000 // request timeout
})

// axios 的拦截 -- request
service.interceptors.request.use(
  config => {
    // 请求成功处理，判断浏览器中的cookie中是否存在项目的token
    if (store.getters.token) {
      config.headers['moyu-token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 具体的code对应的处理可继续添加修改
  response => {
    const res = response.data
    return res
  },
  error => {
    if (error.response.code === 301) {
      console.log('登录过期')
      // 登录过期跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 ---主页(index) 或者 退出到登录前的浏览的页面
      // 这样登录页面登录接口成功之后可以进行跳转 主页(index) 或者 退出到登录前的页面： let path = this.$route.query.redirect || '/index.js';   this.$router.push(path);
      setTimeout(() => {
        this.$router.replace({
          path: '/login',
          query: {
            redirect: this.$router.currentRoute.fullPath
          }
        })
      }, 1000)
      localStorage.setItem('token', '') // 清除token
    }
    if (error.response.code === 500) {
      console.log('请联系管理员')
    }
    return Promise.reject(error)
  }
)

// 5、get请求的封装
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'get',
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 6、post请求封装  默认json格式:'Content-Type':'application/json',如果是文件上传，可以修改headers为 headers: { 'Content-Type': 'multipart/form-data' }
export function post(url, params = {}, headers = { 'Content-Type': 'application/json' }) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
      headers: headers
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 7、将模块暴露
export default{
  get,
  post
}

// export default service
