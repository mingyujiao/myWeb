/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor','test01']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 校验数字 + 英文
 * @param str
 */
export function validNumStr(str) {
  return /^[A-Za-z0-9]*$/.test(str)
}

/**
 * 校验纯数字
 * @param str
 */
export function isNumber(str){
  return /^[0-9]*$/.test(str)
}

/**
 * 校验手机号
 * @param {string} str
 */
export function validPhoneNum(str) {
  return /^1[345678]\d{9}$/.test(str)
}

/**
 * 校验身份证号码
 * @param value
 */
export function validIdCard(value) {
  debugger
  let city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  let pass = true

  let patt1 = new RegExp('(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)')
  if (value === '') {
    pass = true
  } else if (!patt1.test(value)) {
    pass = false
  } else if (!city[value.substr(0, 2)]) {
    pass = false
  } else {
    //18位身份证需要验证最后一位校验位
    if (value.length === 18) {
      value = value.split('')
      //加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      //校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = value[i]
        wi = factor[i]
        sum += ai * wi
      }
      if (parity[sum % 11].toString() !== value[17]) {
        pass = false
      }
    }
  }
  return pass
}
