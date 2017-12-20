<template>
  <el-row class='loginContainer'>
    <el-col :span='24' >
        <div class="loginheaderlogo"><div class="huatotitle">华图项目管理系统</div></div>  

     </el-col> 
    <el-col :span='24' class='loginmain'>
      <el-form label-width="80px" :model='userLogin' :rules='loginRules' ref='loginForm' >
        <el-form-item label="用户名" prop='userName' :error='showError' >
          <el-input v-model="userLogin.userName" @change='showError = null'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='userPass' :error='showError'>
          <el-input type='password' v-model="userLogin.userPass" @change='showError = null'></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type='primary' @click='onSubmit' class='submitBtn' >登录</el-button>
        </el-form-item>
      </el-form>
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
      onSubmit() {
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
        
      }
    },
    mounted() {
      // 获取真实ip
      getIp((ip) => {
        console.log(ip);
        this.userLogin.userIp = ip;
      })
    }
}
</script>

<style scoped lang='scss'>
  .loginContainer {
     height: 100%;
      .loginheaderlogo{
         height: 100px;
         background: url(../../assets/img/title.png) no-repeat;
         background-position: center center;
        margin-right: 120px;
         text-align: center;
      }
     .huatotitle{
            display: inline-block;
            font-size: 30px;
           line-height: 100px;
           margin-left:530px;
           
        }   


     .loginmain{
          position: relative;
          height: 100%;
          background: url(../../assets/img/backmain.png) no-repeat;
          background-size:cover;
     }
    .el-col {
        .el-form {
          position: absolute;
          width: 300px;
          height: 200px;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
          .submitBtn {
            width: 100%;
          }
        }
      }

  }
</style>