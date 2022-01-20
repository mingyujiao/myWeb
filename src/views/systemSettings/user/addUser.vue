<template>
  <div>
    <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" title="添加用户">
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
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开关" prop="state" required>
              <el-switch v-model="formData.state" :active-value="0" :inactive-value="1"></el-switch>
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
              <el-input v-model="formData.phoneNum" placeholder="请输入手机号" :maxlength="15" clearable
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
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker v-model="formData.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择出生日期" clearable
              ></el-date-picker>
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

export default {
  name: 'add',
  components: {},
  props: [],
  data() {
    return {

      dialogVisible: false,
      formData: {
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
        userCode: [{
          required: true,
          message: '请输入用户编码',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入真实名称',
          trigger: 'blur'
        }],
        idCard: [],
        nationality: [],
        phoneNum: [],
        email: [],
        birthday: [{
          required: true,
          message: '请选择出生日期',
          trigger: 'change'
        }]
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
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.onClose()
        })
        .catch(_ => {
        })
    },
    show() {
      this.dialogVisible = true
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      this.dialogVisible = false
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        saveUser(this.formData).then(res => {
          if (res.code === 200) {
            this.$message.success(SUCCESS_MSG)
            this.onClose()
            this.$parent.getData()
          } else {
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
