<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :title="titleName">
      <el-form ref="elForm" :model="formData" :rules="rules" :size="btnSize" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色编码" prop="roleCode">
              <el-input v-model="formData.roleCode" placeholder="请输入角色编码" :maxlength="20" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="formData.roleName" placeholder="请输入角色名称" :maxlength="20" clearable
                        :style="{width: '100%'}" autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="启用" prop="state">
              <el-switch v-model="formData.state" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色描述" prop="roleDescription">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="formData.roleDescription"
                maxlength="30"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose" :size="btnSize">取消</el-button>
        <el-button type="primary" @click="handelConfirm" :size="btnSize">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saveRole } from '@/api/role'
import { BTN_SIZE, SUCCESS_MSG } from '@/utils/constant'
import { validNumStr } from '@/utils/validate'

export default {
  name: 'add',
  components: {},
  props: [],
  data() {
    // 校验角色编码
    const checkRoleCode = (rule, value, callback) => {
      if (!validNumStr(value)) {
        return callback(new Error('请输入英文或数字'))
      }
      return callback()
    }
    return {
      btnSize: BTN_SIZE,
      dialogVisible: false,
      titleName: '',
      formData: {
        roleId: undefined,
        roleCode: undefined,
        roleName: undefined,
        state: 0,
        roleDescription: undefined,
      },
      rules: {
        roleCode: [
          { required: true, message: '请输入用户编码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
          { validator: checkRoleCode, trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
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
      this.titleName = '添加角色'
      if (val) {
        this.titleName = '修改角色'
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
        saveRole(this.formData).then(res => {
          if (res.data.code === 200) {
            this.$message.success(SUCCESS_MSG)
            this.onClose()
            this.$parent.getData()
          } else {
            this.$message.error(res.data.message)
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
