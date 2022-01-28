// 查询用户授权信息
import { post } from '@/utils/request'

export const queryUserRoleByUserId = params => post('/sysUserRole/queryUserRoleByUserId', params)

// 删除用户授权信息
export const delUserRoleByUserId = params => post('/sysUserRole/delUserRoleByUserId', params)

// 批量保存用户授权信息
export const savesUserRole = params => post('/sysUserRole/saves', params)
