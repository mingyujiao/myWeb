<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :title="titleName">
      <el-form ref="elForm" :model="form" :rules="rules" :size="btnSize" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构编码" prop="orgCode">
              <el-input v-model="form.orgCode" placeholder="请输入机构编码" :maxlength="20" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="form.orgName" placeholder="请输入机构名称" :maxlength="20" clearable
                        :style="{width: '100%'}" autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级部门" prop="parentId">
              <el-tree-select :styles="{ width: '100%'}" v-model="form.parentId" :selectParams="selectParams"
                              :treeParams="treeParams" ref="treeSelect"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sortIndex">
              <el-input-number v-model="form.sortIndex" style="width: 100%" :step="5"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="启用" prop="state">
              <el-switch v-model="form.state" :active-value="0" :inactive-value="1"></el-switch>
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
import { queryAllOrgList, saveOrg } from '@/api/org'
import { BTN_SIZE, SUCCESS_MSG } from '@/utils/constant'
import { validNumStr } from '@/utils/validate'
import { getTreeData } from '@/utils/common'

export default {
  name: 'add',
  components: {},
  props: [],
  data() {
    // 校验机构编码
    const checkOrgCode = (rule, value, callback) => {
      if (!validNumStr(value)) {
        return callback(new Error('请输入英文或数字'))
      }
      return callback()
    }
    return {
      selectParams: {
        multiple: true,
        clearable: true,
        placeholder: '请选择'
      },
      treeParams: {
        clickParent: true, // 是否可以选择父节点
        filterable: false, // 搜索
        'check-strictly': true,
        'default-expand-all': false,
        'expand-on-click-node': false,
        data: [],
        props: {
          children: 'children',
          label: 'orgName',
          disabled: 'disabled',
          value: 'orgId'
        }
      },
      btnSize: BTN_SIZE,
      dialogVisible: false,
      titleName: '',
      form: {
        orgId: undefined,
        orgCode: undefined,
        orgName: undefined,
        parentId: undefined,
        sortIndex: 100,
        state: 0
      },
      rules: {
        orgCode: [
          { required: true, message: '请输入机构编码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
          { validator: checkOrgCode, trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        sortIndex: [
          { required: true, message: '请输入排序值', trigger: 'blur' },
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
    getAllOrgData(val) {
      let param = {}
      if (val) {
        param.orgId = val.orgId
      }
      queryAllOrgList(param).then(res => {
        if (res.data.code === 200) {
          let data = getTreeData(res.data.data, null)
          this.$refs.treeSelect.treeDataUpdateFun(data)
        } else {
          this.$refs.treeSelect.treeDataUpdateFun([])
        }
      })
    },
    show(val) {
      this.getAllOrgData(val)
      this.titleName = '添加机构'
      if (val) {
        this.titleName = '修改机构'
        this.form = { ...val }
      }
      this.dialogVisible = true
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      Object.keys(this.form).forEach(key => (this.form[key] = undefined))
      this.form.state = 0
      this.form.sortIndex = 100
      this.dialogVisible = false
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        saveOrg(this.form).then(res => {
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
