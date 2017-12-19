<template>
<el-row class='Reimbursement myContainer'>
   <el-col :span='24' class="title">
     <div class="procurment_title">报销管理</div>
   </el-col>
   <el-col :span="24" class="projectSelect">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="项目:">
          <el-input placeholder="请输入查询项目" v-model="condition" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click='expenses'>查询</el-button>
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
      label="项目经理"
     >
    </el-table-column>
     <el-table-column
      prop="Money"
      label="汇报金额"
      width='180'>
    </el-table-column>
      <el-table-column 
      label="操作"
      >
      <template slot-scope="scope">
            <el-button size="small" type="primary" @click="UploadFile(scope.$index, scope.row)">上传报销报表</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="DownloadFile(scope.$index, scope.row)">下载报销报表</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="myPagination"><!-- 组件翻页 -->
      <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNumber" 
          :page-size='pageSize'
          @current-change='pageIndexChange'>
      </el-pagination>
    </div>
  </el-col>
  <el-dialog
   :visible.sync="AddText" 
   title='上传报销详细清单'
    @close='closeAddText'
    width='24%'
    >
    <el-upload
      ref='uploadFile'
      class="upload-demo"
      :on-remove="handleRemove"
      drag
      :on-error="errorfile"
      :action="TextActionURL"
      :name='upLoadName'
      accpet='xlsx'
      :auto-upload="false"
      :on-success="fileSuccess"
      :limit="1">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传xlsx文件，</div>
  </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button   size="medium"  @click="closeAddText">取 消</el-button>
        <el-button   size="medium" type="primary" @click="submitUpload">确 定</el-button>
      </span>
  </el-dialog>
</el-row>
 
</template>

<script>
  import{GetReimburseData,RelicUpload,ExeclReimburseData}from'@/api/api'//引进列表

export default {
  data(){
    return{
      fileList:[],
      AddText:false,
      condition:'', 
      pageIndex:1,
      pageSize:10,
      tableData: [],
      totalNumber:null,
      TextActionURL:'/AmountManage/RelicUpload',
      upLoadName: '',
      reimburseCode:''
    }
  },
      methods: {//报销列表显示
           expenses(){
               var parms={
                   pageIndex:this.pageIndex,
                   pageSize:this.pageSize,
                   condition:this.condition
               }
               GetReimburseData(parms).then(res=>{//列表显示请求
                      this.totalNumber=res.TotalNumber
                       this.tableData=[];
                       for(let item of res.DataList){
                             this.tableData.push({
                              ProjectName:item.ProjectName,
                              Date:item.Date.replace("0:00:00",''),
                              LoginName:item.LoginName,
                              Money:item.Money,
                              ReimburseCode:item.ReimburseCode
                             })
                        }
                        console.log(res)
                  })   
                },
              submitUpload() {//提交给数据库
                this.$refs['uploadFile'].submit();
              },
              fileSuccess(res) {
                console.log(res);
                  this.$refs['uploadFile'].clearFiles();
                  this.AddText=false;  
              },
              errorfile(res){
                  if(res==0){
                     this.$message.error('上传失败!');
                     this. handleRemove()//上传失败直接删除.
                  }
              },
              UploadFile(index){
                   this.AddText=true;//点击的时候添加文档弹框显示出来
                   console.log(this.tableData[index])
                   this.upLoadName = String(this.tableData[index].ReimburseCode);
                   console.log(this.upLoadName);
              },
              handleRemove(file, fileList) {//删除
                  console.log(file, fileList);
                },
            DownloadFile(index){
                 var parms={
                          reimburseCode:this.tableData[index].ReimburseCode
                       };
                    window.open('/AmountManage/ExeclReimburseData?ReimburseCode=' + this.tableData[index].ReimburseCode)
             },
              closeAddText(){//关闭添加弹框
                this.AddText=false;
              },
              pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
               this.pageIndex = pageIndex;//传当前页面     
                  this.expenses()//调函数
                }
              },
          mounted(){
                 this.expenses()//列表请求显示
           }
   }
</script>
<style scoped lang='scss'>
.Reimbursement{
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
     }
     .el-button, .el-button--primary, span{
      padding:8px 10px;
     }
}
</style>
<style type="text/css">
  .upload-demo{
    display: inline-block;
  }
  .el-upload-dragger{
     height: 100%;
      width: 100%;
  }
  .el-upload, .el-upload--text{
    width: 100%;
     height: 100%;
  }
  .upload-demo{
    width: 100%;
    height: 100%;
  }
</style>