<template>
 <el-row>
 <el-col :span='24'  class="projectList">
     <div class="procurment_title">验收资料管理  
            <el-button type="primary" size='mini'   @click='routerGoBack'>返回上一页</el-button>
            <el-button type="primary" size="mini" class="ExportData">导出数据</el-button>
       </div>
 </el-col>
 <el-col :span="24" class="projectData">
      

</el-col>


 </el-row>	
</template>
 <script >
 	 export default {
            data(){
            	return{

            	}
            },
            methods:{
                 routerGoBack() {
                            this.$router.go(-1);
                        },


            },
            mounteds(){

            },
            deactivated() {//每次都销毁//不缓存,保证是最新的数据,
			    this.$destroy(true);
			  }

 	 }
 </script>




<style scoped>
      .projectList{
               height: 50px;
               line-height: 50px;
               padding-left: 20px;
               background:#fff;
               box-shadow: 0px 2px 1px #888888;
            }
    .projectList  .procurment_title .el-button{
      float: right;
      margin-top:10px;
      margin-right: 50px;
    }  
   .ExportData{
      margin-right: 50px;
   }

   
</style>