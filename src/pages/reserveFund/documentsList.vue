<template>
<el-row class='documentListContainer myContainer'>
  <el-col :span='24' class='title'>
    单据列表
  </el-col>
  <el-col :span='24' class='documentContentCont' >
    <el-table
      :data="dataList"
      border
      stripe>
      <el-table-column
        label='序列'
        width='70px'>
        <template slot-scope="scope" >
          {{ (pageIndex-1) * pageIndex + (scope.$index + 1) }}
        </template>
      </el-table-column>
      <el-table-column
      label='申请人'
      width='150px'
      prop='LoginName'>

      </el-table-column>
      <el-table-column
        label='申请描述'
        prop='Remark'>

      </el-table-column>
      <el-table-column
        label='流程'
        width='150px'
        prop='State'>
        <template slot-scope="scope">
          <span class='documentListState'>{{dataList[scope.$index].State == 1 ? '申请' : (dataList[scope.$index].State == 2 ? '领导' : '管理员')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label='打款凭证'
        width='150px'
        >
        <template slot-scope="scope" >
          <img src="" alt="">
        </template>

      </el-table-column>
      <el-table-column 
        width='150px'
        label='操作'>
        <template slot-scope="scope" >
          <el-button size='mini' 
          type="primary" 
          v-if='dataList[scope.$index].State == 1 || dataList[scope.$index].State == 2'
          :disabled="(userPermission - 1) !== Number(dataList[scope.$index].State) ||  userPermission == 1"
          @click='applyApproval(scope.$index)'>
            申请批准
          </el-button>
          <el-button style='background:#a0a0a0' size='mini' v-if='dataList[scope.$index].State == 3' disabled >已批准</el-button>
          
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
    <el-dialog 
      :visible.sync="addVoucher"
      title='上传打款凭证'
      @close='closeAddVoucher'
      width='400px'>
      <el-upload
        ref='imgUpload'
        :action="imgActionUrl"
        list-type="picture-card"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :limit='1'
        accept='image'
        :on-exceed='uploadMessage'
        :disabled="fileList.length !== 0"
        :on-change='imgFileChange'
        :on-success='fileUploadSuccess'
        name='PettyCashFile'
        :data='fileData'
        :on-error="fileError"
        :before-upload="beforeUplpad"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddVoucher">取 消</el-button>
        <el-button type="primary" @click="uploadImgBtn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync='dialogPreview'
      size='tiny'>
      <img width="100%" :src="dialogImgUrl" alt="">
    </el-dialog>
  </el-col>
</el-row>

</template>

<script>
import { GetPettyCash, UpdatePettyCash } from '@/api/api'
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      fileList:[],
      imgActionUrl: '/AmountManage/UpdatePettyCash',
      fileData: null,            
      totalNumber: 0,
      addVoucher: false,
      dialogPreview: false,
      userPermission: null,     // 当前登录的用户 普通 or 领导  or 管理员
      dialogImgUrl: null,
    }
  },
  methods: {
    getDocumentList() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      GetPettyCash(params).then(res =>{
        console.log(res);
        this.userPermission = null;
        this.totalNumber = 0;
        this.dataList = [];
        if(res[0].TotalNumber !== 0) {
          this.userPermission = Number(res[0].IsTrue);
          this.totalNumber = res[0].TotalNumber;
          this.dataList = res[0].DataList;
        }
        console.log(this.userPermission);
      })
    },
    pageIndexChange() {
      this.getDocumentList();
    },
    handlePictureCardPreview(file) {
      this.dialogImgUrl = file.url;
      this.dialogPreview = true;
    },
    uploadMessage() {
      this.$message({
        type: 'warning',
        message: '只能上传一张图片！！！'
      })
    },
    applyApproval(index) {
      console.log(this.dataList[index]);
      if(this.userPermission == 2) {
        var params = {
          PettyCashCode: this.dataList[index].PettyCashCode,
          PettyCashFile: null
        };
        UpdatePettyCash(params).then(res => {
          console.log(res);
          if(res == 1) {
            this.$message({
              type: 'success',
              message: '批准成功！！！'
            });
            this.getDocumentList();
          } else {
            this.$message({
              type: 'error',
              message: '批准失败！！！'
            })
          }
        })
      } else if(this.userPermission == 3) {
        console.log('管理员')
        this.addVoucher = true;
        this.fileData = {
          PettyCashCode: this.dataList[index].PettyCashCode
        }
      }
    },
    closeAddVoucher() {
      this.addVoucher = false;
    },
    uploadImgBtn() {
      console.log(this.fileList);
      this.$refs['imgUpload'].submit();
    },
    beforeUplpad(file) {
      console.log(file);
      // var formData = new FormData();
      // formData.append('PettyCashFile',file);
      var render = new FileReader();
      render.readAsDataURL(file);
      render.onload = (e) => {
        console.log(e);
        var result = (e.target.result).replace(/data:image\/png;base64,/, '');
        // formData.append('PettyCashCode', this.fileData.PettyCashCode )
        var params = {
          PettyCashCode: this.fileData.PettyCashCode,
          PettyCashFile: result
        };
        console.log(params);
        UpdatePettyCash(params).then(res => {
          console.log(res);
        })
      }
      
      return false;

    },
    imgFileChange(file, fileList) {
      // console.log(file);
      // console.log(fileList);
      // this.fileList = fileList;
    },
    fileUploadSuccess(res) {
      console.log(res);
    },
    fileError(error) {
      console.log(error)
    }
  },
  mounted() {
    this.getDocumentList();
  },
  deactivated() {
    this.$destroy(true);
  }
}
</script>

<style scoped lang='scss'>
.documentListContainer {
  .documentContentCont {
    padding: 20px;
    .el-table {
      text-align: center;
      .documentListState {
        display: inline-block;
        width: 75px;
        height: 100%;
        color: #fff;
        background: url(../../assets/img/liuchengBack.png) no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>