<template>
  <el-row class='loginContainer'>
    <el-col :span='24' >
        <div class="loginheaderlogo"><div class="huatotitle">华图项目管理系统</div></div>
     </el-col> 
    <el-col :span='24' class='loginmain'>
      <div class="projectRight"></div>
      <div class="projectLeft">
          <el-form label-width="80px" :model='userLogin' :rules='loginRules' ref='loginForm' >
            <el-form-item  prop='userName' :error='showError' >
              <div>
                <div class="uesricon"></div>
              <el-input v-model="userLogin.userName" @change='showError = null' placeholder='用户名' class="placeholderpadding"></el-input>
              </div>
            </el-form-item>

            <el-form-item  prop='userPass' :error='showError'>
                <div>
                 <div class="passwordicon"></div>
                 <el-input type='password' v-model="userLogin.userPass" @change='showError = null' placeholder="密码" class="placeholderpadding" ></el-input>
               </div>
             </el-form-item>
            <el-form-item >
              <el-button type='primary' @click='onSubmit' class='submitBtn' >登录</el-button>
            </el-form-item>
          </el-form>
      </div>
      <div class="projectbuttom"></div>
      <div class="Copyright">本系统最终解释权©深圳华图测控系统有限公司所有 版本 0.0.1</div>
    </el-col>
  </el-row>
</template>
<script>
import { userLogin } from '@/api/api';
import axios from 'axios';
import qs from 'qs';
import {getIp} from '@/assets/js/getIp';
export default {
    data() {
      return {
        userLogin: {
          userName: '',
          userPass: '',
          userIp: ''
        },
        loginRules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          userPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        showError: null
      }
    },
    methods: {
      onSubmit(ev) {
        var _this = this;
        this.showError = null;
        let user = {
          name: this.userLogin.userName
        }
        console.log(this.userLogin);
        this.$refs['loginForm'].validate((valid) => {
          if(valid) {
            userLogin(qs.stringify(this.userLogin)).then(res => {
                console.log(res);
                if(res == 1) {
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.$router.push({ path: '/Homes' });
                } else {
                  console.log(this.$refs['loginForm'].fields);
                  this.showError = '用户名或密码错误';
                  this.$refs['loginForm'].validateField('userName')
                }
            });
          }
        })
        
      },

    },
    mounted() {
      var _this = this;//代表上面的函数,点击.
      // 获取真实ip
      getIp((ip) => {
        console.log(ip);
        this.userLogin.userIp = ip;
      })
     $(window).keyup(function(ev){
        // console.log(ev);
         if(ev.keyCode == 13){
           _this.onSubmit();
        }
      })


    }
}
</script>

<style scoped lang='scss'>
  .loginContainer {
     min-width: 670px;
     height: 100%;
      .loginheaderlogo{
           height: 100px;
           background: url(../../assets/img/title.png) no-repeat;
           background-position: center center;
           margin-right: 120px;
           text-align: center;
      }
     .huatotitle{
           position: absolute;
           display: inline-block;
           font-size: 30px;
           line-height: 100px;
           margin-left:150px;   
        }   
     .loginmain{
          position:relative;
          height: 100%;
          background: url(../../assets/img/backmain.png) no-repeat;
          background-size:cover;      
     }
    .projectRight{
      position: absolute;
      background: url(../../assets/img/backgroundpic.png) no-repeat;
      z-index: 9999;
      width: 450px;
      height: 450px;
      top: 40%;
      margin-top: -200px;
      left: 30%;
      background-size: 100%;
    }
    .projectLeft{
      position: absolute;
      background: url(../../assets/img/Shape9.png) no-repeat;
      width: 450px;
      height: 450px;
      top: 40%;
      margin-top: -200px;
      left: 60%;
      background-size: 100%;
      z-index: 9999;
    }
  .projectbuttom{
    position: absolute;
     background: url(../../assets/img/background.png) no-repeat;
     width:100%;
     height:100%;
    background-size: contain;
    top: 61%;
  }
 .Copyright{
  position: absolute;
  font-size: 20px;
  top: 85%;
  left: 35%;
 }

.uesricon{
  width: 40px;
   height: 40px;
   border-bottom: 0px;
   border-top:0px;
  border-right: 1px solid #d8dce5;
  position: absolute;
  z-index: 9999;
   background: url(../../assets/img/user.png) no-repeat 8px  8px ;
}
.passwordicon{
   width: 40px;
   height: 40px;
   border-bottom: 0px;
   border-top:0px;
   border-right: 1px solid #d8dce5;
   position: absolute;
   z-index: 9999;
   background: url(../../assets/img/password.png) no-repeat 8px  8px ;
}
    .el-col {

        .el-form {
          position: absolute;
          width: 370px;
          height: 200px;
           top: 25%;
          .submitBtn {
            width: 100%;
          }
        }
      }

  }


</style>
<style type="text/css" lang="scss">
    
    .placeholderpadding {
      .el-input__inner{ 
       padding: 0 52px;
      }
    }
      
   /* margin-left: 40px;*/
</style>