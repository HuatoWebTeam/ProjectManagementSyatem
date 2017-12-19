
<template>
<el-row class="projectList myContainer">
  <el-col :span='24' class="title">
    <div class="procurment_title">项目经理-项目列表  <el-button size="small" class="add_project" type="primary"  @click="addproject" v-show="show">添加项目</el-button></div>
  </el-col>
  <el-col :span='24' class="projectDataList">
   <el-table
    :data="projectData"
     stripe
     border
     width='100%'>
      <el-table-column
        prop="ProjectName"
        label="项目名称"
       >
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
        width="200">
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
        width='300'
        >
        <template slot-scope="scope">
        <el-button type="primary" size="small" @click='routerToDetails(scope.$index)'>项目详情</el-button>
        <el-button type="primary"  v-show="show" size="small" @click='Editingpermissions(scope.$index)'>人员分配</el-button>
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
  <el-col :span='24'>
    <el-dialog
      title="添加备货"
      :visible.sync="dialogVisible"
       width="26%"    
    
       class="projectedit"
        @close='projecteditClose'
        @open='projecteditOpen'
       >       
      <el-form :label-position="labelPosition" label-width="140px" :model="projectInfo" status-icon :rules="projectRules" ref="projectaddrules">
        <el-form-item label="项目名称:" prop="ProjectName">
          <el-input v-model="projectInfo.ProjectName" ></el-input>
        </el-form-item>
        <el-form-item label="客户名称:" prop="CustomerName">
          <el-input v-model="projectInfo.CustomerName" ></el-input>
        </el-form-item>
        <el-form-item label="客户电话:" prop="CustomerPhone">
          <el-input v-model="projectInfo.CustomerPhone" ></el-input>
        </el-form-item>
        <el-form-item label="合同金额:" prop="ContractAmount" >
          <el-input v-model="projectInfo.ContractAmount" ></el-input>
        </el-form-item>
        <el-form-item label="项目负责人:"  prop="ProjectPrincipal">
          <el-input v-model="projectInfo.ProjectPrincipal"></el-input>
        </el-form-item>
        <el-form-item label="项目启动时间" prop="ProjectStaDate"> 
                <el-date-picker
                   v-model="projectInfo.ProjectStaDate"
                   type="date"
                   placeholder="选择日期"
                   value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
        </el-form-item>
        <el-form-item label="项目预计结束时间" prop="ScheduledTime">
              <el-date-picker
                   v-model="projectInfo.ScheduledTime"
                   type="date"
                   placeholder="选择日期"
                   value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
                <!-- // value-format="yyyy-MM-dd" -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' class="stock_but"  @click="dialogVisible = false">取  消</el-button>
        <el-button size='small'  type="primary"  class="projectadd_but" @click='projectadd_but'>确  定</el-button>
      </span>
    </el-dialog>
  </el-col>
  <el-col :span='24'>
    <el-dialog
       title="人员分配"
      :visible.sync="jurisdiction"
       width="30%"    
       class="personnelAssignment"
        @close='personnelAssignmentClose'
        @open='personnelAssignmentOpen'
       >       
      <el-transfer                           
        :titles="['无权限', '有权限']"
         v-model="valueright"
         filterable
        :data="data">
      </el-transfer><!-- 穿梭框列表插件 -->
      <span slot="footer" class="dialog-footer">
        <el-button size='small' class="stock_but" @click="jurisdiction = false">取  消</el-button>
        <el-button size='small' type="primary"  class="projectadd_but" @click='setAssignment'>确  定</el-button>
      </span>
    </el-dialog>
  </el-col>
</el-row>

</template>

<script>
   import {ProjectManage,InsertProjectManage,GetUserManageData,AuthorizedList,InsertPersonnelAssignment} from '@/api/api'//引进api
export default {
    data(){
        //自定义表单--自定义
      var checkprojectName=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error('工程名称不能为空'));
        }
        callback();
      };
      var checkCustomerName=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error('客户名称不能为空'));
        }
        callback();
      };
      var checkCustomerPhone = (rule, value, callback) => {
        //console.log(value);
        //console.log((/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/).test(value));
        if(value !== '' && !(/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/).test(value)) {
          callback(new Error('请输入正确的联系电话'));
        } else if (value == '') {
          callback(new Error('请联系电话'));
        }
        callback();
      };
      var checkContractAmount=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error('金额不能为空'));
        }
        callback();
      };
      var checkProjectPrincipal=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error('项目负责人不能为空'));
        }
        callback();
      };
      var checkProjectStaDate=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error('日期不能为空'));
        }
        callback();
      };
      var checkScheduledTime=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error('日期不能为空'));
        }
        callback();
      };

      return{
            data:[],
            valueright:[],//权限分配,右边显示的数组
            jurisdiction:false,//默认关闭弹框 
            labelPosition: 'right',//表格靠右!字体对齐
            pageSize: 10,
            pageIndex:1,
            projectData:[],
            totalNumber:null,//总条数
            dialogVisible:false,//默认弹框关闭
            show:true,
            projectList:{
                ProjectName:'',//项目名称
                ProjectPrincipal:'',//项目负责人
                CustomerPhone:'',//客户电话
                ProjectStaDate:'',//项目计划时间
                ProjectStaDate:'',//项目状态
             },
             //定义弹框显示时候的值!
            projectInfo:{
                ProjectName:'',
                CustomerName:'',
                CustomerPhone:'',
                ContractAmount:'',
                ProjectPrincipal:'',//项目负责人
                ProjectStaDate:'',//项目启动时间
                ScheduledTime:'',//项目结束时间
                ProjectCode:''
              },
            projectRules:{//验证表格里面的信息
                    ProjectName:[
                       { validator: checkprojectName, trigger: 'blur' }
                    ],
                    CustomerName:[
                       { validator: checkCustomerName, trigger: 'blur' }
                     ],
                     CustomerPhone:[
                      { validator:checkCustomerPhone , trigger: 'blur' }
                     ],
                     ContractAmount:[
                      { validator:checkContractAmount , trigger: 'blur' }
                     ],
                     ProjectPrincipal:[
                       { validator:checkProjectPrincipal , trigger: 'blur' }
                     ],
                     ProjectStaDate:[
                      { validator:checkProjectStaDate , trigger: 'blur' }
                     ],
                     ScheduledTime:[
                      { validator:checkScheduledTime, trigger: 'blur' }
                     ]
                }               
             }
          },
      methods:{
        Editingpermissions(idx){//点击对应的!拿到对应的人员分配
           this.ProjectCode = this.projectData[idx].ProjectCode//项目编码
           this.jurisdiction=true;//点击
           this.permission()//调用函数列表请求
        },
        routerToDetails(index) {
          this.$router.push({name: 'ProjectsListDetails', params: { id: this.projectData[index].ProjectCode}});
          console.log(this.projectData[index])
        },
        permission(){//有权限的列表请求
          var parms={
             projectCode:this.ProjectCode  
          }
          AuthorizedList(parms).then(res =>{
              this.valueright=[];
              for(let i=0;i<res[0].TotalNumber;i++){
                this.valueright.push(res[0].DataList[i].LoginName)
              } 
          })
        },
        //点击确定发送给权限的人给后台
        setAssignment(){
          let list=[];
          // console.log(this.valueright.length);
              for(let i=0;i<this.valueright.length;i++){
              list.push({
                LoginName:this.valueright[i],
                ProjectCode:this.ProjectCode 
              })      
          } 
          var parms={ 
              list:list
            }
          InsertPersonnelAssignment(parms).then(res=>{
                 if(res==1){
                  this.$message({
                    type:'success',
                    message:'授权成功'
                  })
                  this.jurisdiction=false;
                 }else{
                  this.$message({
                    type:'error',
                    message:"授权失败"
                  })
                 }
            })         
        },
        Unprivilegedlist(){//
            var parms={
                pageIndex: 1,
                pageSize: 200
            }
           GetUserManageData(parms).then(res =>{//弹框数据列表穿梭框
                this.data=[];
                // console.log(res);
                  for(let i=0;i<res[0].TotalNumber;i++){
                    this.data.push({
                      key:res[0].DataList[i].UserName,
                      label:res[0].DataList[i].UserName
                    })
                  }
          })
        },    
        personnelAssignmentClose(){
          //关闭穿梭框
        },
        personnelAssignmentOpen(){
        //打开穿梭框函数
       },
        getprojectmange(){
          var parms={//传的参数
               pageIndex: this.pageIndex,
               pageSize: this.pageSize,
              }
          ProjectManage(parms).then( res => {//项目列表
              console.log(res)
              if(res[0].IsTrue==0){
                  this.show=false;
              }else{
                  this.show=true;
              }
              this.totalNumber=res[0].TotalNumber//把请求的页码赋值过来
              this.projectData=[]; 
              console.log(res)
              for(let item of res[0].DataList){
                this.projectData.push({
                 ProjectName:item.ProjectName,
                  ProjectPrincipal:item.ProjectPrincipal,
                  CustomerPhone:item.CustomerPhone,
                  ProjectStaDate:item.ProjectStaDate.replace(' 0:00:00', ''),
                  ProjectStates:item.ProjectStates,
                  ProjectCode:item.ProjectCode
                })//遍历出来的数组放进去
              }
                console.log( this.projectData)
                // console.log(res[0].DataList)
          })
        },
        pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
             this.pageIndex = pageIndex;//传当前页面   
             this.getprojectmange()//换页码时候调用
        },
        addproject(){//添加的时候弹框显示
          this.dialogVisible =true;
        },
        projecteditClose(){//关闭窗口的时候清空数据,
          this.projectInfo={
              ProjectName:'',
              CustomerName:'',
              CustomerPhone:'',
              ContractAmount:'',
              ProjectPrincipal:'',//项目负责人
              ProjectStaDate:'',//项目启动时间
              ScheduledTime:''//项目结束时间
          }
        },
        projecteditOpen(){
          //打开时的函数
        },
        projectadd_but(){//添加项目//给后台传值
            var parms={
               projectManage:this.projectInfo//传值往后台
            } 
            this.$refs['projectaddrules'].validate((valid) =>{
              if (valid) {
                  InsertProjectManage(parms).then(res=>{
                    console.log("传给")
                    console.log(parms)
                    if(res==1){
                      this.$message({
                        type:'success',
                        message:'添加成功'
                      });
                       this.$refs['projectaddrules'].resetFields()
                        this.dialogVisible=false;//关闭窗口
                        this.getprojectmange()//是刷新列表
                    }else{
                          this.$message({
                            type:'error',
                            message:'添加失败'
                          })
                        }
                  })
                }   
              })
            }     
      },
    mounted(){
      this.getprojectmange();//调用函数列表
      this.Unprivilegedlist()//调用无权限列表的函数
      this.permission()//调用有权限列表
    }
}
</script>

<style scoped lang='scss'>
.projectList{
/*    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background:#fff;
    box-shadow: 0px 2px 1px #888888;*/
    .projectDataList{
         width: calc(100% - 40px);
        height: calc(100% - 90px);
        margin: 20px;
        background: #fff;
        border: 1px solid #ccc;
        text-align: center;
    }
    .add_project{
      display: inline-block;
    	float: right;
    	margin-right: 50px;
      margin-top: 11px;
    }
    .procurment_title{
      margin-bottom: 30px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
    .el-table .projectBeyondSpan{
      display: inline-block;
      width: 100px;
      height: 40px;
      color:red;
      line-height: 40px;
      font-size: 18px;
      background: url(../../assets/img/projectsBeyond.png) no-repeat;
      background-size: 100% 100%;
    }
}
</style>
