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
        label='项目名称'
        prop='ProjectName'>
      </el-table-column>
      <el-table-column
        label='申请金额'
        width='150px'
        prop='AppliedAmount'>
      </el-table-column>
      <el-table-column
        label='申请描述'
        prop='Remark'>
      </el-table-column>
      <el-table-column
        label='流程'
        width='250px'
        >
        <template slot-scope="scope" >
          <span class='documentListState'>申请</span>
          <span :class='{"documentListState": dataList[scope.$index].State >= 2, "noApproveState": dataList[scope.$index].State < 2}' >领导</span>
          <span :class='{"documentListState": dataList[scope.$index].State >= 3, "noApproveState": dataList[scope.$index].State < 3 }' >管理员</span>
        </template>
      </el-table-column>
      <el-table-column
        label='打款凭证'
        width='200px'
        >
        <template slot-scope="scope" >
          <img style='width:180px;height:50px;cursor: pointer;' @click='amplification(scope.$index)' :src="dataList[scope.$index].ImgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column 
        width='320'
        label='操作'>
        <template slot-scope="scope" >
          <el-button size='mini' 
          type="primary" 
          v-if='dataList[scope.$index].State == 1 || dataList[scope.$index].State == 2'
          :disabled="(userPermission - 1) !== Number(dataList[scope.$index].State) ||  userPermission == 1"
          @click='applyApproval(scope.$index)'>
            申请批准
          </el-button>
            <el-button  
             type="primary"
             size='mini'
             v-if='dataList[scope.$index].State == 1'
             v-show='refusebutton'
             @click='CruelRefused(scope.$index)'
             >
             申请拒绝
           </el-button> 
          <el-button style='background:#a0a0a0; color:#fff' size='mini' v-if='dataList[scope.$index].State == 3' disabled >已批准</el-button>
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
        accept='image/jpeg,image/png'
        :on-exceed='uploadMessage'
        :disabled="fileList.length !== 0"
        :on-change='imgFileChange'
        :on-success='fileUploadSuccess'
        name='PettyCashFile1'
        :data='fileData'
        :on-error="fileError"
        :before-upload="beforeUplpad"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button  size="small" @click="closeAddVoucher">取 消</el-button>
        <el-button  size="small"   type="primary" @click="uploadImgBtn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync='dialogPreview'
      size='tiny'>
      <img width="100%" :src="dialogImgUrl" alt="">
    </el-dialog>
<el-dialog
  title="拒绝理由"
  :visible.sync="refusereason"
  width="30%"
  >
  <el-form  :model="refuseInfo" :rules="rules" ref="resfuseRule">
    <el-form-item
      prop='Explain'
      >
      <el-input
        type="textarea"
        placeholder="请输入内容"
        class="refusereasonInput"
        v-model="refuseInfo.Explain"
       >
      </el-input>
    </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button size='small' @click="Cancel">取 消</el-button>
    <el-button type="primary" size='small' @click="CashSendBacksub">确 定</el-button>
  </div>
</el-dialog>
  </el-col>
</el-row>
</template>
<script>
import { GetPettyCash, UpdatePettyCash,PettyCashSendBack } from '@/api/api'
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 12,
      fileList:[],
      imgActionUrl: '/AmountManage/UpdatePettyCash',
      fileData: null,            
      totalNumber: 0,
      addVoucher: false,
      dialogPreview: false,
      userPermission: null,     // 当前登录的用户 普通 or 领导  or 管理员
      dialogImgUrl: null,
      refusebutton:false,//拒绝按钮,,领导批准的时候显示
      refusereason:false,
      refuseInfo:{
         Explain:'',
      },
      rules:{
          Explain:[{ required: true, message: '请填写拒绝理由', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getDocumentList() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      GetPettyCash(params).then(res =>{
        this.userPermission = null;
        this.totalNumber = 0;
        this.dataList = [];
        if(res[0].IsTrue==2){
           this.refusebutton=true;//等于等到的时候有拒绝的权限.
         }
          this.userPermission = Number(res[0].IsTrue);
          this.totalNumber = res[0].TotalNumber;
          this.dataList = res[0].DataList;
      })
    },
    pageIndexChange() {
      this.getDocumentList();
    },
    handlePictureCardPreview(file) {
      this.dialogImgUrl = file.url;
      this.dialogPreview = true;
    },
    amplification(idx) {
      // console.log(this.dataList)
      this.dialogImgUrl = this.dataList[idx].ImgUrl;
      this.dialogPreview = true;
    },
    uploadMessage() {
      this.$message({
        type: 'warning',
        message: '只能上传一张图片！！！'
      })
    },
    Cancel(){//取消弹框显示
        this.refusereason=false;
    },
       CruelRefused(index){//拒绝时候弹框显示
          this.refusereason=true;//打开弹框.
          this.refuseInfo={
            PettyCashCode:this.dataList[index].PettyCashCode,
            Explain:this.dataList[index].Explain
          }
          
    },
    CashSendBacksub(){//提交时候发送
        var params={
            pettyCash:this.refuseInfo
        }  
     this.$refs['resfuseRule'].validate((valid) =>{
            console.log(valid)
            if(valid){
             PettyCashSendBack(params).then(res=>{
                  this.getDocumentList()//拒绝时候,刷新列表,重新显示列表,不显示拒绝的,.  
                  this.refusereason=false;
                  this.$refs['resfuseRule'].resetFields()
             })  
           }
    })
  },
    
    applyApproval(index) {
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
        /*console.log('管理员')*/
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
      this.getDocumentList()//调用列表刷新
    },
    beforeUplpad(file) {
      console.log(file);
      // var formData = new FormData();
      // formData.append('PettyCashFile',file);
      var render = new FileReader();
      render.readAsDataURL(file);
      render.onload = (e) => {
        console.log(e);
        var result = (e.target.result).replace(/^.*?,/,'');  // 替换前边的data:image/png(/jpeg);base64
        // formData.append('PettyCashCode', this.fileData.PettyCashCode )
        var params = {
          PettyCashCode: this.fileData.PettyCashCode,
          PettyCashFile: result
        };
        console.log(params);
        UpdatePettyCash(params).then(res => {
          console.log(res);
          if(res == 1) {
            this.$message({
              type: 'success',
              message: '批准成功！！！'
            });
            this.addVoucher = false;
            this.$refs['imgUpload'].clearFiles();
            this.getDocumentList();
          } else {
            this.$message({
              type: 'error',
              message: '批准失败！！！'
            })
          }
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
        width: 70px;
        height: 100%;
        color: #fff;
        background: url(../../assets/img/liuchengBack.png) no-repeat;
        background-size: 100%;
      }
      .noApproveState {
        display: inline-block;
        width: 70px;
        height: 100%;
        color: #fff;
        background: url(../../assets/img/liuchengNo.png) no-repeat;
        background-size: 100%;
      }
    }
  }

}
</style>
<style type="text/css" lang='scss'>
     .el-textarea__inner{
      height: 160px;
     }

</style>