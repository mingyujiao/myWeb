import { get, post } from '@/utils/request'

// 用户登录
export const login = params => post('/sysUser/doLogin', params)

// 提交用户信息
export const saveUser = params => post('/sysUser/save', params)

// 获取用户信息
export const getInfo = params => post('/sysUser/getUser', params)

// 用户注销
export const logout = () => get('/sysUser/logOut', null)
