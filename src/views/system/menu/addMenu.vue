<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :title="titleName">
      <el-form ref="elForm" :model="form" :rules="rules" :size="btnSize" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="form.title" placeholder="请输入菜单名称" :maxlength="20" clearable
                        :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon" placeholder="请输入角色名称" :maxlength="20" clearable
                        :style="{width: '100%'}" autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="menuPath">
              <el-input v-model="form.menuPath" placeholder="请输入path" :maxlength="255" clearable
                        :style="{width: '100%'}" autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由全地址" prop="component">
              <el-input v-model="form.component" placeholder="对应component" :maxlength="255" clearable
                        :style="{width: '100%'}" autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级菜单" prop="parentId">
              <el-tree-select :styles="{ width: '100%'}" v-model="form.parentId" :selectParams="selectParams"
                              :treeParams="treeParams" ref="treeSelect"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sortIndex">
              <el-input-number v-model="form.sortIndex" style="width: 100%" :step="5"></el-input-number>
            </el-form-item>
          </el-col>
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
import { queryAllMenu, saveMenu } from '@/api/menu'
import { BTN_SIZE, SUCCESS_MSG } from '@/utils/constant'
import { getTreeData } from '@/utils/common'

export default {
  name: 'addMenu',
  components: {},
  props: [],
  data() {
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
          label: 'title',
          disabled: 'disabled',
          value: 'menuId'
        }
      },
      btnSize: BTN_SIZE,
      dialogVisible: false,
      titleName: '',
      form: {
        menuId: undefined,
        title: undefined,
        icon: undefined,
        menuPath: undefined,
        component: undefined,
        parentId: undefined,
        sortIndex: 100,
        state: 0,
        roleDescription: undefined
      },
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入图标', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        component: [
          { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' },
        ],
        menuPath: [
          { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' },
        ]
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
      let param = { menuId: val ? val.menuId : null }
      queryAllMenu(param).then(res => {
        if (res.data.code === 200) {
          let data = getTreeData(res.data.data, null, "menuId")
          this.$refs.treeSelect.treeDataUpdateFun(data)
          console.log(1)
        } else {
          this.$refs.treeSelect.treeDataUpdateFun([])
        }
      })
    },
    show(val) {
      this.getAllOrgData(val)
      this.titleName = '添加菜单'
      if (val) {
        this.titleName = '修改菜单'
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
        saveMenu(this.form).then(res => {
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
