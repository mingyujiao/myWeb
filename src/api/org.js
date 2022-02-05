import { post } from '@/utils/request'

// 提交机构信息
export const saveOrg = params => post('/sysOrg/save', params)

// 分页查询机构信息
export const queryOrgList = params => post('/sysOrg/queryListPage', params)

// 批量删除机构信息
export const deletesOrgByIds = params => post('/sysOrg/deletes', params)

// 删除机构信息
export const deletesOrgById = params => post('/sysOrg/delete', params)

// 查询全部的组织机构数据
export const queryAllOrgList = params => post('/sysOrg/queryAllList', params)
