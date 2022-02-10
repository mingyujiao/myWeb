// 拼接 树形结构
export function getTreeData(data, parentId, filedName) {
  let convertData = []
  data.forEach(item => {
    if (item.parentId === parentId && item[filedName] !== item.parentId) {
      convertChild(data, item, item[filedName], filedName)
      convertData.push(item)
    }
  })
  return convertData
}

// 递归组装数据
export function convertChild(arr, parentItem, parentId, filedName) {
  parentItem.children = parentItem.children ? parentItem.children : []
  arr.forEach(item => {
    if (item.parentId === parentId) {
      parentItem.children.push(item)
      if (item[filedName] !== item.parentId) {
        convertChild(arr, item, item[filedName], filedName)
      }
    }
  })
}
