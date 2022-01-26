import { post } from '@/utils/request'

// 提交用户信息
export const saveRole = params => post('/sysRole/save', params)

// 分页查询用户信息
export const queryRoleListPage = params => post('/sysRole/queryListPage', params)

// 批量删除用户信息
export const deletesRoleByIds = params => post('/sysRole/deletes', params)

// 删除用户信息
export const deletesRoleById = params => post('/sysRole/delete', params)

