<template>
<el-row class='documentListContainer myContainer'>
  <el-col :span='24' class='title'>
    单据列表
  </el-col>
  <el-col :span='24' class='documentContentCont' >
    <el-table
      :data="dataList"
      border
      stripe>
      <el-table-column
        label='序列'
        width='70px'>
        <template slot-scope="scope" >
          {{ (pageIndex-1) * pageIndex + (scope.$index + 1) }}
        </template>
      </el-table-column>
      <el-table-column
      label='申请人'
      width='150px'
      prop='LoginName'>

      </el-table-column>
      <el-table-column
        label='申请描述'
        prop='Remark'>

      </el-table-column>
      <el-table-column
        label='流程'
        width='150px'
        prop='State'>

      </el-table-column>
      <el-table-column
        label='打款凭证'
        width='150px'
        >
        <template slot-scope="scope" >
          <img src="" alt="">
        </template>

      </el-table-column>
      <el-table-column 
        width='150px'
        label='操作'>
        <template slot-scope="scope" >

        </template>
      </el-table-column>
    </el-table>
    <el-col :span='24' class='myPagination'>
      <el-pagination
        layout="prev, pager, next"
        :total="totalNumber"
        :page-size='pageSize'
        @current-change='pageIndexChange'>
      </el-pagination>
    </el-col>
  </el-col>
</el-row>

</template>

<script>
import { GetPettyCash } from '@/api/api'
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalNumber: 0
    }
  },
  methods: {
    getDocumentList() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      GetPettyCash(params).then(res =>{
        console.log(res);
        this.totalNumber = 0;
        this.dataList = [];
        if(res[0].TotalNumber !== 0) {
          this.totalNumber = res[0].TotalNumber;
          this.dataList = res[0].DataList;
        }
        
      })
    },
    pageIndexChange() {
      this.getDocumentList();
    }
  },
  mounted() {
    this.getDocumentList();
  },
  deactivated() {
    this.$destroy(true);
  }
}
</script>

<style scoped lang='scss'>
.documentListContainer {
  .documentContentCont {
    padding: 20px;
    .el-table {
      text-align: center;
    }
  }
}
</style>