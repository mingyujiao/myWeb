const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776#' // 密匙是自定的，但需要保存好

// md5 加密
function getMd5Pwd(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') // 把输出编程16进制的格式
}

module.exports = {
  getMd5Pwd
}
