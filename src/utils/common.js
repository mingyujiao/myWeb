// 拼接 树形结构
export function getTreeData(data, parentId) {
  let convertData = []
  data.forEach(item => {
    if (item.parentId === parentId && item.orgId !== item.parentId) {
      convertData.push(item)
      convertChild(data, item, item.orgId)
    }
  })
  return convertData
}

// 递归组装数据
export function convertChild(arr, parentItem, parentId) {
  parentItem.children = parentItem.children ? parentItem.children : []
  arr.forEach(item => {
    if (item.parentId === parentId) {
      parentItem.children.push(item)
      if (item.orgId !== item.parentId) {
        convertChild(arr, item, item.orgId)
      }
    }
  })
}
