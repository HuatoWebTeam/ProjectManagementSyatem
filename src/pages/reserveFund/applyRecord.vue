<template>
<el-row class='myApplyRecordContainer myContainer'>
  <el-col :span='24' class='title'>
    我的申请记录
  </el-col>
  <el-col :span='24' class='myApplyRecordContentCont'>
    <el-table
      :data="dataLists"
      border
      stripe>
      <el-table-column
        label='序列'>
        <template slot-scope="scope">
          {{ (pageIndex-1) * pageIndex + (scope.$index + 1) }}
        </template>
      </el-table-column>
      <el-table-column
        label='申请人'
        prop='LoginName'>
      </el-table-column>
      <el-table-column
        label='申请描述'
        prop='Remark'>
      </el-table-column>
      <el-table-column
        label='申请流程'
        >
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column
        label='打款凭证'
        prop='ImgUrl'>
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
import { GetMyPettyCash } from '@/api/api'
export default {
  data() {
    return {
      dataLists: [],
      pageIndex: 1,
      pageSize: 10,
      totalNumber: 0
    }
  },
  methods: {
    getPettyCashList() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      GetMyPettyCash(params).then(res => {
        console.log(res);
        this.totalNumber = 0;
        this.dataList = [];
        if(res[0].TotalNumber !== 0) {
          this.totalNumber = res[0].TotalNumber;
          this.dataLists = res[0].DataList;
        }
      })
    },
    pageIndexChange() {
      this.getPettyCashList();
    }
  },
  mounted() {
    this.getPettyCashList();
  },
  deactivated() {
		this.$destroy(true);
	}
}
</script>

<style scoped lang='scss'>
.myApplyRecordContainer {
  .myApplyRecordContentCont {
    padding: 20px;
    .el-table {
      text-align: center;
    }
  }
}
</style>