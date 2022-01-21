import { get, post } from '@/utils/request'

// 用户登录
export const login = params => post('/sysUser/doLogin', params)

// 提交用户信息
export const saveUser = params => post('/sysUser/save', params)

// 获取用户信息
export const getInfo = params => post('/sysUser/getUserByToken', params)

// 用户注销
export const logout = () => get('/sysUser/logOut', null)

// 分页查询用户信息
export const queryUserListPage = params => post('/sysUser/queryListPage', params)

// 批量删除用户信息
export const deletesUserByIds = params => post('/sysUser/deletes', params)
