<template>
<el-row class='applySpareContainer myContainer'>
  <el-col :span='24' class='title'>
    备用金编辑申请
  </el-col>
  <el-col :span='24' class='applyContentContainer' >
    <div class='setPadding'>
      <div class='applySpareContent' >
        <el-form label-width='100px' :model='formData' :rules='rules' ref='ruleForm'>
          <el-form-item label='所属项目：' prop='checkProject' >
            <el-select
              placeholder='请选择项目'
              v-model='formData.checkProject'
              >
              <el-option
                v-for='item in projectList'
                :key='item.value'
                :value='item.value'
                :label='item.label'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='申请人：' prop='applicant' >
            <el-input disabled v-model='formData.applicant' placeholder='请输入申请人' ></el-input>
          </el-form-item>
          <el-form-item label='申请金额：' prop='amocntNumber' >
            <el-input v-model.number='formData.amocntNumber' placeholder='请输入申请金额' ></el-input>
          </el-form-item>
          <el-form-item label='申请时间：' required prop='chooseDate'>
            <el-date-picker
            type='datetime'
             placeholder='请选择日期' 
             v-model='formData.chooseDate'>
            </el-date-picker>
          </el-form-item>
          <el-form-item label='申请描述：' prop='describe' >
            <el-input type='textarea' class='projectDescribe' v-model='formData.describe' ></el-input>
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
import { ProjectManage} from '@/api/api'
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
      formData: {
        checkProject: null,  // 选中的项目
        applicant: user.name,     // 申请人
        amocntNumber: null,
        chooseDate: new Date(),
        describe: ''
      },
      rules: {
        checkProject: [
          { type: 'number', required: true, message: '请选择所属项目', trigger: 'change' },
        ],
        applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
        ],
        amocntNumber: [
          { type: 'number', required: true, message: '请输入申请金额', trigger: 'blur' },
          // { validator: checkAmount, trigger: 'blur' }
        ],
        chooseDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
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
        console.log(res);
      })
    },
    onSubmit() {
/*      console.log(this.formData.checkProject);
      console.log(this.formData.applicant);
      console.log(this.timeFormatter(this.formData.chooseDate));
      console.log(this.formData.describe);
      console.log(this.formData.amocntNumber)*/
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          var params = {
            pettyCash: {
              ProjectCode: this.formData.checkProject,
              LoginName: this.formData.applicant,
              AppliedAmount: this.formData.amocntNumber,
              AppliedDate:this.timeFormatter(this.formData.chooseDate),
              Remark:this.formData.describe
             }
          };
          InsertPettyCash(params).then(res => {
            console.log(res);
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

  },
  mounted() {
    this.getProjectList();
  },
  deactivated() {
		this.$destroy(true);
	}
}
</script>

<style scoped lang='scss'>
.applySpareContainer {
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