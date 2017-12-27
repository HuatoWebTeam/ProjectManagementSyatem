<template>
 <el-row class='projectDetails myContainer'>
 <el-col :span='24'  class="title">
     <div class="procurment_title">验收资料管理  
            <el-button type="primary" size='mini'   @click='routerGoBack'>返回上一页</el-button>
            <el-button type="primary" size="mini" class="ExportData" @click="Intooutfile">导出数据</el-button>
       </div>
 </el-col>
        <el-col :span='24' class='prejectInfo'>
            <el-col :span='8' class='projectInfoContainer'>
                <div class='projectName'> {{projectname }}</div>
                <div class='projectPersonnel'>
                    <span>项目负责人：{{ProjectPrincipal }}</span>
                </div>
                <div class='projectDate'>
                    <span>联系电话：{{UserPhone }}</span>
                </div>
            </el-col>
            <el-col :span='12' class='projectInfoContainer'>
                <div class='projectInfoDetail'>
                    <span>项目信息：</span>
                    <div class='infoDetails'>
                        客户名称：{{ CustomerName }}, 客户电话： {{ CustomerPhone }}
                    </div>
                    <div class='Projectdate'>
                        项目启动时间: {{ ProjectStaDate }}, 预计结束时间: {{ ScheduledTime }}
                    </div>
                </div>
            </el-col>
            <el-col :span='4' class='projectInfoContainer'>
                <span class='projectState' v-for='item in ProjectStates' :key='item.Code' >{{ item.State }}</span>
            </el-col>
        </el-col>
<el-col :span="24" class="AcceptanceMaterial">
    <template v-for='(item,idx) in acceptData' >
        <div class="AddTextorientation">
          <span>{{item.title}}:</span>
              <div class="AdddoCument">
                <el-upload
                   class="upload-demo"
                   drag
                   :action="TextActionURL"
                   :limit="1"
                   :file-list="fileList"
                   :on-success="fileSuccess"
                   :on-remove="handleRemove"
                   :name='upLoadName + "#"+item.title'
                   >
                  <i class="el-icon-plus"></i>
                </el-upload>
            </div>
              <div class="projectshow"  @click='exportAcceptData(item.url)'>{{item.name}}</div>    
        </div>
      </template>
</el-col>
 </el-row>	
</template>
 <script >
      import{Particulars,VerifyUpload,Derive}from'@/api/api'//引进api
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
                TextActionURL:'/Business/RelicUpload',
                linkprojectname:'',
                linprojectUrl:'',
                 fileList: [],
               acceptData: [
                  {name: null, url: null, title: '合同'},   // 合同
                  {name: null, url: null, title: '采购清单'},  // 采购清单
                  {name: null, url: null, title: '开工申请书'},         // 开工申请
                  {name: null, url: null, title: '施工组织设计'},   // 施工组织设计
                  {name: null,url: null, title: '图纸会审，设计交流'},        // 图纸会审
                  {name:null, url: null, title: '监理日志，工程要记'},          // 监理日志
                  {name: null,url:null, title: '签收单'},               // 签收单
                  {name: null, url: null, title: '培训单'},       // 培训单
                  {name: null, url: null, title: '竣工报告'},    // 竣工报告
                  {name: null, url: null, title: '竣工结算书'},  // 竣工结算书
                  {name: null, url: null, title: '竣工图纸'},       // 竣工图纸
                  {name: null, url: null, title: '安装信息表'},     // 安装信息表
                  {name: null, url: null, title: '监理报告'},          // 监理报告
                  {name:null, url:null, title: '验收文本'},         // 验收文本
                  {name: null, url:null, title: '审核报告'}            // 审核报告
                 ],
            	 }
            },
            methods:{
               GetprojectDeail(){
                console.log('-------')
                   var parms={
                        projectCode: this.$route.params.id
                   }
                Particulars(parms).then( res =>{
                       console.log(res)

                         this.projectname=res.DataList.ProjectName;
                         this.ProjectPrincipal=res.DataList.ProjectPrincipal;
                         this.UserPhone=res.DataList.UserPhone;
                         this.ProjectStaDate=res.DataList.ProjectStaDate.replace('0:00:00','');
                         this.ScheduledTime=res.DataList.ScheduledTime.replace('0:00:00','');
                         this.CustomerName=res.DataList.CustomerName;
                         this.CustomerPhone=res.DataList.CustomerPhone;
                         this.ProjectStates=res.DataList.ProjectStates;  
                         this.upLoadName=res.DataList.ProjectName ;// 提交时候的要发项目名称过去        
                         let acceptanceInfo=res.DataList.RidrTableList;
                 for(let item of acceptanceInfo) {
                    switch (item.FlieType) {
                        case '合同':
                            this.acceptData[0] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '合同'
                            }
                            break;
                         case '采购清单':
                            this.acceptData[1] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '采购清单'
                            }
                            break;
                        case '开工申请书':
                            this.acceptData[2] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '开工申请书'
                            }
                            break;
                        case '施工组织设计':
                            this.acceptData[3] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '施工组织设计'
                            }
                            break;
                        case '图纸会审，设计交流':
                            this.acceptData[4] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '图纸会审，设计交流'
                            }
                            break;
                        case '监理日志，工程要记':
                            this.acceptData[5] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '监理日志，工程要记'
                            }
                            break;
                        case '签收单':
                            this.acceptData[6] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '签收单'
                            }
                            break;
                        case '培训单':
                            this.acceptData[7] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '培训单'
                            }
                            break;
                        case '竣工报告':
                            this.acceptData[8] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '竣工报告'
                            }
                            break;
                        case '竣工结算书':
                            this.acceptData[9] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '竣工结算书'
                            }
                            break;
                        case '竣工图纸':
                            this.acceptData[10] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '竣工图纸'
                            }
                            break;
                        case '安装信息表':
                            this.acceptData[11] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '安装信息表'
                            }
                            break;
                        case '监理报告':
                            this.acceptData[12] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '监理报告'
                            }
                            break;
                        case '验收文本':
                            this.acceptData[13] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '验收文本'
                            }
                            break;
                        case '审核报告':
                            this.acceptData[14] = {
                                name: item.FlieName,
                                url: item.FlieUrl,
                                title: '审核报告'
                            }
                            break;
                    
                        default:
                            break;
                  }
                 }                                                
               })
              },
              exportAcceptData (url) {   // 下载验收资料
                          window.open(url)
                        },
             routerGoBack() {//点击上一页.返回路由上一页
                         this.$router.go(-1);
                        },
               AddText(){
                      this.AddTextdialog=true;//点击的时候文档弹框出来,
                },
              errorfile(res){
                  if(res==0){
                     this.$message.error('上传失败!');
                     this.handleRemove()//上传失败直接删除
                  }
              },
             fileSuccess(res) {
                 this.$message.success('上传成功!');
                 this.GetprojectDeail()//成功的时候调用显示的的页面,刷新*/
              }, 
              handleRemove(file) {//移除除去显示的上面的名称
                 var fileName=file.response.FileUrl.toString()
                  console.log(fileName)
                   if(fileName.indexOf('合同')>-1){
                      this.acceptData.splice(0, 1, {
                            name: null,
                            title: '合同',
                            url: null
                           })
                    }else if(fileName.indexOf('采购清单')>-1){
                       this.acceptData.splice(1, 1, {
                            name: null,
                            title: '采购清单',
                            url: null
                           })
                     }else if(fileName.indexOf('开工申请书')>-1){
                       this.acceptData.splice(2, 1, {
                            name: null,
                            title: '开工申请书',
                            url: null
                           })
                     }
                     else if(fileName.indexOf('施工组织设计')>-1){
                       this.acceptData.splice(3, 1, {
                            name: null,
                            title: '施工组织设计',
                            url: null
                           })
                     }else if(fileName.indexOf('图纸会审')>-1){
                       this.acceptData.splice(4, 1, {
                            name: null,
                            title: '图纸会审, 设计交流',
                            url: null
                           })
                     }else if(fileName.indexOf('监理日志')>-1){
                       this.acceptData.splice(5, 1, {
                            name: null,
                            title: '监理日志, 工程要记',
                            url: null
                           })
                     }else if(fileName.indexOf('签收单')>-1){
                       this.acceptData.splice(6, 1, {
                            name: null,
                            title: '签收单',
                            url: null
                           })
                     }else if(fileName.indexOf('培训单')>-1){
                       this.acceptData.splice(7, 1, {
                            name: null,
                            title: '培训单',
                            url: null
                           })
                     }else if(fileName.indexOf('竣工报告')>-1){
                       this.acceptData.splice(8, 1, {
                            name: null,
                            title: '竣工报告',
                            url: null
                           })
                     }else if(fileName.indexOf('竣工结算书')>-1){
                       this.acceptData.splice(9, 1, {
                            name: null,
                            title: '竣工结算书',
                            url: null
                           })
                     }else if(fileName.indexOf('竣工图纸')>-1){
                       this.acceptData.splice(10, 1, {
                            name: null,
                            title: '竣工图纸',
                            url: null
                           })
                     }else if(fileName.indexOf('安装信息表')>-1){
                       this.acceptData.splice(11, 1, {
                            name: null,
                            title: '安装信息表',
                            url: null
                           })
                     }else if(fileName.indexOf('监理报告')>-1){
                       this.acceptData.splice(12, 1, {
                            name: null,
                            title: '监理报告',
                            url: null
                           })
                     }else if(fileName.indexOf('验收文本')>-1){
                       this.acceptData.splice(13, 1, {
                            name: null,
                            title: '验收文本',
                            url: null
                           })
                     }else if(fileName.indexOf('审核报告')>-1){
                       this.acceptData.splice(14, 1, {
                            name: null,
                            title: '审核报告',
                            url: null
                           })
                     }         
              },
              Intooutfile(){//导出验收资料.
                 var params={
                  projectName:this.projectname
                 }
              Derive(params).then(res=>{
                  if(res=="文件路径不存在"){
                         this.$message({
                                    type:'error',
                                    message:'文件路径不存在'
                                  });
                     }else{
                        window.open(res)
                     }
                 })
              }
            },
            mounted(){
/*                console.log(this.$route.params.id)*/
                this.GetprojectDeail()//立马调用函数.
            },
            deactivated() {//每次都销毁//不缓存,保证是最新的数据,
			        this.$destroy(true);
			     }
 	 }
 </script>
<style scoped lang='scss'>
  .projectDetails{ 
    .title  .procurment_title .el-button{
      float: right;
      margin-top:10px;
      margin-right: 50px;
    }  
    .ExportData{
      margin-right: 50px;
    }
    .prejectInfo{
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      height: 120px;
      margin: 20px;
      background: #FFF;
      border: 1px solid #ccc;
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
      height: 650px;
      margin: 20px;
      background: #FFF;
      border: 1px solid #ccc;
  }
  .AddTextorientation{
      display: inline-block;
      width:11%;
      margin:30px  20px;
      height: 140px;

  }
  .AdddoCument{
      border: 1px solid #ccc;
      height: 80px;
      text-align: center;
      line-height: 80px;
    }
    .upload-demo{
      height: 100%;
    }
     .projectshow{
      overflow: hidden;
      text-decoration:underline;
      color: blue;
      height: 20px;
      cursor: pointer;
     }
 }
</style>
<style type="text/css" lang='scss'>
.projectDetails {
      .el-upload-dragger{
        width: 100%;
        height: 100%;
      }
    .el-upload{
      width: 100%;
    }
   
}

</style>