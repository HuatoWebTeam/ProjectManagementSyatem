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
		      prop="date"
		      label="日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址">
		    </el-table-column>
		  </el-table>  
  </el-col>
  <el-col :span='24'>
  	<el-dialog
	  title="新建售后"
	  :visible.sync="dialogVisible"
	  width="30%">
	<el-form  label-width="100px" class="demo-ruleForm">
	  <el-form-item label="密码">
	  </el-form-item>
	  <el-form-item label="确认密码" >
	    <el-input></el-input>
	  </el-form-item>
	  <el-form-item label="年龄" >
	    <el-input ></el-input>
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
export default {
    data(){
    	return{
    		dialogVisible:false,
     tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    	}
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