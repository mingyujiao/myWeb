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
    <el-table border :data="tableData" style="width: 100%; height: 100%;" :size="btnSize" stripe>
      <el-table-column fixed prop="userCode" label="用户编码" width="150" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名称" width="120" align="center"></el-table-column>
      <el-table-column prop="province" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="phoneNum" label="手机号" align="center"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" align="center"></el-table-column>
      <el-table-column prop="name" label="真实名称" width="120" align="center"></el-table-column>
      <el-table-column prop="idCard" label="身份证" width="120" align="center"></el-table-column>
      <el-table-column prop="nationality" label="民族" width="120" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="120" align="center"></el-table-column>
      <el-table-column prop="state" label="启用" width="120" align="center"></el-table-column>
    </el-table>
    <div style="text-align: center">
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
  </div>
</template>

<script>

import { queryUserListPage } from '@/api/user'
import { BTN_SIZE, ERR_MSG, PAGE_SMALL } from '@/utils/constant'

export default {
  data() {
    return {
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
    // 查询
    queryData() {
      this.getData()
    },
    // 清空查询条件
    resetData() {
      Object.keys(this.queryForm).forEach(key => (this.queryForm[key] = null))
    },
    // 获取后台数据
    getData() {
      let param = {...this.pageParam, ...this.queryForm}
      queryUserListPage(this.pageParam).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records
          this.pageParam.total = res.data.total
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
