<template>
  <el-row class='accessConfig myContainer'>
    <el-col :span='24' class='title'>
      人员权限配置
    </el-col>
    <el-col :span='24' class='accessConfigDetails' :gutter='20'>
      <el-col :span='8' class='LeftUserListRadio' >
        <el-radio-group v-model="checkPersonnal" @change='choosePersonnal'>
          <el-radio v-for='item in personnalList' :key='item.UserCode' :label="item.UserName">{{item.UserName}}</el-radio>
          
        </el-radio-group>
      </el-col>
      <el-col :span='15' class='accessConfigRightUrl'>
        <el-checkbox-group v-model="checkUrlList">
          <div v-for='item in urlList' :key='item.InterfaceCode'>
            <el-col :span='24' class='chooseAccessTitle'>{{item.InterfaceName}}</el-col>
            <el-checkbox v-for='list in item.ConnectionList' :label="list.ConnectionNumber" :key='list.ConnectionNumber'>{{list.ConnectionName}}</el-checkbox>
            
          </div>
          
        </el-checkbox-group>
        <el-button type='primary' @click='addAccessConfig' size='mini' class='myBtn' >保存</el-button>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { GetUserManageData, PaddingData, GetJurisdictionUserNameData, AddConnectUserRelation } from '@/api/api';
export default {
  data() {
    return {
      checkPersonnal: null,  // 选中的人员
      personnalList: [],     // 全部人员
      checkUrlList: [],      // 选中的权限页面
      urlList: [],           // 右边的页面导航

    }
  },
  methods: {
    getUserList() {
      var params = {
        pageIndex: 1,
        pageSize: 200
      }
      GetUserManageData(params).then(res => {
        console.log(res);
        this.personnalList = res[0].DataList;
      });
      PaddingData().then(res => {
        console.log(res);
        this.urlList = res;
      })
    },
    choosePersonnal(value) {   // 选择人员的事件
      console.log(value);
      var params = { userName: value };
      GetJurisdictionUserNameData(params).then(res => {
        console.log(res);
        this.checkUrlList = [];
        for(let item of res) {
          for(let key of item.ConnectionList) {
            this.checkUrlList.push(key.ConnectionNumber);
          }
        }
      })
    },
    addAccessConfig() {   //点击保存按钮
      console.log(this.checkPersonnal);
      console.log(this.checkUrlList);
      var params = [];
      
      for(let item of this.checkUrlList) {
        params.push({
          LoginName:this.checkPersonnal,
          ConnectionNumber:item
        })
      }
      console.log(params);
      AddConnectUserRelation(params).then(res => {
        console.log(res);
        if (res == 1) {
          this.$message({
            type:'success',
            message: '保存成功！！！'
          })
        } else {
          this.$message({
            type:'error',
            message: '保存失败！！！'
          })
        }
      })

    }
  },
  mounted() {
    this.getUserList();
  }
}
</script>

<style scoped lang='scss'>
  .accessConfig {
    height: 100%;
    .accessConfigDetails {
      width: calc(100% - 40px);
      height: calc(100% - 90px);
      margin: 20px;
      background: #fff;
      border: 1px solid #ccc;
      .LeftUserListRadio {
        height: 100%;
        padding: 20px 50px;
        margin-right: 20px;
        border-right: 1px solid #ccc;
        .el-radio-group {
          width: 100%;
          height: 100%;
          .el-radio {
            width: 40%;
          }
          .el-radio+.el-radio {
            margin-left: 0px;
          }
        }
      }
      .accessConfigRightUrl {
        height: 100%;
        padding: 20px 50px;
        //margin-right: 20px;
        border-left: 1px solid #ccc;
        .chooseAccessTitle {
          height: 20px;
          font-size: 18px;
          margin: 10px 0;
        }
        .myBtn{
          margin-top: 20px;
        }
      }
    }
  }
</style>
<style lang='scss'>
  .myContainer {
    .title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background: #fff;
      -webkit-box-shadow: 0px 2px 1px #888888;
      box-shadow: 0px 2px 1px #888888;
    }
  }
</style>
