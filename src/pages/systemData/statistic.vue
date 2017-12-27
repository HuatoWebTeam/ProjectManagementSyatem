<template>
<el-row class='AttendanceCheck myContainer'>
   <el-col :span='24' class="title">
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
        <el-collapse accordion
         @change="handleChange">
    			   <el-collapse-item v-for='(item,index) in projectData'  :key='item.projectName' >
    			    <template slot="title" class="projectStatistic">
    			      <div class="procurment_name">项目:{{item.projectName}} <span class="procurment_start_time">项目发起时间:<span class="get_procument_time">{{item.projectDate}}</span></span></div>
    			    </template>
    			    <div v-for='item in  item.ListsSigningIns' class="CallerInfo">姓名:{{item.LoginName}}  时间:{{item.SigningInDate}}  工作地点:{{item.SigningInAddres}}  </div>
    			  </el-collapse-item>
			</el-collapse>
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
         pageSize:12,
         pageIndex:1,
         projectName:'', 
         ListsSigningIns:[],
         totalNumber:null, 
	       projectData:[],
         value: '',
         accordion:true,
         CallerShow:true,
      }
  },
    methods:{
    	Attendance(ev){
         var _this = this;//代表上面的函数,点击
           var parms={
		         pageIndex:this.pageIndex,
		         pageSize:this.pageSize,
		         projectName:this.projectName
           }
    		GetSigningInData(parms).then(res=>{
                let projectData=[];
                this.totalNumber=res[0].TotalNumber;
               for(let i=0;i<res[0].DataList.length;i++){
	                   projectData.push({
	                         projectName:res[0].DataList[i].ProjectName,
	                         projectDate:res[0].DataList[i].ProjectStaDate.replace("0:00:00",""),
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
    		})
    	},
    	 pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
                 this.pageIndex = pageIndex;//传当前页面     
                 this. Attendance()//重新获取一边当前的
               },
      handleChange(ev){
         console.log(ev)
/*          if(ev[index] !==""){
            this.CallerShow=false;
          }else{
            this.CallerShow=true;
          } */ 
      }

    },
    mounted(){
        var _this = this;//代表上面的函数,点击
      this.Attendance()//调用函数!列表显示!//调用时候加this,因为访问的是局外的函数!
       $(window).keyup(function(ev){
         if(ev.keyCode == 13){
           _this.Attendance();
        }
      })
    }
}
</script>

<style scoped  lang='scss'>
.AttendanceCheck{
/* height: 100%;*/
   .main_heard{
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      margin: 20px;
      background: #fff;
      border: 1px solid #ccc; 
         }
.el-input__inner{
	margin-left: 30px;
}
.main_heard{
      .el-button{
      	font-size: 12px;
      	padding:8px 10px;
      }
  .procurment_start_time{
      	   /* display: inline-block; */
      	    margin-right: 80px;
      	    float: right;
        }
  }
  .projectStatistic{
            display: inline-block;
            font-size: 16px;
            font-weight:bold;
  }

}
</style>
<style type="text/css"   lang="scss" >
   .statistic_procurment{
    .el-collapse-item__arrow{
          margin-right:56px;
        }
    }



.procurment_title{
	
	font-size: 16px;
	font-family: "Microsoft YaHei";
    font-weight: bold;

}
	.el-button [class*=el-icon-]+span{
		margin-left: 3px;
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