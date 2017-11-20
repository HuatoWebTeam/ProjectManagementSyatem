<template>
  <el-row class='peronelContainer' >
    <el-col :span='24' class='personnelManage'>
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
        prop='PositionCode'
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
          :total="total">
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
        <el-form :model='personnalInfo' class='personnalForm' label-position="right" label-width="120px">
          <el-form-item label='姓名:' >
            <el-input v-model='personnalInfo.UserName' placeholder='请输入姓名' ></el-input>
          </el-form-item >
          <el-form-item label='部门:'>
            <el-select v-model='personnalInfo.SectionCode' placeholder="请选择部门" siza='large'>
              <el-option label='商务部men' value='1' ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='职务:'>
            <el-select v-model='personnalInfo.PositionCode' placeholder="请选择职务">
              <el-option label='商务经理' value='2' ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='联系电话:'>
            <el-input v-model='personnalInfo.UserPhone' placeholder='请输入联系电话'></el-input>
          </el-form-item >
          <el-form-item label='联系QQ:'>
            <el-input v-model='personnalInfo.UserQq' placeholder='请输入联系QQ'></el-input>
          </el-form-item >
          <el-form-item label='密码:'>
            <el-input type='password' v-model='personnalInfo.UserPass' placeholder='请输入密码'></el-input>
          </el-form-item >
          <el-form-item label='确认密码:'>
            <el-input type='password' v-model='personnalInfo.confirmPass' placeholder='请输入确认密码'></el-input>
          </el-form-item >
          <el-form-item label='成员状态:'>
            <el-select v-model='personnalInfo.UserState' placeholder="请选择成员状态">
              <el-option label='启用成员' :value='1' ></el-option>
              <el-option label='停用成员' :value='0' ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot='footer' class='dialogFooter'>
          <el-button type='primary' >确定</el-button>
          <el-button  >取消</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
 
</template>

<script>
import { GetUserManageData, AddUserManaeg, UpdateUserManaeg } from '@/api/api'
export default {
  data() {
    return {
      peronnelData: [
        // {
        //   LoginName: '',
        //   UserName: '',
        //   UserCode: '',
        //   SectionCode: '',
        //   PositionCode: '',
        //   UserPhone: '',
        //   UserQq: '',
        //   UserPass: '',
        //   UserState: ''
        // }
      ],
      editPeraonnlInfo: false,
      personnalInfo: {
        LoginName: '',             // 名字
        UserName: '',
        UserCode: '',             // 用户ID
        SectionCode: '',       // 部门
        PositionCode: '',             // 职务
        UserPhone: '',            // 联系电话
        UserQq: '',               // 联系QQ
        UserPass: '',          // 密码
        confirmPass: '',       // 确认密码
        UserState: ''     // 成员状态
      },
      total: null,
      pageSize: 10,
      pageIndex: 1
    }
  },
  methods: {
    getUserData() {
      console.log(this.pageIndex, this.pageSize)
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
        
      };
      GetUserManageData(params).then(res => {
        // console.log(res);
        this.total = res[0].TotalNumber;
        this.peronnelData = [];
        for( let item of res[0].DataList) {
          item.confirmPass = '';
          //item.UserState = item.UserState == 1 ? '启用成员' : '停用成员';
          this.peronnelData.push(item);
        }
        console.log(this.peronnelData);
      })
    },
    addPersonnal(){   // 打开添加用户
      
      this.editPeraonnlInfo = true;
    },
    UpdateUserData(idx) {   // 打开编辑用户
      console.log(idx);
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
      console.log(this.personnalInfo);
      this.editPeraonnlInfo = true;
      
    },
    personnalDialogClose() {
      console.log('close');
      // 对话框关闭的时候清空数据
      this.personnalInfo = {
        LoginName: '',
        UserName: '',
        UserCode: '',
        SectionCode: '',
        PositionCode: '',
        UserQq: '',
        UserPhone:'',
        confirmPass: '',
        UserPass:'',
        UserState: ''
      };
    },
    personnalDialogOpen() {
      console.log('open');
    }
  },
  mounted() {
    this.getUserData();
  }
}
</script>

<style scoped lang='scss'>
  .peronelContainer {
    height: 100%;
    .personnelManage {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background:#fff;
      box-shadow: 0px 5px 1px #888888;
      .peronnelTitle {
        display: inline;
      }
      .peronnelButton {
        //display: inline;
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
<style lang='scss'>
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

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #e5e5e5;
}
.el-table .el-table__header-wrapper tr{
  background: #e5e5e5;
}
.personnelDialog .el-dialog--center .el-dialog__header {
  padding-top: 15px;
  background: #f5f5f5;
}
</style>
