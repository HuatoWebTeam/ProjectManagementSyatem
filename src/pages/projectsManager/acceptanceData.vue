<template>
<el-row class="projectList myContainer">
   <el-col :span='24' class="title">
    <div class="procurment_title">验收资料-项目列表  </div>
  </el-col>
    <el-col :span='24' class="projectDataList">
   <el-table
    :data="projectData"
     stripe
     border
    style="width: 100%">
      <el-table-column
        prop="ProjectName"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ProjectPrincipal"
        label="项目负责人"
        width='160'
        >
      </el-table-column>
      <el-table-column
        prop="CustomerPhone"
        label="客户电话"
       >
      </el-table-column>
      <el-table-column
        prop="ProjectStaDate"
        label="项目启动时间"
        >
      </el-table-column>
      <el-table-column
        prop="ProjectStates"
        label="项目状态"
        width='500'
        >
        <template slot-scope="scope" v-if='projectData[scope.$index].ProjectStates.length > 0'>
          <span class='projectBeyondSpan' v-for='item in projectData[scope.$index].ProjectStates' :key='item.ProjectCode' >{{item.State}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="350">
        <template slot-scope="scope">
        <el-button type="primary" size="small" @click='routerToDetails(scope.$index)'>验收详情</el-button>
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
</el-row>
</template>
<script>
  import {ProjectManage}from'@/api/api'//引进api

export default {
        data(){
             return{
	            pageSize: 12,
	            pageIndex:1,
	            projectData:[],
	            totalNumber:null,//总条数        
             }
        },
       methods:{
		       getprojectmange(){
		          var parms={//传的参数
		               pageIndex: this.pageIndex,
		               pageSize: this.pageSize,
		              }
		          ProjectManage(parms).then( res => {//项目列表
		              this.totalNumber=res[0].TotalNumber//把请求的页码赋值过来
		              this.projectData=[]; 
		              for(let item of res[0].DataList){
		                this.projectData.push({
                      ProjectName:item.ProjectName,
                      ProjectPrincipal:item.ProjectPrincipal,
                      CustomerPhone:item.CustomerPhone,
                      ProjectStaDate:item.ProjectStaDate.replace('0:00:00',''),
                      ProjectStates:item.ProjectStates,
                      ProjectCode:item.ProjectCode
                    })//遍历出来的数组放进去
		              }
		          })
		        },
	          pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
	             this.pageIndex = pageIndex;//传当前页面   
	             this.getprojectmange()//换页码时候调用
	           },
              routerToDetails(index){//点击项目详情跳转路由.要在路由router里面配置动态路由
                    this.$router.push({name:'VerifyDetails',params: { id:this.projectData[index].ProjectCode}});  
              },
       },
       mounted(){
         this.getprojectmange();//调用函数列表
       }
}
</script>
      
<style scoped lang='scss'>
    .projectList{
      .projectDataList{
          width: calc(100% - 40px);
          height: calc(100% - 90px);
  	      margin: 20px;
  	      background: #fff;
  	      border: 1px solid #ccc;
  	      text-align: center;
          }
       .projectBeyondSpan{
       	display: inline-block;
       	width: 100px;
       	height: 40px;
       	color: red;
       	line-height: 40px;
       	font-size: 18px;
       	background: url(../../assets/img/projectsBeyond.png) no-repeat;
       }
   }
</style>