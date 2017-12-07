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

            <el-button size="small" type="primary" @click="UploadFile(scope.$index, scope.row)">点击上传</el-button>
         
        <el-button
          size="mini"
          type="primary"
          @click="UploadFile(scope.$index, scope.row)">点击下载</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :total="totalNumber"
          :page-size='pageSize'
          @current-change='pageIndexChange'
          :show-file-list='true'
          :on-change="handleChange"
          >
        </el-pagination>
     </div>
  </el-col>
  <el-dialog
   :visible.sync="AddText" 
   title='上传报销详细清单'
    @close='closeAddText'
    width='24%'
    >
<!--          <el-upload
             class="upload-demo"
             action="TextActionURL"
             accpet='xlsx'
            
            :on-error='fileError'
            :on-preview="handlePreview"
            :on-change="handleChange"
            :file-list="fileList"
            :limit="2"
            ref="upload"
            >
           <el-button slot="trigger" size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
           <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
         </el-upload> -->
        <el-upload
          class="upload-demo"
           :on-remove="handleRemove"
          drag
          action="TextActionURL"
          accpet='xlsx'
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
  import{GetReimburseData,RelicUpload}from'@/api/api'//引进列表

export default {
  data(){
    return{
      fileList:[],
      AddText:false,
      condition:'', 
      pageIndex:1,
      pageSize:2,
      tableData: [],
      totalNumber:null,
      TextActionURL:'/AmountManage/RelicUpload',
      fileList:[{name:'',url:''}],
       
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
                             this.tableData.push(item)
                        }
                        console.log( this.totalNumber)
                  }) 
                   
                },

              submitUpload() {
                            this.$refs.upload.submit();
                          },

              UploadFile(index){

/*                var parms{

                }*/
                   this.AddText=true;//点击的时候添加文档弹框显示出来
                   console.log(this.tableData[index])
/*                   RelicUpload(parms).then(res=>{
                     console.log("xianshi文件上传")
                      console.log(res)
                    })*/
              },
              handleRemove(file, fileList) {//删除
                  console.log(file, fileList);
                },

             handlePreview(file) {
                  console.log(file);
                },

               handleChange(file, fileList){
                      this.fileList = fileList.slice(-3);
                    },
              closeAddText(){//关闭添加弹框
                this.AddText=false;
              },
             fileError(error){
                 console.log(error)//上传失败的额函数
             },
              pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
                 this.pageIndex = pageIndex;//传当前页面     
                 this.expenses()//重新获取一边当前的
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

.seek{
  margin-top:20px;
  margin-bottom:20px;
}
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