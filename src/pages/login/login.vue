<template>
  <el-row>
    <el-col :span='24'>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userLogin.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userLogin.userPass"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click='onSubmit'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
 
</template>

<script>
import { userLogin } from '@/api/api';
import qs from 'qs';
export default {
    data() {
      return {
        userLogin: {
          userName: '',
          userPass: '',
          userIp: '123456'
        }
      }
    },
    methods: {
      onSubmit() {
        let user = {
          name: this.userLogin.userName
        }
        console.log(this.userLogin);
        userLogin(qs.stringify(this.userLogin)).then(res => {
            console.log(res);
            if(res == 1) {
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$router.push({ path: '/Homes' });
            }
        });
      }
    },
    mounted() {
    
    }
}
</script>

<style scoped>

</style>