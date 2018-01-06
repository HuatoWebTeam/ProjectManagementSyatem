<template>
<el-row class='loginLogContainer myContainer'>
  <el-col :span='24' class='title'>
    <div>登录日志</div>
  </el-col>
  <el-col :span='24' class='LoginLogList' >
    <el-table
    :data='LoginLogData'
    stripe
    border>
      <el-table-column
      prop='code'
      label='编码'>

      </el-table-column>
      <el-table-column
      prop='name'
      label='用户名'>

      </el-table-column>
      <el-table-column
      prop='state'
      label='启用状态'>

      </el-table-column>
      <el-table-column
      prop='userIp'
      label='登录ip'>

      </el-table-column>
      <el-table-column
      prop='date'
      label='登录时间'>

      </el-table-column>
    </el-table>
    <el-col :span='24' class='myPagination'>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size='pageSize'
        @current-change='pageIndexChange'>
      </el-pagination>
    </el-col>
  </el-col>
</el-row>

</template>

<script>
import { GetLoginLogData } from '@/api/api';
export default {
  data() {
    return {
      LoginLogData: [],
      pageIndex: 1,
      pageSize: 10,
      total: null
    }
  },
  methods: {
    getData() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      GetLoginLogData(params).then(res => {
       console.log(res);
        this.LoginLogData = [];
        this.total = res[0].TotalNumber;
        for (let item of res[0].DataList) {
          // console.log(item);
          this.LoginLogData.push({
            code: item.LogCode,
            name: item.LoginName,
            userIp: item.LoginIp,
            date: item.LoginDate,
            state: item.State == 1 ? '启用' : '停用'
          })
          
        }
      })
    },
    pageIndexChange(index) {
      this.pageIndex = index;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style scoped lang='scss'>
  .loginLogContainer {
    height: 100%;
    .LoginLogList {
      margin: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      background: #fff;
      border: 1px solid #ccc;
      .el-table {
        text-align: center;
      }
    }
  }
</style>