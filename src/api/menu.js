import { post } from '@/utils/request'

// 提交机构信息
export const saveMenu = params => post('/sysMenu/save', params)

// 分页查询机构信息
export const queryMenuList = params => post('/sysMenu/queryListPage', params)

// 查询机构信息
export const queryAllMenu = params => post('/sysMenu/queryAllList', params)

// 批量删除机构信息
export const deletesMenuByIds = params => post('/sysMenu/deletes', params)

// 删除机构信息
export const deletesMenuById = params => post('/sysMenu/delete', params)

