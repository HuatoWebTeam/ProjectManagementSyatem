<template>
<el-row  class="Information myContainer">
    <el-col :span='24' class="title">
     <div class="procurment_title">售后信息管理</div>
   </el-col>
  <el-col :span='24' class='InformationCheck'>
           <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="项目:">
          <el-input placeholder="请输入查询项目" v-model="condition"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="DataList">查询</el-button>
        </el-form-item>      
	   <el-button type="primary" size="small" class="AfterSales" @click="EmptyData">新建售后</el-button>    
      </el-form>
  </el-col>
  <el-col :span='24' class="tableList">
  	    <el-table
        stripe
		    :data="tableData"
		    border
		    style="width: 100%">
       <el-table-column
          type='index'
          label="序号"
          width="80">
        </el-table-column>
		    <el-table-column
		      prop="AfterSaleDate"
		      label="发布日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="ProjectName"
		      label="项目名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="售后外派单">
         <template slot-scope="scope">
            <a  @click="linkAfterSale(scope.$index)"  class="underline">
            {{tableData[scope.$index].AfterSaleFlieName}}  
         </a>
        </template>  
		    </el-table-column>
          <el-table-column
          prop="address"
          label="保修期内(维修换货单)">
             <template slot-scope="scope">
                <a  @click="linkExpira(scope.$index)"  class="underline">
                {{tableData[scope.$index].ExpirationDateFlieName}}  
             </a>
            </template> 
        </el-table-column>
       <el-table-column
          prop="address"
          label="保修期内(需求单)">
             <template slot-scope="scope">
                <a  @click="linkInWarranty(scope.$index)"  class="underline">
                {{tableData[scope.$index].InWarrantyFlieName}}  
             </a>
            </template>

        </el-table-column>
		  </el-table>  
  </el-col>
   <el-col :span='24' class='myPagination'>
        <el-pagination
          layout="prev, pager, next"
          :total="totalNumber"
          :page-size='pageSize'
           @current-change='pageIndexChange'>
        </el-pagination>
      </el-col>
  <el-col :span='24'>
  	<el-dialog
	  title="新建售后"
	  :visible.sync="dialogVisible"
	  width="35%">
	<el-form  label-width="100px" class="demo-ruleForm" :model=formInfo :rules="rules" ref="ruleForm">
	  <el-form-item label="项目名称" prop="selectvalue">
         <el-select v-model="formInfo.selectvalue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  prop='selectvalue'>
                </el-option>
        </el-select>
	  </el-form-item>
	  <el-form-item label="售后外派单" >
        <el-upload
          class="upload-demo"
          drag
          :limit="1"
          :on-success="filesuccessAssignment"
          :action="fileAdd"
          :name="formInfo.filename"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         </el-upload>
	  </el-form-item>
	  <el-form-item label="保修期(维修换货单)" >
	        <el-upload
          class="upload-demo"
          drag
          :limit="1"
           :name="formInfo.filename"
          :action="fileAdd"
           :on-success="filesuccessrequisition"
         >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         </el-upload>
	  </el-form-item>
   <el-form-item label="保修期外(需求单)" >
           <el-upload
          class="upload-demo"
            drag
            :limit="1"
           :name="formInfo.filename"
          :action="fileAdd"
          :on-success="filesuccessreplacement"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         </el-upload>
    </el-form-item>
	</el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button size='small' @click="dialogVisible = false">取 消</el-button>
	    <el-button size='small' type="primary" @click="Addfile">确 定</el-button>
	  </span>
</el-dialog>
  </el-col>
</el-row>

</template>

<script>
  import{GetAfterSaleData,Upload,InsertAfterSale,ProjectManage}from'@/api/api'//引进列表
export default {
    data(){
    	return{
    		dialogVisible:false,
        totalNumber:null,
        tableData: [],
        options:[],
        condition:'',
        pageIndex:1,
        pageSize:10,
        formInfo:{
            selectvalue: '',//下拉选择框
            filename:'',
            AfterSaleFlieName:'',//售后外派单文件名
            AfterSaleFlieUrl:'',
            InWarrantyFlieName:'', //维修换货单文件名
            InWarrantyFlieUrl:'',
            ExpirationDateFlieName:'', //需求单文件名
            ExpirationDateFlieUrl:'',
         },
        rules:{
          selectvalue:[{required:true, message:'请选择项目', trigger: 'change'} ]
        },
         fileAdd:'/AfterSaleManage/RelicUpload',
         ProjectName:"",
         afterSale:[],
        }
    },
     methods:{
        DataList(){//列表请求显示!
          this.tableData=[]//调用前清空.
          var parms={
                 condition:this.condition,
                 pageIndex:this.pageIndex,
                 pageSize:this.pageSize 
              }
           GetAfterSaleData(parms).then(res=>{
            console.log("dayinqingqiuliebiaoxianshi ")
               console.log(res)
               this.totalNumber=res.TotalNumber
                  for(let item of res.DataList){
                     this.tableData.push(item)
                        }
                      console.log(this.tableData)
                     })

             },
     EmptyData(){
             this.formInfo={
             selectvalue: '',//下拉选择框
             filename:'',
             AfterSaleFlieName:'',//售后外派单文件名
             AfterSaleFlieUrl:'',
             InWarrantyFlieName:'', //维修换货单文件名
             InWarrantyFlieUrl:'',
             ExpirationDateFlieName:'', //需求单文件名
             ExpirationDateFlieUrl:'',
           }
         this.dialogVisible=true;
     },


       getprojectmange(){
          var parms={//传的参数,项目下拉框!
               pageIndex: 10000,
               pageSize:10000   
              }
           ProjectManage(parms).then( res => {//项目列表
              let options=[]; 
              options=this.options
              for(let i=0;i<res[0].TotalNumber;i++){   //遍历出来的数组放进去
                options.push({
                   value:res[0].DataList[i].ProjectCode,
                   label:res[0].DataList[i].ProjectName
                  })   
                }
               console.log(options)
              })
           },
             filesuccessAssignment(res){//售后外派单
              console.log(res)
               this.AfterSaleFlieName=res.FileName;
               this.AfterSaleFlieUrl=res.FileUrl
             },
           filesuccessrequisition(res){//保修期维修换货单
                this.InWarrantyFlieName=res.FileName;
                this.InWarrantyFlieUrl=res.FileUrl  
                console.log(res)
           },
            filesuccessreplacement(res){//保修期/需求单
                this.ExpirationDateFlieName=res.FileName;
                this.ExpirationDateFlieUrl=res.FileUrl
                console.log(res)
            },
           Addfile(){
            let afterSale =[];
               this.formInfo={
                    ProjectCode:this.formInfo.selectvalue,
                    AfterSaleFlieName:this.AfterSaleFlieName,
                    AfterSaleFlieUrl:this.AfterSaleFlieUrl,
                    InWarrantyFlieName:this.InWarrantyFlieName,
                    InWarrantyFlieUrl:this.InWarrantyFlieUrl,
                    ExpirationDateFlieName:this.ExpirationDateFlieName,
                    ExpirationDateFlieUrl:this.ExpirationDateFlieUrl
                }
                   var parms={
                        afterSale:this.formInfo
                   }
                this.$refs['ruleForm'].validate((valid)=>{
                        InsertAfterSale(parms).then(res=>{
                                console.log(parms)
                                    if(res==1){
                                  this.$message({
                                    type:'success',
                                    message:'新建成功'
                                  });
                                  this.dialogVisible=false;
                                 }
                              })
                   })
               },
        linkAfterSale(index){
                     window.open(this.tableData[index].AfterSaleFlieUrl)//链接绑定
            },
       
        linkExpira(index){
          window.open(this.tableData[index].InWarrantyFlieUrl)
        },
        linkInWarranty(index){
          window.open(this.tableData[index].ExpirationDateFlieUrl)
        },
        pageIndexChange(index) {    // 当前页改变触发的事件，参数是改变的页码（当前页）
              //console.log(pageIndex);
              this.pageIndex = index;
              this.DataList()   /// 当前页改变时重新加载数据
            }
       },
       
       mounted(){

           this.DataList()//函数调用.
           this.getprojectmange()//项目下拉框选择.
       }
}
</script>

<style scoped lang='scss'>
.Information{
      .InformationCheck{
       width: calc(100% - 40px);
       height: calc(100% - 90px);
       margin: 20px ;
      }
      .tableList{
        width: calc(100% - 40px);
        height: calc(100% - 90px);
        margin:0px 20px 20px 20px ;
        text-align: center;
        background: #Fff;
        border: 1px solid #ccc;
      }
      .AfterSales{
          float: right;
      }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
      .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 78px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 78px;
      display: block;
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
.el-select{
  width: 100%
}
.underline{
    text-decoration: underline;
    color: blue;
    cursor:Pointer;
}
</style>