<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="角色分配">
      <div slot="footer">
        <el-button @click="onClose" :size="btnSize">取消</el-button>
        <el-button type="primary" @click="handelConfirm" :size="btnSize">保存</el-button>
      </div>
      <el-table border ref="table" :data="tableData" style="width: 100%; height: 100%;"
                :size="btnSize" stripe v-loading="listLoading"
                @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column fixed prop="roleName" label="角色名称" width="120" align="center"></el-table-column>
        <el-table-column fixed prop="roleCode" label="角色编码" width="150" align="center"></el-table-column>
        <el-table-column prop="roleDescription" label="角色描述" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { BTN_SIZE, ERR_MSG } from '@/utils/constant'
import { delUserRoleByUserId, queryUserRoleByUserId, savesUserRole } from '@/api/userRole'

export default {
  name: 'chooseRole',
  data() {
    return {
      userId: undefined,
      dialogVisible: false,
      tableData: [],
      btnSize: BTN_SIZE,
      listLoading: false,
      selections: [],
    }
  },
  methods: {
    // 保存
    handelConfirm() {
      if (this.selections.length === 0) {
        this.delUserRole()
      } else {
        // 保存授权信息
        let saveArr = []
        this.selections.forEach(item => {
          saveArr.push({userId: this.userId, roleId: item.roleId})
        })
        this.savesUserRole(saveArr)
      }
    },
    // 保存授权信息
    savesUserRole(arr) {
      savesUserRole(arr).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this.onClose()
        } else {
          this.$message.error(ERR_MSG)
        }
      })
    },
    // 删除用户授权信息
    delUserRole() {
      delUserRoleByUserId(this.userId).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.onClose()
          } else {
            this.$message.error(ERR_MSG)
          }
      })
    },
    // 关闭
    onClose() {
      this.dialogVisible = false
      this.tableData = []
      this.userId = undefined
    },
    // 弹出
    show(row) {
      this.userId = row.userId
      this.getData()
      this.dialogVisible = true
    },
    // 多选
    handleSelectionChange(val){
      this.selections = val
    },
    // 反选数据
    rowSelect(userRoles) {
      // 反选，已经授权的角色
      this.$nextTick(() => {
        if (this.tableData.length > 0 && userRoles.length > 0) {
          this.tableData.forEach(role => {
            userRoles.some(item => {
              if (role.roleId === item.roleId) {
                this.$refs.table.toggleRowSelection(role)
                return true
              }
            })
          })
        }
      })
    },
    // 根据 userId 查询用户角色授权
    getData() {
      queryUserRoleByUserId(this.userId).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.roles
          let userRoles = res.data.data.userRoles
          this.rowSelect(userRoles)
        } else {
          this.$message.error(ERR_MSG)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
