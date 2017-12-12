<template>
<el-row>
   <el-col :span='24' class="AttendanceCheck" >
       <div class="procurment_title">考勤统计 </div>
   </el-col>
 <el-col :span="24" class="projectSelect">
<el-form :inline="true"  class="demo-form-inline">
  <el-form-item label="项目:">
    <el-input placeholder="请输入查询项目" v-model="projectName"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" size="small" icon="el-icon-search" @click="Attendance" >查询</el-button>
  </el-form-item>
</el-form>
   </el-col>
  <el-col :span="24" class="main_heard">
    <div class="statistic_procurment">
    	<div v-for='item in projectData' class="entry_block" :key='item.projectName'>
    		<div class="procurment_name">项目:{{item.projectName}} <span class="procurment_start_time">项目发起时间:<span class="get_procument_time">{{item.projectDate}}</span></span></div>
            <el-collapse accordion>
			  <el-collapse-item>
			    <template slot="title">
			      <span>点击查看详情</span><i class="header-icon el-icon-information"></i>
			    </template>
			    <div v-for='item in  item.ListsSigningIns' class="CallerInfo">姓名:{{item.LoginName}}  时间:{{item.SigningInDate}}  工作地点:{{item.SigningInAddres}}  </div>
			  </el-collapse-item>
			</el-collapse>
    	</div>
    </div>
  </el-col>
         <el-col :span='24' class='myPagination'>
		      <el-pagination
		        layout="prev, pager, next"
		        :total="totalNumber"
		        :page-size='pageSize'
		        @current-change='pageIndexChange'>
		      </el-pagination>
		    </el-col>
</el-row>
</template>
<script>
	 import{GetSigningInData}from'@/api/api'//引进api
export default {
    data() {
      return {
         SelectCheck:"",//输入时候搜索的值!
         pageSize:3,
         pageIndex:1,
         projectName:'', 
         ListsSigningIns:[],
         totalNumber:null, 
	       projectData:[],
         value: '',
      }
  },
    methods:{
    	Attendance(){
           var parms={
		         pageIndex:this.pageIndex,
		         pageSize:this.pageSize,
		         projectName:this.projectName
           }
    		GetSigningInData(parms).then(res=>{
         console.log("列表显示!!!")
    			console.log(res)
                let projectData=[];
                this.totalNumber=res[0].TotalNumber;
               for(let i=0;i<res[0].DataList.length;i++){
	                   projectData.push({
	                         projectName:res[0].DataList[i].ProjectName,
	                         projectDate:res[0].DataList[i].ProjectStaDate,
	                         ListsSigningIns: []
	                   }) 
	                  /*   projectData[i].ListsSigningIns.push()*/
                     for(let k=0;k<res[0].DataList[i].ListsSigningIns.length;k++){
                                     projectData[i].ListsSigningIns.push({
                                     LoginName:res[0].DataList[i].ListsSigningIns[k].LoginName,
                                     SigningInDate:res[0].DataList[i].ListsSigningIns[k].SigningInDate,
                                     SigningInAddres:res[0].DataList[i].ListsSigningIns[k].SigningInAddres
                                   })
                             }        
	               }
                  this.projectData=projectData;
                  console.log("dayinshuju")
                  console.log(res[0].DataList.length)
                   console.log(res[0].TotalNumber)
                  console.log(this.projectData)
    		})
    	},
    	 pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
                 this.pageIndex = pageIndex;//传当前页面     
                 this. Attendance()//重新获取一边当前的
               } 
    },
    mounted(){
      this.Attendance()//调用函数!列表显示!//调用时候加this,因为访问的是局外的函数!
    }
}
</script>

<style type="text/css"scoped >
.AttendanceCheck{
   height: 50px;
   line-height: 50px;
   padding-left: 20px;
   background:#fff;
   box-shadow: 0px 2px 1px #888888;
}
.entry_block{
	background: #f2f2f2;
}
.el-input__inner{
	margin-left: 30px;
}
.main_heard{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 0px 20px 20px 20px;
    background: #fff;
    border: 1px solid #ccc; 
}
.procurment_name{
		margin-top:20px;
}
.el-button{
	font-size: 12px;
	padding:8px 2px;
}
.procurment_start_time{
	   /* display: inline-block; */
	    margin-right: 80px;
	    float: right;
	}
</style>
<style type="text/css">
.el-input__inner{
		height: 30px;
	}
.el-collapse-item__arrow{
	margin-right:56px;
}
.el-collapse-item__arrow:after{
	/*content:"更多";*/
}
.procurment_title{
	
	font-size: 16px;
	font-family: "Microsoft YaHei";
    font-weight: bold;

}
	.el-button [class*=el-icon-]+span{
		margin-left: 3px;
	}
.project_name{
	font-size: 16px;
	font-family:"Hiragino Sans GB";
	 display: inline-block;
    margin-top: 20px;
    margin-bottom:20px;
}
.projectSelect{
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 20px 20px 0px 20px;   
}
.CallerInfo{
	display: inline-block;
	width: 30%;
	margin-left:10px;
}
.statistic_procurment{
	margin-left: 10px;
}
</style>