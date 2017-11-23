<template>
  <el-row class='peronelContainer myContainer' >
    <el-col :span='24' class='personnelManage title'>
      <div class='peronnelTitle'>人员信息管理</div>
      <el-button class='peronnelButton' size='mini' type="primary" @click='addPersonnal'>添加人员</el-button>
    </el-col>
    <el-col class='peronnelInfoList'>
      <el-table
        :data="peronnelData"
        border
        stripe>
        <el-table-column
        prop='UserName'
        label='姓名'>

        </el-table-column>
        <el-table-column
        prop='PositionName'
        label='职位'>

        </el-table-column>
        <el-table-column
        prop='UserPhone'
        label='联系电话'>

        </el-table-column>
        <el-table-column
        prop='UserQq'
        label='QQ'>

        </el-table-column>
        <el-table-column
        label='操作'>
          <template slot-scope='scope'>
            <el-button class='infoEdit' type="text" size="small" @click='UpdateUserData(scope.$index)'>信息编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span='24' class='myPagination'>
        <el-pagination
          layout="prev, pager, next"
          :total="totalNumber"
          :page-size='pageSize'
          @current-change='pageIndexChange'>
        </el-pagination>
      </el-col>
    </el-col>
    <el-col :span='24'>
      <el-dialog 
        title='成员信息编辑'
        :visible.sync="editPeraonnlInfo"
        width='30%'
        center
        @close='personnalDialogClose'
        @open='personnalDialogOpen'
        class='personnelDialog'>
        <el-form :model='personnalInfo' :rules='PersonnalRules' status-icon ref='personnalRule' class='personnalForm' label-width="120px">
          <el-form-item label='姓名:' prop='UserName'>
            <el-input v-model='personnalInfo.UserName' placeholder='请输入姓名' ></el-input>
          </el-form-item >
          <el-form-item label='部门:' prop='SectionCode'>
            <el-select v-model='personnalInfo.SectionCode' placeholder="请选择部门" siza='large'>
              <el-option v-for='item in sectionData' :key='item.SectionCode' :label='item.SectionName' :value='String(item.SectionCode)' ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='职务:' prop='PositionCode'>
            <el-select v-model='personnalInfo.PositionCode' placeholder="请选择职务">
              <el-option v-for='item in positionData' :label='item.PositionName' :value='String(item.PositionCode)' :key='item.PositionCode' ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='联系电话:' prop='UserPhone'>
            <el-input v-model.number='personnalInfo.UserPhone' placeholder='请输入联系电话'></el-input>
          </el-form-item >
          <el-form-item label='联系QQ:' prop='UserQq'>
            <el-input v-model.number='personnalInfo.UserQq' placeholder='请输入联系QQ'></el-input>
          </el-form-item >
          <el-form-item label='密码:' prop='UserPass'>
            <el-input  v-model='personnalInfo.UserPass' :disabled="!isAdd" placeholder='请输入密码'></el-input>
          </el-form-item >
          <el-form-item label='确认密码:' prop='confirmPass'>
            <el-input  v-model='personnalInfo.confirmPass' :disabled="!isAdd"  placeholder='请输入确认密码'></el-input>
          </el-form-item >
          <el-form-item label='成员状态:' prop='UserState'>
            <el-select v-model='personnalInfo.UserState' placeholder="请选择成员状态">
              <el-option label='启用成员' :value='1' ></el-option>
              <el-option label='停用成员' :value='0' ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot='footer' class='dialogFooter'>
          <el-button type='primary' @click='updateOrAdd' >确定</el-button>
          <el-button @click='editPeraonnlInfo = false' >取消</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
 
</template>

<script>
import { GetUserManageData, AddUserManaeg, UpdateUserManaeg, GetSectionData, GetPositionData } from '@/api/api'
export default {
  data() {
    //  表单验证规则---自定义的
    var chaeckName = (rule, value, callback) => {
     
      if(value === '') {
        callback(new Error('请输入姓名'));
      }
      callback();
    };
    var checkSection = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请选择部门'));
      }
      callback();
    };
    var checkPosition = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请选择职位'));
      }
      callback();
    };
    var checkPhone = (rule, value, callback) => {
      //console.log(value);
      //console.log((/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/).test(value));
      if(value !== '' && !(/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/).test(value)) {
        callback(new Error('请输入正确的联系电话'));
      } else if (value == '') {
        callback(new Error('请联系电话'));
      }
      callback();
    };
    var checkQq = (rule, value, callback) => {
      if(!(/^[0-9]*$/).test(value) && value !== '') {
        callback(new Error('请输入正确的QQ号码'));
      } else if (value == '') {
        callback(new Error('请输入QQ号码'));
      }
      callback();
    };
    var passWord = (rule, value, callback) => {
      if(!/^[A-Za-z0-9]+$/.test(value)) {
        callback(new Error('密码不能有汉字'));
      }
      callback();
    };
    var checkPass = (rule, value, callback) => {
      //  console.log(value)
        console.log(this.personnalInfo.UserPass);
        if(!this.isAdd ) {
          if( value !== this.personnalInfo.UserPass && value !== '' ) {
            callback(new Error('两次输入的密码不同'));
          };
          callback();
        } else if (value !== this.personnalInfo.UserPass ) {
          callback(new Error('两次输入的密码不同'));
        } else {
          callback();
        }  
    };
    var checkState = (rule, value, callback) => {
      if(value == '') {
        callback(new Error('请选择成员状态'));
      }
      callback();
    }
    return {
      peronnelData: [     // 表格信息
      ],
      PersonnalRules: {   //输入框验证规则
        UserName:[
          { validator: chaeckName, trigger: 'blur' }
        ],
        SectionCode:[
          { validator: checkSection, trigger: 'blur' }
        ],
        PositionCode: [
          { validator: checkPosition, trigger: 'blur' }
        ],
        UserPhone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        UserQq: [
          { validator: checkQq, trigger: 'blur' }
        ],
        UserPass: [
          { validator: passWord, trigger: 'blur' }
        ],
        confirmPass: [
          { validator: checkPass, trigger: 'blur' }
        ],
        UserState: [
          { validator: checkState, trigger: 'blur' }
        ]
      },
      editPeraonnlInfo: false,    // 弹窗的状态
      isAdd: true,                // true 为添加用户， false 为修改    
      sectionData:[],             // 部门信息
      positionData:[],            // 职位信息
      personnalInfo: {          // 打开的弹窗内容
        LoginName: '',             // 名字
        UserName: '',
        UserCode: '',             // 用户ID
        SectionCode: '',          // 部门
        PositionCode: '',             // 职务
        UserPhone: '',            // 联系电话
        UserQq: '',               // 联系QQ
        UserPass: '',          // 密码
        confirmPass: '',       // 确认密码
        UserState: ''     // 成员状态
      },
      total: null,
      totalNumber: null,
      pageSize: 2,      // 每页的条数
      pageIndex: 1      // 当前页
    }
  },
  methods: {      // 需要用到的方法
    getUserData() {     // 获取成员信息
      //console.log(this.pageIndex, this.pageSize)
      var params = {        // 传递的参数
        pageIndex: this.pageIndex,  
        pageSize: this.pageSize
        
      };
      GetUserManageData(params).then(res => {   // 发送请求
        // console.log(res);
        this.totalNumber = res[0].TotalNumber;   //设置总条数
        this.peronnelData = [];            // 清空表格数据
        console.log(this.totalNumber)
        for( let item of res[0].DataList) {
          item.confirmPass = '';
          //item.UserState = item.UserState == 1 ? '启用成员' : '停用成员';
          this.peronnelData.push(item);
        }
        //console.log(this.peronnelData);
      })
    },
    getSectionInfo(){
      GetSectionData().then(res => {
        //console.log(res);
        this.sectionData = res;
      })
    },
    getPositionInfo() {
      GetPositionData().then(res => {
        //console.log(res);
        this.positionData = res;
      })
    },
    addPersonnal(){   // 打开添加用户
      this.isAdd = true; //
      this.editPeraonnlInfo = true;
    },
    UpdateUserData(idx) {   // 打开编辑用户
      //console.log(idx);   // idx 为点击行的索引  
      this.isAdd = false;   //
      this.personnalInfo = {
        LoginName: this.peronnelData[idx].LoginName,             // 名字
        UserName: this.peronnelData[idx].UserName,
        UserCode: this.peronnelData[idx].UserCode,             // 用户ID
        SectionCode: this.peronnelData[idx].SectionCode,       // 部门
        PositionCode: this.peronnelData[idx].PositionCode,             // 职务
        UserPhone: this.peronnelData[idx].UserPhone,            // 联系电话
        UserQq: this.peronnelData[idx].UserQq,               // 联系QQ
        UserPass: this.peronnelData[idx].UserPass,          // 密码
        confirmPass: this.peronnelData[idx].confirmPass,       // 确认密码
        UserState: this.peronnelData[idx].UserState     // 成员状态
      };
      //console.log(this.personnalInfo);
      this.editPeraonnlInfo = true;
      
    },
    personnalDialogClose() {    // 关闭弹窗的回调函数
      //console.log('close');
      this.$refs['personnalRule'].resetFields();  //清空表单的验证状态
      // 对话框关闭的时候清空数据
      this.personnalInfo = {
        LoginName: null,
        UserName: null,
        UserCode: null,
        SectionCode: null,
        PositionCode: null,
        UserQq: null,
        UserPhone:null,
        confirmPass: null,
        UserPass:null,
        UserState: null
      };
    },
    personnalDialogOpen() {     // 弹窗打开的回调
      //console.log('open');
      
    },
    updateOrAdd() {     // 添加或者编辑成员
      //console.log(this.personnalInfo)
      var params = {
        userManage: this.personnalInfo
      };

      if(this.isAdd) {   // 添加

      this.personnalInfo.LoginName = this.personnalInfo.UserName;
      this.$refs['personnalRule'].validate((valid) => {
        if(valid) {
          AddUserManaeg(params).then(res => {
            //console.log(res);
            if(res == 1) {
              this.$message({
                  type: 'success',
                  message: '添加成功！！！'
              });
              this.$refs['personnalRule'].resetFields();  //清空表单的验证状态
              this.editPeraonnlInfo = false;
            } else {
              this.$message({
                  type: 'error',
                  message: '添加失败！！！'
              })
            }
          })
        }
      })
      }  else {           // 编辑 更新
        this.$refs['personnalRule'].validate((valid) => {
          //console.log(valid)
          if(valid) {
            UpdateUserManaeg(params).then(res => {
              console.log(res);
              if(res == 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功！！！'
                });
                this.getUserData();
                this.$refs['personnalRule'].resetFields();
                this.editPeraonnlInfo = false;
              } else {
                 this.$message({
                  type: 'error',
                  message: '修改失败！！！'
                })
              }
            })
          }
        })
      }
    },
    pageIndexChange(pageIndex) {    // 当前页改变触发的事件，参数是改变的页码（当前页）
      //console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.getUserData();      /// 当前页改变时重新加载数据
    }
  },
  mounted() {    // vue 生命周期函数
    this.getUserData();  // 页面打开加载成员信息
    this.getSectionInfo();   //获取部门信息
    this.getPositionInfo();  // 获取职位信息
  }
}
</script>

<style scoped lang='scss'>
  .peronelContainer {
    height: 100%;
    .personnelManage {

      .peronnelTitle {
        display: inline;
      }
      .peronnelButton {
        
        float: right;
        margin-top: 11px;
        margin-right: 50px;
      }
    }
    .peronnelInfoList {
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      margin: 20px;
      background: #fff;
      border: 1px solid #ccc;
      .el-table {
        text-align: center;
        
        .infoEdit {
          width: 80px;
          background: #248bfe;
          height: 30px;
          color: #fff;
          border: 1px solid #248bfe;
        }
        .el-table__header-wrapper {
          .el-table__header {
            .cell {
              text-align: center;
            }
          }
          
        }
      }
    }
    .el-form .el-form-item .el-form-item__content {
      display: inline-block;
    }
    .personnalForm.el-form .el-form-item {
      margin-bottom: 15px;
    }
    .personnalForm .el-form-item .el-select {
      width: 100%;
    }
  }
  
</style>
<style lang='scss' >
.peronnelInfoList {
  .cell {
    text-align: center;
  }
}
.myPagination {
  height: 70px;
  line-height: 70px;
  .el-pagination {
    height: 32px;
    margin-top: 16px;
    text-align: center;
    button {
      border: 1px solid #d9d9d9;
      margin-right: 5px;
    }
    .el-pager li {
      border: 1px solid #d9d9d9;
      margin-right: 5px;
    }
  }
}
.el-table .el-table__header-wrapper tr{
  background: #e5e5e5;
}
/*  .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #e5e5e5;
}
*/
.personnelDialog .el-dialog--center .el-dialog__header {
  padding-top: 15px;
  background: #f5f5f5;
}
</style>

