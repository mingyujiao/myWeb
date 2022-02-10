<template>
  <div class="app-container">
    <el-collapse accordion>
      <el-collapse-item title="查询">
        <el-form ref="queryForm" :model="queryForm" label-width="80px" :size="btnSize">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="菜单名称">
                <el-input v-model="queryForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="全路径">
                <el-input v-model="queryForm.component"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style="text-align: right">
              <el-button type="primary" plain icon="el-icon-search" @click="queryData" :size="btnSize">搜 索</el-button>
              <el-button plain icon="el-icon-refresh-right" @click="resetData" :size="btnSize">清 空</el-button>
            </div>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div>
      <el-button type="primary" plain icon="el-icon-plus" @click="addMenu" :size="btnSize">添 加</el-button>
      <el-button type="danger" plain icon="el-icon-delete" @click="delMenu" :size="btnSize">删 除</el-button>
    </div>
    <el-table border :data="tableData" style="width: 100%; height: 100%;"
              :size="btnSize" stripe v-loading="listLoading" row-key="menuId"
              :tree-props="{children: 'children'}" @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column fixed type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column fixed prop="title" label="菜单名称" width="200" header-align="center"></el-table-column>
      <el-table-column fixed prop="icon" label="图标" width="150" header-align="center"></el-table-column>
      <el-table-column prop="menuPath" label="路径" header-align="center"></el-table-column>
      <el-table-column prop="component" label="全路径" header-align="center"></el-table-column>
      <el-table-column prop="state" label="启用" width="120" align="center"></el-table-column>
      <el-table-column prop="sortIndex" label="排序" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template v-slot="scope">
          <el-button circle @click.native.prevent="editRow(scope.row)" icon="el-icon-edit" type="primary"
                     :size="btnSize"
          >
          </el-button>
          <el-button circle @click.native.prevent="delRow(scope.row)" icon="el-icon-delete" type="danger"
                     :size="btnSize"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-menu ref="addMenu"></add-menu>
  </div>
</template>

<script>

import { deletesMenuById, deletesMenuByIds, queryMenuList } from '@/api/menu'
import { BTN_SIZE, DEL_NULL_MSG, ERR_MSG, PAGE_SMALL, SUCCESS_MSG } from '@/utils/constant'
import addMenu from '@/views/system/menu/addMenu'
import { getTreeData } from '@/utils/common'

export default {
  components: {
    addMenu
  },
  data() {
    return {
      dialogVisible: false,
      selections: [],
      listLoading: false,
      pageSmall: PAGE_SMALL,
      btnSize: BTN_SIZE,
      queryForm: {
        title: null,
        component: null
      },
      tableData: []
    }
  },
  methods: {
    // 根据 ID 删除用户信息
    delRow(row) {
      this.listLoading = true
      deletesMenuById(row.userId).then(res => {
        if (res.data.code === 200) {
          this.$message.success(SUCCESS_MSG)
          this.getData()
        } else {
          this.$message.error(ERR_MSG)
        }
        this.listLoading = false
      })
    },
    // 删除用户信息
    delMenu() {
      if (this.selections.length === 0) {
        this.$message.warning(DEL_NULL_MSG)
        return
      }
      let delIds = this.selections.map(item => item.userId)
      this.listLoading = true
      deletesMenuByIds(delIds).then(res => {
        if (res.data.code === 200) {
          this.$message.success(SUCCESS_MSG)
          this.getData()
        } else {
          this.$message.error(ERR_MSG)
        }
        this.listLoading = false
      })
    },
    // 修改
    editRow(row) {
      this.$refs.addMenu.show(row)
    },
    // 多选
    handleSelectionChange(val) {
      this.selections = val
    },
    // 添加用户
    addMenu() {
      this.$refs.addMenu.show()
    },
    // 查询
    queryData() {
      this.getData()
    },
    // 清空查询条件
    resetData() {
      Object.keys(this.queryForm).forEach(key => (this.queryForm[key] = null))
      this.getData()
    },
    // 获取后台数据
    getData() {
      let param = { data: this.queryForm }
      queryMenuList(param).then(res => {
        if (res.data.code === 200) {
          this.tableData = getTreeData(res.data.data, null, "menuId")
        } else {
          this.$message.warning(ERR_MSG)
        }
      })
    },
  },
  created() {
    this.getData()
  }
}
</script>
