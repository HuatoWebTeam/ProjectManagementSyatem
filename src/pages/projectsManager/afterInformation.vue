<template>
<el-row>
    <el-col :span='24' class="Information">
     <div class="procurment_title">售后信息管理</div>
   </el-col>
  <el-col :span='24' class='InformationCheck'>
           <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="项目:">
          <el-input placeholder="请输入查询项目" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" >查询</el-button>
        </el-form-item>      
	   <el-button type="primary" size="small" class="AfterSales" @click="dialogVisible = true">新建售后</el-button>    
      </el-form>
  </el-col>
  <el-col :span='24' class="tableList">
  	    <el-table
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
		    </el-table-column>
          <el-table-column
          prop="address"
          label="保修期内(维修换货单)">
        </el-table-column>
       <el-table-column
          prop="address"
          label="保修期内(需求单)">
        </el-table-column>
		  </el-table>  
  </el-col>
  <el-col :span='24'>
  	<el-dialog
	  title="新建售后"
	  :visible.sync="dialogVisible"
	  width="35%">
	<el-form  label-width="100px" class="demo-ruleForm">
	  <el-form-item label="项目名称">
        <el-input ></el-input>
	  </el-form-item>
	  <el-form-item label="售后外派单" >
        <el-upload
          class="upload-demo"
          drag
          :on-success="filesuccessAssignment"
          :action="fileAdd"
          :name="filename"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         </el-upload>
	  </el-form-item>
	  <el-form-item label="保修期(维修换货单)" >
	        <el-upload
          class="upload-demo"
          drag
           :name="filename"
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
           :name="filename"
          :action="fileAdd"
          :on-success="filesuccessreplacement"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         </el-upload>
    </el-form-item>
	</el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	  </span>
</el-dialog>
  </el-col>
</el-row>

</template>

<script>
  import{GetAfterSaleData,Upload}from'@/api/api'//引进列表
export default {
    data(){
    	return{
    		dialogVisible:false,
        tableData: [],
         condition:'',
         pageIndex:1,
         pageSize:1,
         filename:'',
         fileAdd:'/AfterSaleManage/RelicUpload'

    	   }
    },
     methods:{
        DataList(){//列表请求显示!
          var parms={
             condition:this.condition,
             pageIndex:this.pageIndex,
             pageSize:this.pageSize 
              }
           GetAfterSaleData(parms).then(res=>{
                    console.log(res)

                     })
             },
             filesuccessAssignment(res){
              console.log("shangchuan")
                 console.log(res)
             },
           filesuccessreplacement(res){
                 console.log("维修换货单")
                 console.log(res)
           },
            filesuccessrequisition(res){
                  console.log("需求单")
                  console.log(res)
            },



       },
       
       mounted(){
           this.DataList()//函数调用.
       }
}
</script>

<style scoped>
    .Information{
    height: 50px;
   line-height: 50px;
   padding-left: 20px;
   background:#fff;
   box-shadow: 0px 2px 1px #888888;
    }
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