<template>
<el-row>
   <el-col :span='24' class="Reimbursement">
     <div class="procurment_title">报销管理</div>
   </el-col>
   <el-col :span="24" class="projectSelect">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="项目:">
          <el-input placeholder="请输入查询项目" v-model="condition" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click='expenses' >查询</el-button>
        </el-form-item>
      </el-form>
   </el-col>
  <el-col :span='24' class="main_heard">
      <el-table
    :data="tableData"
     stripe
     border
    style="width: 100%">
    <el-table-column
      prop="ProjectName"
      label="项目名称"
      width="160">
    </el-table-column>
    <el-table-column
      prop="Date"
      label="发起时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="LoginName"
      label="项目经理">
    </el-table-column>
     <el-table-column
      prop="Money"
      label="汇报金额">
    </el-table-column>
      <el-table-column 
      label="操作"
      width="180"
      >
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="primary"
          @click="handleEdit(scope.$index, scope.row)">上传</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :total="totalNumber"
          :page-size='pageSize'
          @current-change='pageIndexChange'>
        </el-pagination>
     </div>
  </el-col>
</el-row>
 
</template>

<script>
  import{GetReimburseData}from'@/api/api'//引进列表

export default {
  data(){
    return{
      condition:'', 
      pageIndex:1,
      pageSize:2,
      tableData: [],
      totalNumber:null
    }
  },
      methods: {//报销列表显示
           expenses(){
               var parms={
                   pageIndex:this.pageIndex,
                   pageSize:this.pageSize,
                   condition:this.condition
               }
               GetReimburseData(parms).then(res=>{
                    console.log("xianshi")
                      console.log(res)
                      this.totalNumber=res.TotalNumber
                       this.tableData=[];
                       for(let item of res.DataList){
                             this.tableData.push(item)
                        }
                        console.log( this.totalNumber)
                  }) 
                   
                },
              pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
                 this.pageIndex = pageIndex;//传当前页面     
                 this. expenses()//重新获取一边当前的
               }
             




    },
    mounted(){
      this.expenses()//列表请求显示
    }

}
</script>

<style scoped>
.Reimbursement{
   height: 50px;
   line-height: 50px;
   padding-left: 20px;
   background:#fff;
   box-shadow: 0px 2px 1px #888888;
}
.main_heard{
     width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 0px 20px 20px 20px;
    background: #fff;
    border: 1px solid #ccc; 
    text-align: center;

}

.projectSelect{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 20px 20px 0px 20px;  
}

.el-button{
  font-size: 12px;
  padding:8px 2px;
}


</style>
<style type="text/css">
  
  .el-input__inner{
    height: 30px;
  }
.el-pagination{
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
}
.seek{
  margin-top:20px;
  margin-bottom:20px;
}
</style>