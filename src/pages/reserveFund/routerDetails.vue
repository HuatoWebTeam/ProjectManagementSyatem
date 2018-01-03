<template>
<el-row class='applySpareContainer myContainer'>
  <el-col :span='24' class='title'>
   <div class="procurment_title">
    备用金编辑申请
    <el-button type="primary" size='mini' @click="routerGoBack" >返回上一页</el-button>
    </div>
  </el-col>
  <el-col :span='24' class='applyContentContainer' >
    <div class='setPadding'>
      <div class='applySpareContent' >
        <el-form label-width='100px' :model='formData' :rules='rules' ref='ruleForm'>
          <el-form-item label='所属项目：' prop='checkProject' >
             <el-input disabled v-model='formData.checkProject'  ></el-input>
          </el-form-item>
          <el-form-item label='申请人：' prop='applicant' >
            <el-input disabled v-model='formData.applicant' placeholder='请输入申请人' ></el-input>
          </el-form-item>
          <el-form-item label='申请金额：' prop='amocntNumber' >
            <el-input v-model.number='formData.amocntNumber' placeholder='请输入申请金额' ></el-input>
          </el-form-item>
          <el-form-item label='申请时间：' required prop='chooseDate'>
            <el-date-picker
            disabled
            type='datetime'
             placeholder='请选择日期' 
             v-model='formData.chooseDate'>
            </el-date-picker>
          </el-form-item>

          <el-form-item label='申请描述：' prop='describe' >
            <el-input type='textarea' class='projectDescribe' v-model='formData.describe' ></el-input>
          </el-form-item>
         <el-form-item label='拒绝理由：'>
            <el-input type='textarea' class='projectDescribe'  :disabled="true" v-model='Explain'></el-input>
          </el-form-item>


           <el-form-item>
            <el-button type='primary' size='small' @click='onSubmit'>提交</el-button>
           </el-form-item>
        </el-form>
      </div>
    </div>
  </el-col>
</el-row>

</template>

<script>
import { ProjectManage,GetPettyCashTable,CashNewRegistration} from '@/api/api'
export default {
  data() {
    var checkAmount = (rule, value, callback) => {
      console.log(value)
      if(value == null || value == '') {
        callback(new Error('请输入申请金额'));
      } else if (value !== '' && !(/^[0-9]+(.[0-9]{1,3})?$/).test(value)) {
        callback(new Error('请输入正确的金额'));
      } else {

      }
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    return {
      projectList: [],     //所属项目列表
      PettyCashCode:"",
      formData: {
        checkProject: null,  // 选中的项目
        applicant: user.name,     // 申请人
        amocntNumber: null,
        chooseDate: "",
        describe: '',
      },
       Explain:'',
      rules: {
        applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
        ],
        amocntNumber: [
          { type: 'number', required: true, message: '请输入申请金额', trigger: 'blur' },
          // { validator: checkAmount, trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入申请描述', trigger: 'blur' },
        ]
      },
      user:null
      
    }
  },
  methods: {
    getProjectList() {
      var params = { pageIndex: 1, pageSize: 1000 };
      ProjectManage(params).then(res => {
        this.projectList = [];
        for(let item of res[0].DataList) {
          this.projectList.push({
            label: item.ProjectName,
            value: item.ProjectCode
          });
        }
        
      })
    },
    routerDetal(){
         var params={
          PettyCashCode:this.$route.params.id
        }
        GetPettyCashTable(params).then(res=>{
              this.PettyCashCode=res.DataList[0].PettyCashCode,
              this.formData.checkProject=res.DataList[0].ProjectName,
              this.formData.amocntNumber=Number(res.DataList[0].AppliedAmount),
              this.formData.chooseDate=res.DataList[0].AppliedDate,
              this.formData.describe=res.DataList[0].Remark,
              this.Explain=res.DataList[0].Explain
        })
    },
    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          var params = {
            pettyCash: {
              AppliedAmount: this.formData.amocntNumber,
              PettyCashCode:this.PettyCashCode,
              Remark:this.formData.describe
             }
          };
          CashNewRegistration(params).then(res => {
            console.log(res);
            console.log(params)
            if(res == 1) {
              this.$message({
                type: 'success',
                message: '添加成功！！！'
              });
              this.$refs['ruleForm'].resetFields();
            } else {
              this.$message({
                type: 'error',
                message: '添加失败，请重试！！！'
              })
            }
          })
        } else {
          return false;
        }
      })
    },
    timeFormatter(value){
      var date = new Date(value);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
       routerGoBack() {//点击上一页.返回路由上一页
         this.$router.go(-1);
        },


  },
  mounted() {
    this.getProjectList();
     this.routerDetal();//详情列表.
  },
  deactivated() {
		this.$destroy(true);
	}
}
</script>

<style scoped lang='scss'>
.applySpareContainer {
    .procurment_title .el-button{
         margin-left: 81%;
    }
  height: 100%;
  .applyContentContainer {
    // width: cacl(100% -40px);
    height: calc(100% - 90px);
    // margin: 20px;
    .setPadding {
      height: 100%;
      margin: 20px;
      background: #fff;
      position: relative;
      .applySpareContent {
        position: absolute;     
        top: 8%;
        right: 0;
        bottom: 0;
        left: 20%;
        margin: auto;
        .el-form-item {
          .el-input {
            width: 220px;
          }
          .projectDescribe {
            height: 200px;
            width: 500px;
          }
          .el-button {
            /*margin-left: 500px;*/
          }
        }
      }
    }
    
  }
}
</style>