import request from '@/utils/request'
import { get, post } from '@/utils/request'

// 用户登录
export const login = params => post('/sysUser/doLogin', params)

// 提交用户信息
export const saveUser = params => post('/sysUser/save', params)

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
