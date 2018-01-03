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
        label='序列'
        width='100px'>
        <template slot-scope="scope">
          {{ (pageIndex-1) * pageIndex + (scope.$index + 1) }}
        </template>
      </el-table-column>
      <el-table-column
        label='申请人'
        width='150px'
        prop='LoginName'>
      </el-table-column>
      <el-table-column
        label='项目名称'
        prop='ProjectName'>
      </el-table-column>
      <el-table-column
        label='申请金额'
        width='150px'
        prop='AppliedAmount'>
      </el-table-column>
      <el-table-column
        label='申请描述'
        prop='Remark'>
      </el-table-column>
      <el-table-column
        label='申请流程'
        width='250px'
        >
        <template slot-scope="scope" >
          <span class='documentListState'>申请</span>
          <span :class='{"documentListState": dataLists[scope.$index].State >= 2, "noApproveState": dataLists[scope.$index].State < 2}' >领导</span>
          <span :class='{"documentListState": dataLists[scope.$index].State >= 3, "noApproveState": dataLists[scope.$index].State < 3 }' >管理员</span>
        </template>
      </el-table-column>
      <el-table-column
        label='打款凭证'
        width='200px'
        prop='ImgUrl'>
        <template slot-scope="scope">
          <img style='width:180px;height:50px;cursor: pointer;' @click='amplification(scope.$index)' :src="dataLists[scope.$index].ImgUrl" alt="">
        </template>
      </el-table-column>
       <el-table-column
       label='操作'     
       >
            <template slot-scope='scope'>
               <el-button size='mini'
                 type='primary'
                 v-if='dataLists[scope.$index].State == -1'
                  
                 @click="Compile(scope.$index)"  
               >
                 审批未通过
               </el-button>

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
    <el-dialog
      :visible.sync='dialogPreview'
      size='tiny'>
      <img width="100%" :src="dialogImgUrl" alt="">
    </el-dialog>
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
      pageSize: 12,
      totalNumber: 0,
      dialogImgUrl: null,
      dialogPreview: false
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
    },
    amplification(idx) {
      this.dialogImgUrl = this.dataLists[idx].ImgUrl;
      this.dialogPreview = true;
    },
    Compile(index){
          this.$router.push({name: 'routerDetails', params:{ id:this.dataLists[index].PettyCashCode}});
    },
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
      
      .documentListState {
        display: inline-block;
        width: 70px;
        height: 100%;
        color: #fff;
        background: url(../../assets/img/liuchengBack.png) no-repeat;
        background-size: 100%;
      }
      .noApproveState {
        display: inline-block;
        width: 70px;
        height: 100%;
        color: #fff;
        background: url(../../assets/img/liuchengNo.png) no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>