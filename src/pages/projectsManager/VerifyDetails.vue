<template>
 <el-row>
 <el-col :span='24'  class="projectList">
     <div class="procurment_title">验收资料管理  
            <el-button type="primary" size='mini'   @click='routerGoBack'>返回上一页</el-button>
            <el-button type="primary" size="mini" class="ExportData">导出数据</el-button>
       </div>
 </el-col>
 <el-col :span='24' class="projectData">
     <div class="projectleft">
         <div class="projectname"><strong>{{projectname}}</strong></div>
         <div>
            <span>项目负责人:</span>{{ProjectPrincipal}}<span>联系电话:</span>{{UserPhone}}
            <span>客户名称:</span>{{CustomerName}}<span>客户电话:</span>{{CustomerPhone}}
         </div>
         <div><span>开工日期:</span>{{ProjectStaDate}}<span>结束日期:</span>{{ScheduledTime}}</div>
     
     </div>
     <div class="projectright">
            <div v-for='item in ProjectStates' :key='item.ProjectCode'  class=" Extended">{{item.State}}</div>
     </div>    
</el-col>
<el-col :span="24" class="AcceptanceMaterial">
      <div class="AddTextorientation">
        <span>合同:</span>
        <div class="AdddoCument" @click="AddText" ><i class="el-icon-plus"></i></div>      
      </div>
      <div class="AddTextorientation">
         <span>采购清单:</span>
         <div class="AdddoCument"><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>开工申请文件:</span>
         <div class="AdddoCument"><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>施工组织设计:</span>
         <div class="AdddoCument" ><i class="el-icon-plus"></i></div>      
      </div>
      <div class="AddTextorientation">
         <span>图纸会审技术交流:</span>
         <div class="AdddoCument" ><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>监工日志,工程要记:</span>
         <div class="AdddoCument" ><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>签收单:</span>
         <div class="AdddoCument" ><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>培训单:</span>
         <div class="AdddoCument"><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>竣工报告:</span>
         <div class="AdddoCument" ><i class="el-icon-plus"></i></div>      
      </div>
      <div class="AddTextorientation">
         <span>竣工结算书:</span>
         <div class="AdddoCument" @click="AddText"><i class="el-icon-plus"></i></div>      
      </div>
     <div class="AddTextorientation">
         <span>竣工图纸:</span>
         <div class="AdddoCument" @click="AddText"><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>安装信息表:</span>
         <div class="AdddoCument" @click="AddText"><i class="el-icon-plus"></i></div>      
      </div>
      <div class="AddTextorientation">
         <span>监控报告:</span>
         <div class="AdddoCument" @click="AddText"><i class="el-icon-plus"></i></div>      
      </div>

      <div class="AddTextorientation">
         <span>验收文本:</span>
         <div class="AdddoCument" @click="AddText"><i class="el-icon-plus"></i></div>      
      </div>
       <div class="AddTextorientation">
         <span>审核报告:</span>
         <div class="AdddoCument" @click="AddText"><i class="el-icon-plus"></i></div>      
      </div>
</el-col>
    <el-dialog
   :visible.sync="AddTextdialog" 
   title='上传报销详细清单'
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
        <el-button   size="medium" type="primary" >确 定</el-button>
      </span>
  </el-dialog>   
 </el-row>	
</template>
 <script >
      import{Particulars,VerifyUpload}from'@/api/api'//引进api
 	 export default {
            data(){
            	return{
                projectCode:'',
                projectname:'',
                ProjectPrincipal:'',
                UserPhone:'',
                ProjectStaDate:'',
                ScheduledTime:'',
                CustomerName:'',
                CustomerPhone:'',
                ProjectStates:[],
                AddTextdialog:false,
                upLoadName:'',
                TextActionURL:'/Business/RelicUpload'
            	 }
            },
            methods:{
                 GetprojectDeail(){
                   var parms={
                        projectCode: this.$route.params.id
                   }
                   console.log(parms)
                Particulars(parms).then( res =>{
                  console.log(res)
                         this.projectname=res.DataList.ProjectName;
                         this.ProjectPrincipal=res.DataList.ProjectPrincipal;
                         this.UserPhone=res.DataList.UserPhone;
                         this.ProjectStaDate=res.DataList.ProjectStaDate;
                         this.ScheduledTime=res.DataList.ScheduledTime;
                         this.CustomerName=res.DataList.CustomerName;
                         this.CustomerPhone=res.DataList.CustomerPhone;
                         this.ProjectStates=res.DataList.ProjectStates;        
                  })
              },
               routerGoBack() {//点击上一页.返回路由上一页
                            this.$router.go(-1);
                        },
                AddText(){
                      this.AddTextdialog=true;//点击的时候文档弹框出来,
                },
               closeAddText(){//关闭添加弹框
                this.AddTextdialog=false;
                },
             handleRemove(file, fileList) {//删除
                  console.log(file, fileList);
                },
              errorfile(res){
                  if(res==0){
                     this.$message.error('上传失败!');
                     this. handleRemove()//上传失败直接删除
                  }
              },
             fileSuccess(res) {
                console.log(res);
                this.$refs['uploadFile'].clearFiles();
                  this.AddTextdialog=false;  
              },
            },
            mounted(){
                console.log(this.$route.params.id)
                this.GetprojectDeail()//立马调用函数.
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
    .projectData{
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      height: 120px;
      margin: 20px;
      background: #FFF;
      border: 1px solid #ccc;
    }
   .projectleft{
    display: inline-block;
    width:75%;
   
   }
   .projectname{
      padding-left:10px;

   }
 .projectleft div{
      margin: 10px 0px 10px 0px;
 }
   .projectright{
      float: right;
    display: inline-block;
    width: 20%;
   }
   .projectleft span{
      display: inline-block;
      margin-right: 10px;
      margin-left: 10px;
   }
  .Extended{
      width: 100px;
      height: 35px;
      background: url(../../assets/img/projectsBeyond.png);
      line-height: 35px;
      text-align: center;
      color: red;
  }
  .AcceptanceMaterial{
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      height: 600px;
      margin: 20px;
      background: #FFF;
      border: 1px solid #ccc;
  }
  .AddTextorientation{
      display: inline-block;
      height: 120px;
      width:11%;
      margin:40px  20px;
  }
  .AdddoCument{
      border: 1px solid #ccc;
      height: 120px;
      text-align: center;
     line-height: 120px;
  }
</style>