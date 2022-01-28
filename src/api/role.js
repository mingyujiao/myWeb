import { post } from '@/utils/request'

// 提交角色信息
export const saveRole = params => post('/sysRole/save', params)

// 分页查询角色信息
export const queryRoleListPage = params => post('/sysRole/queryListPage', params)

// 批量删除角色信息
export const deletesRoleByIds = params => post('/sysRole/deletes', params)

// 删除角色信息
export const deletesRoleById = params => post('/sysRole/delete', params)



