<template>
  <div class="app-container">
    <el-collapse accordion>
      <el-collapse-item title="查询">
        <el-form ref="queryForm" :model="queryForm" label-width="80px" :size="btnSize">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="机构编码">
                <el-input v-model="queryForm.orgCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="机构名称">
                <el-input v-model="queryForm.orgName"></el-input>
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
      <el-button type="primary" plain icon="el-icon-plus" @click="addOrg" :size="btnSize">添 加</el-button>
      <el-button type="danger" plain icon="el-icon-delete" @click="delOrg" :size="btnSize">删 除</el-button>
    </div>
    <el-table border :data="tableData" style="width: 100%; height: 100%;"
              :size="btnSize" stripe v-loading="listLoading" row-key="orgId"
              :tree-props="{children: 'children'}">
              @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column fixed prop="orgName" label="机构名称"></el-table-column>
      <el-table-column fixed prop="orgCode" label="机构编码" align="center"></el-table-column>
      <el-table-column fixed prop="sortIndex" label="排序" align="center"></el-table-column>
      <el-table-column prop="state" label="启用" width="120" align="center"></el-table-column>
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
    <add-org ref="addOrg"></add-org>
  </div>
</template>

<script>

import { deletesOrgById, deletesOrgByIds, queryOrgList } from '@/api/org'
import { BTN_SIZE, DEL_NULL_MSG, ERR_MSG, SUCCESS_MSG } from '@/utils/constant'
import addOrg from '@/views/system/org/addOrg'
import { getTreeData } from '@/utils/common'

export default {
  components: {
    addOrg
  },
  data() {
    return {
      dialogVisible: false,
      selections: [],
      listLoading: false,
      btnSize: BTN_SIZE,
      queryForm: {
        orgCode: null,
        orgName: null
      },
      tableData: []
    }
  },
  methods: {
    // 根据 ID 删除用户信息
    delRow(row) {
      this.listLoading = true
      deletesOrgById(row.userId).then(res => {
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
    delOrg() {
      if (this.selections.length === 0) {
        this.$message.warning(DEL_NULL_MSG)
        return
      }
      let delIds = this.selections.map(item => item.userId)
      this.listLoading = true
      deletesOrgByIds(delIds).then(res => {
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
      this.$refs.addOrg.show(row)
    },
    // 多选
    handleSelectionChange(val) {
      this.selections = val
    },
    // 添加用户
    addOrg() {
      this.$refs.addOrg.show()
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
      queryOrgList(param).then(res => {
        if (res.data.code === 200) {
          this.tableData = getTreeData(res.data.data, null)
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
