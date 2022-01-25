<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :title="titleName">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户编码" prop="userCode">
              <el-input v-model="formData.userCode" placeholder="请输入用户编码" :maxlength="20" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户名称" :maxlength="20" clearable
                        :style="{width: '100%'}" autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="真实名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入真实名称" :maxlength="20" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="formData.idCard" placeholder="请输入身份证" :maxlength="20" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="nationality">
              <el-input v-model="formData.nationality" placeholder="请输入民族" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model="formData.phoneNum" placeholder="请输入手机号" :maxlength="11" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期">
              <el-date-picker v-model="formData.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择出生日期" clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="!formData.userId">
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                        :style="{width: '100%'}" autocomplete="off" type="password"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用" prop="state">
              <el-switch v-model="formData.state" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saveUser } from '@/api/user'
import { SUCCESS_MSG } from '@/utils/constant'
import { isNumber, validIdCard, validNumStr, validPhoneNum } from '@/utils/validate'
import { getMd5Pwd } from '@/utils/crypto'

export default {
  name: 'add',
  components: {},
  props: [],
  data() {
    // 校验用户编码
    const checkUserCode = (rule, value, callback) => {
      if (!isNumber(value)) {
        return callback(new Error('请输入 0~9 的数字'))
      }
      return callback()
    }
    // 校验用户名
    const validUsername = (rule, value, callback) => {
      if (!validNumStr(value)) {
        return callback(new Error('请输入英文加数字'))
      }
      return callback()
    }
    // 校验身份证号码
    let checkIdCard = (rule, value, callback) => {
      if (value) {
        if (!validIdCard(value)) {
          return callback(new Error('身份证号码错误'))
        }
      }
      return callback()
    }
    // 校验手机号
    const checkPhoneNum = (rule, value, callback) => {
      if (value) {
        if (!validPhoneNum(value)) {
          return callback(new Error('手机号格式错误'))
        }
      }
      return callback()
    }
    return {
      dialogVisible: false,
      titleName: '',
      formData: {
        userId: undefined,
        userCode: undefined,
        username: undefined,
        password: undefined,
        state: 0,
        name: undefined,
        idCard: undefined,
        nationality: undefined,
        phoneNum: undefined,
        email: undefined,
        birthday: null
      },
      rules: {
        userCode: [
          { required: true, message: '请输入用户编码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
          { validator: checkUserCode, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
          { validator: validUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入真实名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        idCard: [{ validator: checkIdCard, trigger: 'blur' }],
        phoneNum: [{ validator: checkPhoneNum, trigger: 'blur' }],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        birthday: [],
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    show(val) {
      this.titleName = '添加用户'
      if (val) {
        this.titleName = '修改用户'
        this.formData = {...val}
      }
      this.dialogVisible = true
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      Object.keys(this.formData).forEach(key => (this.formData[key] = undefined))
      this.formData.state = 0
      this.dialogVisible = false
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        let pwd = this.formData.password
        if (!this.formData.userId) {
          // 将用户输入的密码进行 MD5 加密
          this.formData.password = getMd5Pwd(this.formData.password)
        }
        saveUser(this.formData).then(res => {
          if (res.data.code === 200) {
            this.$message.success(SUCCESS_MSG)
            this.onClose()
            this.$parent.getData()
          } else {
            this.formData.password = pwd
            this.$message.error(res.message)
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
