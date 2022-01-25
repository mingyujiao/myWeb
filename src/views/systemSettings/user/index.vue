<template>
  <div class="app-container">
    <el-collapse accordion>
      <el-collapse-item title="查询">
        <el-form ref="queryForm" :model="queryForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="用户编码">
                <el-input v-model="queryForm.userCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户名称">
                <el-input v-model="queryForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="真实名称">
                <el-input v-model="queryForm.name"></el-input>
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
      <el-button type="primary" plain icon="el-icon-plus" @click="addUser" :size="btnSize">添 加</el-button>
      <el-button type="danger" plain icon="el-icon-delete" @click="delUser" :size="btnSize">删 除</el-button>
    </div>
    <el-table border :data="tableData" style="width: 100%; height: 100%;"
              :size="btnSize" stripe v-loading="listLoading"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column fixed type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column fixed prop="username" label="用户名称" width="120" align="center"></el-table-column>
      <el-table-column fixed prop="userCode" label="用户编码" width="150" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="phoneNum" label="手机号" align="center"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" align="center"></el-table-column>
      <el-table-column prop="name" label="真实名称" width="120" align="center"></el-table-column>
      <el-table-column prop="idCard" label="身份证" width="120" align="center"></el-table-column>
      <el-table-column prop="nationality" label="民族" width="120" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="200" align="center"></el-table-column>
      <el-table-column prop="state" label="启用" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button circle @click.native.prevent="editRow(scope.row)" icon="el-icon-edit" type="primary" :size="btnSize">
          </el-button>
          <el-button circle @click.native.prevent="delRow(scope.row)" icon="el-icon-delete" type="danger" :size="btnSize">
          </el-button>
          <el-button plain @click.native.prevent="editRow(scope.row)" type="warning" :size="btnSize">
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        :small="pageSmall"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParam.current"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageParam.size"
        :total="pageParam.total"
      >
      </el-pagination>
    </div>
    <add-user ref="addUser"></add-user>
  </div>
</template>

<script>

import { deletesUserById, deletesUserByIds, queryUserListPage } from '@/api/user'
import { BTN_SIZE, DEL_NULL_MSG, ERR_MSG, PAGE_SMALL, SUCCESS_MSG } from '@/utils/constant'
import addUser from '@/views/systemSettings/user/addUser'

export default {
  components: {
    addUser
  },
  data() {
    return {
      selections: [],
      listLoading: false,
      pageSmall: PAGE_SMALL,
      btnSize: BTN_SIZE,
      queryForm: {
        username: null,
        name: null,
        userCode: null,
      },
      pageParam: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: []
    }
  },
  methods: {
    // 根据 ID 删除用户信息
    delRow(row) {
      this.listLoading = true
      deletesUserById(row.userId).then(res => {
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
    delUser() {
      if (this.selections.length === 0) {
        this.$message.warning(DEL_NULL_MSG)
        return
      }
      let delIds = this.selections.map(item => item.userId)
      this.listLoading = true
      deletesUserByIds(delIds).then(res => {
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
      this.$refs.addUser.show(row)
    },
    // 多选
    handleSelectionChange(val) {
      this.selections = val
    },
    // 添加用户
    addUser() {
      this.$refs.addUser.show()
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
      let param = {...this.pageParam, data: this.queryForm}
      queryUserListPage(param).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.records
          this.pageParam.total = res.data.data.total
        } else {
          this.$message.warning(ERR_MSG)
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  created() {
    this.getData()
  }
}
</script>
